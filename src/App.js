import React, { Component } from 'react'
import './App.css'
import Main from './components/Main'
import Footer from './components/Footer'

// accessing electron from the react app - example
// const electron = window.require('electron')
// const fs = electron.remote.require('fs')
// const ipcRenderer  = electron.ipcRenderer

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header></header>
        <main>
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default App
