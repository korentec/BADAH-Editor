const electron = window.require('electron')
const EventEmitter = electron.remote.require('events')

const myEmitter = new EventEmitter()

export const receiveMessage = function onReceiveEventMessage(event, cb) {
  myEmitter.on(event, cb)
}

export const sendMessage = function onSendEventMessage(event, msg) {
  myEmitter.emit(event, JSON.stringify(msg))
}

export const sendSuccessMessage = function sendSuccessEventMessage(msg) {
  sendMessage('progress', { type: 'success', msg })
}

export const sendFailedMessage = function sendFailedEventMessage(msg) {
  sendMessage('progress', { type: 'failed', msg })
}