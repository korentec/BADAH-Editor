import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Sources.css'
import { Tooltip, Button, Upload, Popconfirm } from 'antd'
import Source from './Source'

class Sources extends Component {
  onSelectFolder(folder) {
    const { path } = folder
    this.props.addSource(path)
    return Promise.reject()
  }

  render() {
    const { 
      disabledRemoveAll, 
      sources,
      removeAllSources,
      removeSource,
      moveSource
    } = this.props

    return (
      <section>
        <div>
          <Tooltip
            className="action"
            placement="rightTop" 
            title="remove all folders"
          >
            <Popconfirm
              title="Are you sure?"
              onConfirm={removeAllSources}
            >
              <Button 
                type="primary"
                size="large"
                shape="circle" 
                icon="delete"
                disabled={disabledRemoveAll}
              />
            </Popconfirm>
          </Tooltip>
          <Upload 
            directory
            beforeUpload={this.onSelectFolder.bind(this)}
          >
            <Tooltip
              className="action"
              placement="rightTop" 
              title="add folder"
            >
              <Button
                type="primary"
                size="large"
                shape="circle" 
                icon="file-add"
              />
            </Tooltip>
          </Upload>
        </div>
        <div className="list">
          {sources.length ? 
          sources.map((s, i) => (
            <Source 
              key={i}
              path={s}
              isFirst={i === 0}
              isLast={i === (sources.length - 1)}
              removeSource={removeSource}
              moveSource={moveSource}
            />
          )) 
          : <p className="no-items-msg">No sources...</p>}
        </div>
      </section>
    )
  }
}

Sources.propTypes = {
  disabledRemoveAll: PropTypes.bool.isRequired,
  sources: PropTypes.array.isRequired,
  addSource: PropTypes.func.isRequired,
  removeAllSources: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
  moveSource: PropTypes.func.isRequired
}

export default Sources