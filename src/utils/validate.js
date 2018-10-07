const electron = window.require('electron')
const fse = electron.remote.require('fs-extra')

export const isFileExist = async (type, path) => {
  let res = false  
  try {
    const stats = await fse.stat(path)
    if (stats) {
      switch (type) {
        case 'folder':
          if (stats.isDirectory()) {
            res = true
          }
          break
        case 'image':
          const ext = path.split('.').pop()
          if (ext === 'jpg' || ext === 'png') {
            res = true
          }
          break
        case 'entry':
          res = true
          break
      
        default:
          break
      }
    }
  } catch (error) {
    res = false      
  }
 

  return res
}
