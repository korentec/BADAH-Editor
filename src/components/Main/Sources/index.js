import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Sources.css'
import { Tooltip, Button } from 'antd'

class Sources extends Component {
  render() {
    const { disabledRemoveAll } = this.props

    return (
      <section>
        <div>
          <Tooltip
            className="action"
            placement="rightTop" 
            title="remove all documents"
          >
            <Button 
              type="primary"
              size="large"
              shape="circle" 
              icon="delete"
              disabled={disabledRemoveAll}
            />
          </Tooltip>
          <Tooltip
            className="action"
            placement="rightTop" 
            title="add document"
          >
            <Button
              type="primary"
              size="large"
              shape="circle" 
              icon="file-add"
            />
          </Tooltip>
        </div>
      </section>
    )
  }
}

Sources.propTypes = {
  disabledRemoveAll: PropTypes.bool.isRequired
}

export default Sources