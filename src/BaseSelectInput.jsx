import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"


const styles = {
  invisible: {
    height: "100%",
    opacity: "0",
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    WebkitAppearance: "none",
  }
}


@Formfield
@Radium
export class BaseSelectInput extends React.Component {
  // Base component for all Select elements.
  //
  // Renders an invisible <select> element that takes 100% of it's parent
  // element's space. Wrap this component in your own and just style how your
  // DDL should look like. When the user clicks into it, this component's
  // actual <select> element will trigger and show the browser default's DDL
  // option list.
  //
  // @prop onChange(value): Function that handles the change event. You will
  //   need this to keep track of the current value in your project's wrapper
  //   component around this component.
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

  getDisplayValue() { return this.state.value }

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
    let { choices, onChange, ...other } = this.props
    let valueDisplay = this.getDisplayValue()
    return (
      <select
        style={[styles.invisible]}
        onChange={(val) => this.handleChange(val)}
        value={valueDisplay}
        {...other}
      >
        {choices.map (function (choice) {
          return (
            <option
              key={choice.value}
              value={choice.value}
            >
              {choice.label}
            </option>
          )
        })}
      </select>
    )
  }
}
