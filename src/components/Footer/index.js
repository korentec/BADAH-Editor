import React, { Component } from 'react'
import './Footer.css'
import { Button } from 'antd'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      loading: false
    }
  }

  onGenerate() {
    alert('BOOM!')
  }

  render() {
    const { disabled, loading } = this.state

    return (
      <div className="container">
        <p>&copy; Developed by Korentec Technologies for IAI ltd</p>
        <Button 
          type="primary"
          onClick={this.onGenerate}
          disabled={disabled}
          loading={loading}
        >
          Generate
        </Button>
      </div>
    )
  }
}

export default Footer