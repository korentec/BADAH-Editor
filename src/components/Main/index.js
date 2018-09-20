import React, { Component } from 'react'
import './Main.css'
import { Tabs } from 'antd'

const { TabPane } = Tabs

class Main extends Component {
  onSelectTab(key) {
    console.log(key)
  }

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.onSelectTab}>
        <TabPane tab="Sources" key="sources">Sources Content</TabPane>
        <TabPane tab="Display" key="display">Display Content</TabPane>
        <TabPane tab="General" key="general">General Content</TabPane>
      </Tabs>
    )
  }
}

export default Main