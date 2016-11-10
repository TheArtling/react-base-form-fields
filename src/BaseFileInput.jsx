import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"


const styles = {
  input: {
    bottom: 0,
    cursor: "pointer",
    height: "100%",
    left: 0,
    opacity: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
  },
}


@Formfield
@Radium
export class BaseFileInput extends React.Component {
  static propTypes = {
    maxSize: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    onFileTooBig: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func,
  }

  handleChange(val) {
    let { dispatch, maxSize, name, onChange, onFileTooBig } = this.props
    let { formContext } = this.context
    let self = this;
    let reader = new FileReader();
    let file = val.target.files[0];
    reader.onload = function(upload) {
      let value = upload.target.result
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", name, value, true)
      }
      if (onChange) { onChange(value) }
    }
    if (file.size <= maxSize) {
      reader.readAsDataURL(file);
    } else {
      onFileTooBig()
    }
  }

  render() {
    let { name } = this.props
    return (
      <input
        name={name}
        onChange={(val) => this.handleChange(val)}
        type="file"
        style={[styles.input]}
      />
    )
  }
}
