import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Footer.css'
import { Button } from 'antd'

class Footer extends Component {
  onGenerate() {
    alert('BOOM!')
  }

  render() {
    const { disabled, loading } = this.props

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

Footer.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Footer