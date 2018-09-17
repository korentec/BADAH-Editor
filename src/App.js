import React, { Component } from 'react'
import './App.css'

// accessing electron from the react app - example
// const electron = window.require('electron')
// const fs = electron.remote.require('fs')
// const ipcRenderer  = electron.ipcRenderer

class App extends Component {
  render() {
    return (
      <div>
        <h1>BADAH Editor</h1>  
      </div>
    )
  }
}

export default App
