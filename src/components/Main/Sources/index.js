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
      editSourceName,
      removeAllSources,
      removeSource,
      moveSource
    } = this.props

    return (
      <section>
        <div className="actions">
        <Popconfirm
              title="Are you sure?"
              onConfirm={removeAllSources}
            >
            <Tooltip
              className="action"
              title="remove all folders"
            >
              <Button 
                type="primary"
                size="large"
                shape="circle" 
                icon="delete"
                disabled={disabledRemoveAll}
              />
            </Tooltip>
          </Popconfirm>
          <Upload 
            directory
            beforeUpload={this.onSelectFolder.bind(this)}
          >
            <Tooltip
              className="action"
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
              src={s}
              isFirst={i === 0}
              isLast={i === (sources.length - 1)}
              editSourceName={editSourceName}
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
  editSourceName: PropTypes.func.isRequired,
  removeAllSources: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
  moveSource: PropTypes.func.isRequired
}

export default Sources