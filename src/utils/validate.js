const electron = window.require('electron')
const fs = electron.remote.require('fs')

export const isFileExist = (type, path) => {
  let res = false  
  try {
    const stats = fs.statSync(path)
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
 

  return Promise.resolve(res)
}
