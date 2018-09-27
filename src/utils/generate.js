const electron = window.require('electron')
const fs = electron.remote.require('fs-extra')
const normalize = electron.remote.require('normalize-path')

export const generate = async state => {
  console.log(state)
  const {
    id,
    outFolderName,
    sources,
    outPath,
    jsFiles,
    cssFiles
  } = stateFormat(state)

  await copyFolders(sources, outPath, outFolderName)
  await copyNewFiles(jsFiles, cssFiles, outPath, outFolderName)
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
    outFolderName: `BADAH-Viewer_${id}`,
    sources: formatedSources,
    outPath: normalize(outPath),
    jsFiles,
    cssFiles
  }
}

const copyFolders = async (sources, outPath, outFolderName) => {
  sources.forEach(async src => {
    await fs.copy(src.path, `${outPath}/${outFolderName}/reverbs/${src.folderName}`)
  })
}

const copyNewFiles = async (jsFiles, cssFiles, outPath, outFolderName) => {
  jsFiles.forEach(async file => {
    await fs.copy(`document/scripts/${file}`, `${outPath}/${outFolderName}/document/scripts/${file}`)
  })

  cssFiles.forEach(async file => {
    await fs.copy(`document/styles/${file}`, `${outPath}/${outFolderName}/document/styles/${file}`)
  })

  await fs.copy('viewer', `${outPath}/${outFolderName}`)
}