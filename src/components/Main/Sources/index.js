import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Sources.css'
import { Tooltip, Button } from 'antd'
import Source from './Source'

class Sources extends Component {
  render() {
    const { 
      disabledRemoveAll, 
      sources
    } = this.props

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
        <div className="list">
          {sources.length ? 
          sources.map((s, i) => (
            <Source 
              key={i} 
              path={s}
              isFirst={i === 0}
              isLast={i === (sources.length - 1)}
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
  sources: PropTypes.array.isRequired
}

export default Sources