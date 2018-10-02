const electron = window.require('electron')
const fs = electron.remote.require('fs')
const fse = electron.remote.require('fs-extra')
const normalize = electron.remote.require('normalize-path')
const replace = electron.remote.require('replace-in-file')
const { featuresOptions } = require('../config')
const uniqid = require('uniqid')

export const generate = async state => {
  const {
    id,
    sources,
    outPath,
    jsFiles,
    cssFiles,
    display
  } = stateFormat(state)

  await copyFolders(sources, outPath)
  await copyNewFiles(jsFiles, cssFiles, display.logo, outPath)
  await adjustingNewFiles(id, sources, display, jsFiles, cssFiles, outPath)
}

const stateFormat = state => {
  const {
    sources,
    outPath,
    display: {
      features,
      theme,
      label,
      classification,
      logo
    }
  } = state

  const id = uniqid()
  const formatedOutPath = `${normalize(outPath)}/BADAH-Viewer_${id}`
  const formatedSources = sources.map(({ name, path }) => {
    const formatedSrc = normalize(path)
    const folderName = formatedSrc.split('/').pop()
    return {
      name,
      folderName,
      path: formatedSrc,
      newEntryPath: `${formatedOutPath}/reverbs/${folderName}/index.html`
    }
  })

  const jsFiles = [
    'env.js',
    'general.js', 
    ...orderFeatures(features).map(f => (
      `${f.charAt(0).toLowerCase() + f.slice(1)}Feature.js`
    ))
  ]

  const cssFiles = ['general.css']
  if (theme.enable) {
    cssFiles.push(`${theme.value}Theme.css`)
  }

  return {
    id,
    sources: formatedSources,
    outPath: formatedOutPath,
    jsFiles,
    cssFiles,
    display: {
      theme,
      label,
      classification,
      logo
    }
  }
}

const copyFolders = async (sources, outPath) => {
  sources.forEach(async src => {
    await fse.copy(src.path, `${outPath}/reverbs/${src.folderName}`)
  })
}

const copyNewFiles = async (jsFiles, cssFiles, logo, outPath) => {
  jsFiles.forEach(async file => {
    await fse.copy(`document/scripts/${file}`, `${outPath}/document/scripts/${file}`)
  })

  cssFiles.forEach(async file => {
    await fse.copy(`document/styles/${file}`, `${outPath}/document/styles/${file}`)
  })

  await fse.copy('viewer', outPath)

  await fse.copy('node_modules/@fortawesome/fontawesome-free', `${outPath}/document/styles/fa`)

  if (logo.enable && logo.value) {
    const ext = logo.value.split('.').pop()
    await fse.copy(logo.value, `${outPath}/document/assets/logo.${ext}`)
  }
}

const adjustingNewFiles = async (id, sources, display, jsFiles, cssFiles, outPath) => {
  const { label, classification, logo, theme } = display
  let documentEnvData = `const BADAH_VIEWER_ID = '${id}'
const BADAH_VIEWER_PATH = '../../index.html'`

  if (label.enable && label.value) {
    documentEnvData += '\n' + `const LABEL = "${label.value}"`
  }

  if (classification.enable && classification.value) {
    documentEnvData += '\n' + `const CLASSIFICATION = "${classification.value}"`
  }

  if (logo.enable && logo.value) {
    const ext = logo.value.split('.').pop()
    documentEnvData += '\n' + `const LOGO_PATH = "../../document/assets/logo.${ext}"`
  }

  const viewerEnvData = `const BADAH_VIEWER_ID = '${id}'
const BADAH_DOCUMENTS = ${getBadahDocuments(sources)}
const THEME = '${(theme.enable && theme.value) || null}'`
  
  await fs.writeFile(`${outPath}/document/scripts/env.js`, documentEnvData)
  await fs.writeFile(`${outPath}/viewer/env.js`, viewerEnvData)

  let newScripts = ``
  jsFiles.forEach(file => {
    newScripts += `<script src="../../document/scripts/${file}"></script>`
  })

  let newStyles = `<link rel="stylesheet" href="../../document/styles/fa/css/all.min.css">`
  cssFiles.forEach(file => {
    newStyles += `<link rel="stylesheet" href="../../document/styles/${file}">`
  })

  sources.forEach(async src => {
    await replace({
      files: src.newEntryPath,
      from: '</body>',
      to: `${newScripts}</body>`
    })

    await replace({
      files: src.newEntryPath,
      from: '--></style><!--[if IE 9]><link rel="StyleSheet" href="css/skin_IE9.css" type="text/css" media="all"><![endif]--></head>',
      to: `--></style><!--[if IE 9]><link rel="StyleSheet" href="css/skin_IE9.css" type="text/css" media="all"><![endif]-->${newStyles}</head>`
    })
  })
}

const orderFeatures = features => {
  return featuresOptions.filter(f => features.indexOf(f) !== -1)
}

const getBadahDocuments = sources => {
  return JSON.stringify(sources.map(({ name, folderName }) => ({
    label: name || folderName,
    link: `./reverbs/${folderName}/index.html`
  })))
}