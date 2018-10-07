import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Source.css'
import { Input, Tooltip, Button } from 'antd'


class Source extends Component {
  render() {
    const {
      src: {
        name,
        path
      },
      isFirst,
      isLast,
      editSourceName,
      removeSource,
      moveSource
    } = this.props

    return (
      <div className="item">
       <Input
          className="reverb-name"
          placeholder="reverb name"
          value={name}
          onChange={e => { editSourceName(path, e.target.value) }}
        />  
        <span className="text">{path}</span>
        <span>
          <Tooltip
            className="action"
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
  src: PropTypes.object.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  editSourceName: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
  moveSource: PropTypes.func.isRequired
}

export default Source