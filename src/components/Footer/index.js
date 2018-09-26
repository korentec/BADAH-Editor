import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Footer.css'
import { Tooltip, Button } from 'antd'

class Footer extends Component {
  render() {
    const { disabled, loading, generate } = this.props

    return (
      <div className="container">
        <p>&copy; Developed by Korentec Technologies for IAI ltd</p>
        <Tooltip title="generate project">
          <Button 
            type="primary"
            onClick={generate}
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
  loading: PropTypes.bool.isRequired,
  generate: PropTypes.func.isRequired
}

export default Footer