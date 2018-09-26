import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Display.css'
import { 
  Switch, 
  Input, 
  Select, 
  Upload, 
  Button, 
  Tooltip 
} from 'antd'

const Option = Select.Option

class Display extends Component {
  onSelectLogo(file) {
    this.props.onInputChanged('logo', file.path) 
    return Promise.reject()
  }

  render() {
    const {
      display: {
        features,
        label,
        classification,
        theme,
        logo
      },
      onInputToggle,
      onInputChanged
    } = this.props
    return (
      <section>
        <div className="box">
          <span>
            <Switch 
              value={label.enable} 
              onChange={checked => { onInputToggle('label', checked) }} 
            />
            <span className="label">
              Custom label:
            </span>
          </span>
          <Input
            className="input"
            disabled={!label.enable}
            placeholder="label input.."
            value={label.value}
            onChange={e => { onInputChanged('label', e.target.value) }}
          />            
        </div>
        <div className="box">
          <span>
            <Switch 
              value={classification.enable} 
              onChange={checked => { onInputToggle('classification', checked) }} 
            />
            <span className="label">
              Custom classification:
            </span>
          </span>
          <Input
            className="input"
            disabled={!classification.enable}
            placeholder="classification input.."
            value={classification.value}
            onChange={e => { onInputChanged('classification', e.target.value) }}
          />            
        </div>
        <div className="box">
          <span>
            <Switch 
              value={theme.enable} 
              onChange={checked => { onInputToggle('theme', checked) }} 
            />
            <span className="label">
              Custom theme:
            </span>
          </span>
          <Select
            style={{ width: 300 }}
            disabled={!theme.enable}
            value={theme.value}
            onChange={value => { onInputChanged('theme', value) }}
          >
            <Option value="blue">blue</Option>
            <Option value="gray">gray</Option>
            <Option value="green">green</Option>
            <Option value="red">red</Option>
          </Select>      
        </div>
        <div className="box">
          <span>
            <Switch 
              value={logo.enable} 
              onChange={checked => { onInputToggle('logo', checked) }} 
            />
            <span className="label">
              Custom logo:
            </span>
          </span>
          <Upload 
            accept="image/*"
            beforeUpload={this.onSelectLogo.bind(this)}
          >
            <Tooltip
              className="action"
              title="select logo"
            >
              <Button
                type="primary"
                icon="file-add"
                disabled={!logo.enable}
              />
            </Tooltip>
          </Upload>
          <Input
            className="input"
            disabled={!logo.enable}
            placeholder="logo path..."
            value={logo.value}
            onChange={e => { onInputChanged('logo', e.target.value) }} 
          />  
        </div>
      </section>
    )
  }
}

Display.propTypes = {
  display: PropTypes.object.isRequired,
  onInputToggle: PropTypes.func.isRequired,
  onInputChanged: PropTypes.func.isRequired
}

export default Display