import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './General.css'
import { Upload, Tooltip, Button, Input } from 'antd'

class General extends Component {
  onSelectFolder(folder) {
    const { path } = folder
    this.props.onInputChanged('outPath', path)
    return Promise.reject()
  }
  
  render() {
    const { outPath, onInputChanged } = this.props

    return (
      <section>
        <div className="box">
          <span>
            <span className="label">
              Out path:
            </span>
          </span>
          <span className="upload-container">
            <Upload 
              directory
              beforeUpload={this.onSelectFolder.bind(this)}
            >
              <Tooltip
                className="action"
                title="select folder"
              >
                <Button
                  type="primary"
                  icon="save"
                />
              </Tooltip>
            </Upload>
            <Input
              className="input"
              placeholder="logo path..."
              value={outPath}
              onChange={e => { onInputChanged('outPath', e.target.value) }} 
            />
          </span>
        </div>
      </section>
    )
  }
}

General.propTypes = {
  outPath: PropTypes.string.isRequired,
  onInputChanged: PropTypes.func.isRequired
}

export default General