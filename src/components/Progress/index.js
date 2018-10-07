import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Progress.css'
import { Button } from 'antd'

class Progress extends Component {
  render() {
    const { 
      visible, 
      data, 
      close, 
      loading 
    } = this.props

    return (
      <div>
        {visible && <div className="progress-modal">
          <div className="messages">
            {data.map((item, i) => (
              item.type === 'success' ?
                <p key={i} className="success">success: {item.msg}</p> : 
                <p key={i} className="failed">failed: {item.msg}</p>
            ))}
          </div>
          <Button  
            onClick={close}
            disabled={loading}
          >
            ok
          </Button>
        </div>}
      </div>
    )
  }
}

Progress.propTypes = {
  visible: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Progress