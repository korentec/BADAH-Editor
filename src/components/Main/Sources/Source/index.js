import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Source.css'
import { Tooltip, Button } from 'antd'


class Source extends Component {
  render() {
    const {
      path,
      isFirst,
      isLast
    } = this.props

    return (
      <div className="item">
        <span className="text">{path}</span>
        <span>
          <Tooltip
            className="action"
            placement="rightTop" 
            title="move folder up"
          >
            <Button 
              shape="circle" 
              icon="arrow-up"
              disabled={isFirst}
            />
          </Tooltip>
          <Tooltip
            className="action"
            placement="rightTop" 
            title="move folder down"
          >
            <Button 
              shape="circle" 
              icon="arrow-down"
              disabled={isLast}
            />
          </Tooltip>
          <Tooltip
            className="action"
            placement="rightTop" 
            title="remove folder"
          >
            <Button
              type="danger"
              shape="circle" 
              icon="close"
            />
          </Tooltip>
        </span>
      </div>
    )
  }
}

Source.propTypes = {
  path: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired
}

export default Source