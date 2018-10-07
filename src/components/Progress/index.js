import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Progress.css'
import { Button } from 'antd'

class Progress extends Component {
  render() {
    const { visible, data, close } = this.props

    return (
      <div>
        {visible && <div className="progress-modal">
          {data.map(item => (
            item.type === 'success' ?
              <p className="failed">{item.msg}</p> : 
              <p className="success">{item.msg}</p>
          ))}
          <Button onClick={close}>ok</Button>
        </div>}
      </div>
    )
  }
}

Progress.propTypes = {
  visible: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired
}

export default Progress