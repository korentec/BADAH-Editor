import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Source.css'
import { Tooltip, Button } from 'antd'


class Source extends Component {
  render() {
    const {
      path,
      isFirst,
      isLast,
      removeSource,
      moveSource
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
              onClick={() => { moveSource('up', path) }}
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
              onClick={() => { moveSource('down', path) }}
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
              onClick={() => { removeSource(path) }}
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
  isLast: PropTypes.bool.isRequired,
  removeSource: PropTypes.func.isRequired,
  moveSource: PropTypes.func.isRequired
}

export default Source