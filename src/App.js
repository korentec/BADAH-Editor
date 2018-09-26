import React, { Component } from 'react'
import './App.css'
import Main from './components/Main'
import Footer from './components/Footer'
import { message } from 'antd'

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

  addSource(path) {
    const { sources } = this.state
    if (sources.indexOf(path) === -1) {
      this.setState({ sources: [ ...sources, path ]})
    } else {
      message.error('Folder already exists')
    }
  }

  removeAllSources() {
    this.setState({ sources: [] })
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
            addSource={this.addSource.bind(this)}
            removeAllSources={this.removeAllSources.bind(this)}
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
