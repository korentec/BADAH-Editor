import React, { Component } from 'react'
import './App.css'
import Main from './components/Main'
import Footer from './components/Footer'
import { message, Spin } from 'antd'
import { generate } from './utils/generate'
import { isFileExist } from './utils/validate'
import { receiveMessage } from './utils/message'
import Progress from './components/Progress'

const electron = window.require('electron')
const homedir = electron.remote.require('homedir')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      sources: [],
      display: {
        features: [],
        label: {
          enable: false,
          value: ''
        },
        classification: {
          enable: false,
          value: 'unclassified'
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
      outPath: `${homedir()}\\Desktop`,
      progress: []
    }
  }

  componentDidMount() {
    receiveMessage('progress', msg => {
      const { progress } = this.state
      const newMsg = JSON.parse(msg)
      this.setState({ progress: [ ...progress, newMsg ] })
    })
  }

  async addSource(path) {
    const { sources } = this.state
    try {
      if (sources.findIndex(s => s.path === path) > -1) {
        throw 'folder already exists'
      }

      if (!(await isFileExist('folder', path))) {
        throw 'source path is not a valid directory'
      }

      if (!(await isFileExist('entry', `${path}/index.html`))) {
        throw 'source path is not have a index.html entry file'
      }

      this.setState({ sources: [ ...sources, { name: '', path  } ]})
    } catch (error) {
      message.error(error)
    }
  }

  editSourceName(path, name) {
    const { sources } = this.state
    const newSources = [ ...sources ]
    const index = sources.findIndex(s => s.path === path)
    newSources[index].name = name
    this.setState({ sources: newSources})
  }

  removeAllSources() {
    this.setState({ sources: [] })
  }

  removeSource(path) {
    const { sources } = this.state
    this.setState({ sources: sources.filter(s => s.path !== path ) })
  }

  moveSource(dir, path) {
    const { sources } = this.state
    const index = sources.findIndex(s => s.path === path)
    const newSources = [ ...sources ]
    switch (dir) {
      case 'up':
        newSources[index - 1] = sources[index]
        newSources[index] = sources[index - 1]
        break
      case 'down':
        newSources[index + 1] = sources[index]
        newSources[index] = sources[index + 1]
        break
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
    if (type === 'outPath') {
      this.setState({ outPath: value })
      return 
    }

    if (type === 'features') {
      newDisplay[type] = value
    } else {
      newDisplay[type].value = value
    } 

    this.setState({ display: newDisplay })
  }

  closeProgressModal() {
    this.setState({ progress: [] })
  }

  async generate() {
    const { outPath, display: { logo } } = this.state
    this.setState({ loading: true, progress: [] })
    try {
      if (!(await isFileExist('folder', outPath))) {
        throw 'out path is not a valid directory'
      }

      if (logo.enable && logo.value) {
        if (!(await isFileExist('image', logo.value))) {
          throw 'logo image is not valid or not exists'
        }  
      }
    
      await generate(this.state)
      message.success('generation succeeded')
    } catch (error) {
      this.setState({ loading: false })
      message.error(error)
    }

    this.setState({ loading: false })
  }

  render() {
    const { 
      sources, 
      display,
      outPath,
      loading,
      progress
    } = this.state

    return (
      <div className="wrapper">
        <header></header>
        <Progress
          loading={loading}
          visible={!!progress.length}
          close={this.closeProgressModal.bind(this)}
          data={progress} 
        />
        <main>
          <Spin 
            tip="generate may take a few secondes..."
            spinning={loading}
          >
            <Main 
              disabledRemoveAll={!sources.length}
              sources={sources}
              addSource={this.addSource.bind(this)}
              editSourceName={this.editSourceName.bind(this)}
              removeAllSources={this.removeAllSources.bind(this)}
              removeSource={this.removeSource.bind(this)}
              moveSource={this.moveSource.bind(this)}
              display={display}
              onInputToggle={this.onInputToggle.bind(this)}
              onInputChanged={this.onInputChanged.bind(this)}
              outPath={outPath}
            />
          </Spin>
        </main>
        <footer>
          <Footer 
            disabled={!sources.length || !outPath}
            loading={loading}
            generate={this.generate.bind(this)}
          />
        </footer>
      </div>
    )
  }
}

export default App
