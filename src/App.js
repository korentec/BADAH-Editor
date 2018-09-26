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
      sources: [],
      display: {
        features: [],
        label: {
          enable: false,
          value: ''
        },
        classification: {
          enable: false,
          value: ''
        },
        theme: {
          enable: false,
          value: 'blue'
        },
        logo: {
          enable: false,
          value: ''
        }
      },
      outPath: ''
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

  removeSource(path) {
    const { sources } = this.state
    this.setState({ sources: sources.filter(s => s !== path ) })
  }

  moveSource(dir, path) {
    const { sources } = this.state
    const index = sources.indexOf(path)
    const newSources = [ ...sources ]
    switch (dir) {
      case 'up':
        newSources[index - 1] = path
        newSources[index] = sources[index - 1]
        break;
      case 'down':
        newSources[index + 1] = path
        newSources[index] = sources[index + 1]
        break;
    }
  
    this.setState({ sources: newSources }) 
  }

  onInputToggle(type, checked) {
    const { display: newDisplay } = this.state
    newDisplay[type].enable = checked
    this.setState({ display: newDisplay })
  }

  onInputChanged(type, value) {
    const { display: newDisplay } = this.state
    newDisplay[type].value = value
    this.setState({ display: newDisplay })
  }

  render() {
    const { 
      sources, 
      display 
    } = this.state

    return (
      <div className="wrapper">
        <header></header>
        <main>
          <Main 
            disabledRemoveAll={!sources.length}
            sources={sources}
            addSource={this.addSource.bind(this)}
            removeAllSources={this.removeAllSources.bind(this)}
            removeSource={this.removeSource.bind(this)}
            moveSource={this.moveSource.bind(this)}
            display={display}
            onInputToggle={this.onInputToggle.bind(this)}
            onInputChanged={this.onInputChanged.bind(this)}
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
