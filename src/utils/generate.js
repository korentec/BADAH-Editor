const electron = window.require('electron')
const fs = electron.remote.require('fs-extra')
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

  await copyFolders(id, sources, outPath)
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
    ...features.map(f => `${f}Feature.js`) 
  ]

  const cssFiles = [
    `${theme}Theme.css`
  ]

  return {
    id,
    sources: formatedSources,
    outPath: normalize(outPath),
    jsFiles,
    cssFiles
  }
}

const copyFolders = async (id, sources, outPath) => {
  sources.forEach(async src => {
    await fs.copy(src.path, `${outPath}/BADAH-Viewer_${id}/${src.folderName}`)
  })
  
  return Promise.resolve()
}