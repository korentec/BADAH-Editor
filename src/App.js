import React, { Component } from 'react'
import './App.css'
import Main from './components/Main'
import Footer from './components/Footer'
import { message, Spin } from 'antd'
import { generate } from './utils/generate'
import { isFileExist } from './utils/validate'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      sources: [
        'C:\\Users\\yuval\\projects\\BADAH\\BADAH-docs\\Examples\\Reverb1',
        'C:\\Users\\yuval\\projects\\BADAH\\BADAH-docs\\Examples\\Reverb2'
      ],
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
      outPath: 'C:\\Users\\yuval\\Desktop'
    }
  }

  async addSource(path) {
    const { sources } = this.state
    try {
      if (sources.indexOf(path) > -1) {
        throw 'folder already exists'
      }

      if (!(await isFileExist('folder', path))) {
        throw 'source path is not a valid directory'
      }

      if (!(await isFileExist('entry', `${path}/index.html`))) {
        throw 'source path is not have a index.html entry file'
      }

      this.setState({ sources: [ ...sources, path ]})
    } catch (error) {
      message.error(error)
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
        break
      case 'down':
        newSources[index + 1] = path
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

  async generate() {
    const { outPath, display: { logo } } = this.state
    this.setState({ loading: true })
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
      message.error(error || 'generation failed')
    }

    this.setState({ loading: false })
  }

  render() {
    const { 
      sources, 
      display,
      outPath,
      loading
    } = this.state

    return (
      <div className="wrapper">
        <header></header>
        <main>
          <Spin 
            tip="generate may take a few minutes ..." 
            spinning={loading}
          >
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
