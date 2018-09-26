// accessing electron from the react app - example
// const electron = window.require('electron')
// const fs = electron.remote.require('fs')
// const ipcRenderer  = electron.ipcRenderer

export const generate = async state => {
  console.log(state)
  const {
    sources
  } = state
  await copyFolders(state)
}

const copyFolders = async sources => {
  await delay()
}

const delay = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, 3000)
  })
}