import React, { Component } from 'react'
import './App.css'
import Main from './components/Main'
import Footer from './components/Footer'
import { message, Spin } from 'antd'
import { generate } from './utils/generate'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 1234, // TBD: use guid
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

  addSource(path) {
    // TBD: validate source
    const { sources } = this.state
    if (sources.indexOf(path) === -1) {
      this.setState({ sources: [ ...sources, path ]})
    } else {
      message.error('folder already exists')
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
      // TBD: validate out path
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

  generate() {
    this.setState({ loading: true })
    generate(this.state).then(() => {
      this.setState({ loading: false })
      message.success('generation succeeded')
    }).catch(() => {
      this.setState({ loading: false })
      message.error('generation failed')
    })
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
