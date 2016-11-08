import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"


@Formfield
@Radium
export class BaseTextArea extends React.Component {
  // Base component for all TextArea elements.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.
  //
  // @prop onChange: You may use this to keep track of this components current
  //   value in your project's wrapper component. This is useful if you want
  //   to build a custom component and set this component's type to `hidden`.
  //

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    valueInitial: React.PropTypes.any,
  }

  constructor(props) {
    // See BaseTextInput for explanation.
    super(props)
    let value = props.valueInitial
    this.state = {value: value}
  }

  componentDidMount() {
    // See BaseTextInput for explanation.
    let { formContext } = this.context
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.value, false)
      if (this.props.onChange) { this.props.onChange(this.state.value) }
    }
  }

  componentWillReceiveProps(nextProps) {
    // See BaseTextInput for explanation.
    if (this.props.valueInitial !== nextProps.valueInitial) {
      let value = nextProps.valueInitial
      this.setState({value: value})
      let { formContext } = this.context
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false)
        if (nextProps.onChange) { nextProps.onChange(value) }
      }
    }
  }

  getDisplayValue() {
    // Whatever this field is, we never want to render `undefined` or `null`,
    // so for display purposes we set it to `""`
    let { type } = this.props
    let { value } = this.state
    if (value === null) { return "" }
    if (value === undefined) { return "" }
    return value
  }

  handleChange(e) {
    // See BaseTextInput for explanation.
    let value = e.target.value
    let { name, onChange } = this.props
    let { formContext } = this.context
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, value, true)
    }
    this.setState({value: value})
    if (onChange) { onChange(value) }
  }

  render() {
    // See BaseTextInput for explanation.
    let { cols, rows, style, type, ...other } = this.props
    let valueDisplay = this.getDisplayValue()
    if (!cols) { cols = "30" }
    if (!rows) { rows = "10" }
    return (
      <textarea
        className="form-control"
        cols={cols}
        onChange={(val) => this.handleChange(val)}
        rows={rows}
        style={style}
        value={valueDisplay}
        {...other}
      ></textarea>
    )
  }
}
