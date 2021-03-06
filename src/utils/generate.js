const electron = window.require('electron')
const fse = electron.remote.require('fs-extra')
const normalize = electron.remote.require('normalize-path')
const replace = electron.remote.require('replace-in-file')
const find = electron.remote.require('find')
const { featuresOptions } = require('../config')
const uniqid = require('uniqid')
const { sendSuccessMessage, sendFailedMessage } = require('./message')
const { isFileExist } = require('./validate')

export const generate = async function startGenerationProcess(state) {
  const {
    id,
    sources,
    outPath,
    jsFiles,
    cssFiles,
    display
  } = formatState(state)

  try {
    sendSuccessMessage('generation start...')
    await copySources(sources, outPath)
    sendSuccessMessage('sources folders copied')
    await copyNewFiles(jsFiles, cssFiles, display.logo, outPath)
    sendSuccessMessage('new files files copied')
    await adjusting(id, sources, display, jsFiles, cssFiles, outPath)
    sendSuccessMessage('files have been adjusted as required')
    sendSuccessMessage('generation completed!')
  } catch (err) {
    sendFailedMessage(err.message || err)
    sendFailedMessage('generation stopped!')
    if (await isFileExist('folder', outPath)) {
      await fse.remove(outPath)
    }

    throw 'generation failed'
  }
}

const formatState = function formatStateForGeneration(state) {
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

const copySources = async function copySourcesFolders(sources, outPath) {
  for (let src of sources) {
    await fse.copy(src.path, `${outPath}/reverbs/${src.folderName}`)
      .catch(() => { throw `source not exist - ${src.path}` })
  }
}

const copyNewFiles = async function copyCustomDisplayNewFiles(
  jsFiles, 
  cssFiles, 
  logo, 
  outPath
) {
  for (let file of jsFiles) {
    await fse.copy(`document/scripts/${file}`, `${outPath}/document/scripts/${file}`)
      .catch(() => { throw `document/scripts/${file} file not found` })
  }

  for (let file of cssFiles) {
    await fse.copy(`document/styles/${file}`, `${outPath}/document/styles/${file}`)
      .catch(() => { throw `document/styles/${file} file not found` })
  }

  await fse.copy('viewer', outPath).catch(() => { throw 'viewer code copy' })

  await fse.copy('node_modules/@fortawesome/fontawesome-free', `${outPath}/document/styles/fa`)
    .catch(() => { throw 'font awesome copy' })

  if (logo.enable && logo.value) {
    const ext = logo.value.split('.').pop()
    await fse.copy(logo.value, `${outPath}/document/assets/logo.${ext}`)
      .catch(() => { throw 'logo copy' })
  }
}

const adjusting = async function adjustingNewFiles(
  id, 
  sources, 
  display, 
  jsFiles, 
  cssFiles, 
  outPath
) {
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
  
  await fse.writeFile(`${outPath}/document/scripts/env.js`, documentEnvData)
    .catch(() => { throw 'write document env.js file' })

  await fse.writeFile(`${outPath}/viewer/env.js`, viewerEnvData)
    .catch(() => { throw 'write viewer env.js file' })

  let newScripts = ``
  jsFiles.forEach(file => {
    newScripts += `<script src="../../document/scripts/${file}"></script>`
  })

  let newStyles = `<link rel="stylesheet" href="../../document/styles/fa/css/all.min.css">`
  cssFiles.forEach(file => {
    newStyles += `<link rel="stylesheet" href="../../document/styles/${file}">`
  })

  for (let src of sources) {
    await replace({
      files: src.newEntryPath,
      from: '</body>',
      to: `${newScripts}</body>`
    }).catch(() => { throw 'append new script to index.html' })

    await replace({
      files: src.newEntryPath,
      from: '--></style><!--[if IE 9]><link rel="StyleSheet" href="css/skin_IE9.css" type="text/css" media="all"><![endif]--></head>',
      to: `--></style><!--[if IE 9]><link rel="StyleSheet" href="css/skin_IE9.css" type="text/css" media="all"><![endif]-->${newStyles}</head>`
    }).catch(() => { throw 'append new styles to index.html' })
  }

  const pageScript = getPageScript(theme)

  const pageScripts = find.fileSync('page.js', outPath)
  for (let script of pageScripts) {
    await fse.appendFile(script, pageScript).catch(() => { throw 'append custom script to page.js script' })
  }
}

const orderFeatures = function orderFeaturesDisplayPosition(features) {
  return featuresOptions.filter(f => features.indexOf(f) !== -1)
}

const getBadahDocuments = function getBadahDocumentsKey(sources) {
  return JSON.stringify(sources.map(({ name, folderName }) => ({
    label: name || folderName,
    link: `./reverbs/${folderName}/index.html`
  })))
}

const getPageScript = function getInnerIframePageScript(theme) {
  return (
      `window.addEventListener('load', () => {
  document.querySelectorAll('.Cross_Reference > a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const { href } = e.target
      Message.Post(Page.window.parent, { action: 'last_link', href }, Page.window)
    })
  })
})

    ${(theme.enable && theme.value) && 
`const head = document.querySelector('head')
const link = document.createElement('link')
link.setAttribute('rel', 'stylesheet')
link.href = '../../../document/styles/${theme.value}Theme.css'
head.appendChild(link)
`}`
  )
}
