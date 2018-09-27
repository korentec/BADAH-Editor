const electron = window.require('electron')
const fs = electron.remote.require('fs')
const fse = electron.remote.require('fs-extra')
const normalize = electron.remote.require('normalize-path')

export const generate = async state => {
  console.log(state)
  const {
    id,
    sources,
    outPath,
    jsFiles,
    cssFiles
  } = stateFormat(state)

  await copyFolders(sources, outPath)
  await copyNewFiles(jsFiles, cssFiles, outPath)
  await adjustingNewFiles(id, sources, jsFiles, cssFiles, outPath)
}

const stateFormat = state => {
  const {
    id,
    sources,
    outPath,
    display: {
      features,
      label,
      classification,
      theme,
      logo
    }
  } = state

  const formatedSources = sources.map(src => {
    const formatedSrc = normalize(src)
    return {
      folderName: formatedSrc.split('/').pop(),
      path: formatedSrc
    }
  })

  const jsFiles = [
    'env.js',
    'general.js', 
    ...features.map(f => (
      `${(f.charAt(0).toLowerCase() + f.slice(1)).replace(/\s+/g,'')}Feature.js`
    ))
  ]

  const cssFiles = ['general.css']
  if (theme.enable) {
    cssFiles.push(`${theme.value}Theme.css`)
  }

  return {
    id,
    sources: formatedSources,
    outPath: `${normalize(outPath)}/BADAH-Viewer_${id}`,
    jsFiles,
    cssFiles
  }
}

const copyFolders = async (sources, outPath) => {
  sources.forEach(async src => {
    await fse.copy(src.path, `${outPath}/reverbs/${src.folderName}`)
  })
}

const copyNewFiles = async (jsFiles, cssFiles, outPath) => {
  jsFiles.forEach(async file => {
    await fse.copy(`document/scripts/${file}`, `${outPath}/document/scripts/${file}`)
  })

  cssFiles.forEach(async file => {
    await fse.copy(`document/styles/${file}`, `${outPath}/document/styles/${file}`)
  })

  await fse.copy('viewer', outPath)
}

const adjustingNewFiles = async (id, sources, jsFiles, cssFiles, outPath) => {
  const documentEnvData = `const BADAH_VIEWER_ID = ${id}
const BADAH_VIEWER_PATH = '../../viewer/index.html'`

  const viewerEnvData = `const BADAH_VIEWER_ID = ${id}
const BADAH_DOCUMENTS = ${getBadahDocuments(sources)}`
  
  await fs.writeFile(`${outPath}/document/scripts/env.js`, documentEnvData)
  await fs.writeFile(`${outPath}/viewer/env.js`, viewerEnvData)
}

const getBadahDocuments = sources => {
  return JSON.stringify(sources.map(src => ({
    label: src.folderName,
    link: `./reverbs/${src.folderName}/index.html`
  })))
}