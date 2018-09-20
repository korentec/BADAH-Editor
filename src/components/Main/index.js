import React, { Component } from 'react'
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
    return (
      <Tabs defaultActiveKey="sources" onChange={this.onSelectTab}>
        <TabPane tab="Sources" key="sources">
          <Sources />
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

export default Main