import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Main.css'
import { Tabs } from 'antd'
import Sources from './Sources'
import Display from './Display'
import General from './General'

const { TabPane } = Tabs

class Main extends Component {
  onSelectTab(key) {
    console.log(key)
  }

  render() {
    const { disabledRemoveAll } = this.props

    return (
      <Tabs defaultActiveKey="sources" onChange={this.onSelectTab}>
        <TabPane tab="Sources" key="sources">
          <Sources 
            disabledRemoveAll={disabledRemoveAll}
          />
        </TabPane>
        <TabPane tab="Display" key="display">
          <Display />
        </TabPane>
        <TabPane tab="General" key="general">
          <General />
        </TabPane>
      </Tabs>
    )
  }
}

Sources.propTypes = {
  disabledRemoveAll: PropTypes.bool.isRequired
}

export default Main