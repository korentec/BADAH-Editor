import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Display.css'
import { 
  Switch, 
  Input, 
  Select, 
  Upload, 
  Button, 
  Tooltip,
  Checkbox
} from 'antd'
import { themesOptions, featuresOptions } from '../../../config'

const Option = Select.Option
const CheckboxGroup = Checkbox.Group

class Display extends Component {
  onSelectLogo(file) {
    this.props.onInputChanged('logo', file.path) 
    return Promise.reject()
  }

  render() {
    const {
      display: {
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
            style={{ width: 600 }}
            disabled={!theme.enable}
            value={theme.value}
            onChange={value => { onInputChanged('theme', value) }}
          >
            {themesOptions.map((color, i) => <Option key={i} value={color}>{color}</Option>)}
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
          <span className="upload-container">
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
                  icon="picture"
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
          </span>
        </div>
        <div className="box">
          <CheckboxGroup
            options={featuresOptions} 
            onChange={values => { onInputChanged('features', values) }} 
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