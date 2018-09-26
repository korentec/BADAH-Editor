import React, { Component } from 'react'
import './App.css'
import Main from './components/Main'
import Footer from './components/Footer'

// accessing electron from the react app - example
// const electron = window.require('electron')
// const fs = electron.remote.require('fs')
// const ipcRenderer  = electron.ipcRenderer

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sources: [
        'C:\Users\yuval\projects\BADAH\BADAH-docs\Examples\Reverb1',
        'C:\Users\yuval\projects\BADAH\BADAH-docs\Examples\Reverb2',
        'C:\Users\yuval\projects\BADAH\BADAH-docs\Examples\Reverb3'
      ],
      features: [],
      label: '',
      classification: '',
      theme: '',
      logo: ''
    }
  }

  render() {
    const { sources } = this.state

    return (
      <div className="wrapper">
        <header></header>
        <main>
          <Main 
            disabledRemoveAll={!sources.length}
            sources={sources}
          />
        </main>
        <footer>
          <Footer 
            disabled={false}
            loading={false}
          />
        </footer>
      </div>
    )
  }
}

export default App
