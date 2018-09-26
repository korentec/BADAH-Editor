import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Footer.css'
import { Tooltip, Button } from 'antd'

class Footer extends Component {
  onGenerate() {
    alert('BOOM!')
  }

  render() {
    const { disabled, loading } = this.props

    return (
      <div className="container">
        <p>&copy; Developed by Korentec Technologies for IAI ltd</p>
        <Tooltip title="generate project">
          <Button 
            type="primary"
            onClick={this.onGenerate}
            disabled={disabled}
            loading={loading}
          >
            Generate
          </Button>
        </Tooltip>
      </div>
    )
  }
}

Footer.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Footer