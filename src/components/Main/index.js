import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Main.css'
import { Tabs } from 'antd'
import Sources from './Sources'
import Display from './Display'
import General from './General'

const { TabPane } = Tabs

class Main extends Component {
  render() {
    const { 
      disabledRemoveAll,
      sources,
      addSource,
      removeAllSources,
      removeSource,
      moveSource,
      display,
      onInputToggle,
      onInputChanged,
      outPath
    } = this.props

    return (
      <Tabs defaultActiveKey="sources">
        <TabPane tab="Sources" key="sources">
          <Sources 
            disabledRemoveAll={disabledRemoveAll}
            sources={sources}
            addSource={addSource}
            removeAllSources={removeAllSources}
            removeSource={removeSource}
            moveSource={moveSource}
          />
        </TabPane>
        <TabPane tab="Display" key="display">
          <Display 
            display={display}
            onInputToggle={onInputToggle}
            onInputChanged={onInputChanged}
          />
        </TabPane>
        <TabPane tab="General" key="general">
          <General 
            outPath={outPath}
            onInputChanged={onInputChanged}
          />
        </TabPane>
      </Tabs>
    )
  }
}

Main.propTypes = {
  disabledRemoveAll: PropTypes.bool.isRequired,
  sources: PropTypes.array.isRequired,
  addSource: PropTypes.func.isRequired,
  removeAllSources: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
  moveSource: PropTypes.func.isRequired,
  display: PropTypes.object.isRequired,
  onInputToggle: PropTypes.func.isRequired,
  onInputChanged: PropTypes.func.isRequired,
  outPath: PropTypes.string.isRequired
}

export default Main