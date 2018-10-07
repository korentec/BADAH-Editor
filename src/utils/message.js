const electron = window.require('electron')
const EventEmitter = electron.remote.require('events')

const myEmitter = new EventEmitter()

export const receiveMessage = (event, cb) => {
  myEmitter.on(event, cb)
}

export const sendMessage = (event, msg) => {
  myEmitter.emit(event, JSON.stringify(msg))
}
