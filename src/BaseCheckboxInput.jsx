import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"


@Formfield
@Radium
export class BaseCheckboxInput extends React.Component {
  // Base component for all Checkbox elements.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.
  //
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    valueInitial: React.PropTypes.any,
  }

  constructor(props) {
    super(props)
    let value = this.getValue(props, props.valueInitial)
    this.state = {value: value}
  }

  componentDidMount() {
    let { formContext } = this.context
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.value, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.valueInitial !== nextProps.valueInitial) {
      let value = this.getValue(nextProps, nextProps.valueInitial)
      this.setState({value: value})
      let { formContext } = this.context
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false)
      }
    }
  }

  getValue(props, value) {
    // whenever we `setState({value: something})` we make sure to pass the new
    // value through this function, first, so that the internal value is always
    // either `true` or `false`.
    //
    if (value) { return true }
    return false
  }

  getDisplayValue() {
    // the checkbox doesn't really have a display value. We return `checked`
    // or `""`, instead, which controls the checked status of the checkbox.
    //
    let { value } = this.state
    if (value === true) { return "checked" }
    return ""
  }

  handleChange(e) {
    let { value } = this.state
    let { name } = this.props
    let { formContext } = this.context
    value = !value
    value = this.getValue(this.props, value)
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, value, true)
    }
    this.setState({value: value})
  }

  render() {
    let { children, style, ...other } = this.props
    let valueDisplay = this.getDisplayValue()
    return (
      <input
        onChange={(val) => this.handleChange(val)}
        style={style}
        type="checkbox"
        checked={valueDisplay}
        {...other}
      />
    )
  }
}
