import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"


@Formfield
@Radium
export class BaseTextInput extends React.Component {
  // Base component for all Input elements of type `text`.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    valueInitial: React.PropTypes.any,
  }

  constructor(props) {
    // The component manages it's own state internally. So when it is created
    // we save the initial value into the state.
    super(props)
    let value = this.getValue(props, props.valueInitial)
    this.state = {value: value}
  }

  componentDidMount() {
    // When this component gets mounted, it might already have an initial
    // value. However, when you call `form.getValues()` you would receive an
    // empty object because no keystrokes have been made into the form fields,
    // yet.
    //
    // To work around this, we emit a signal to the parent <Form> component
    // here. Note the last parameter which is `false`. This makes sure that the
    // <Form> does take note of the new value, but does not emit it's `onChange`
    // event.
    let { formContext } = this.context
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.value, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    // Usually, the value of this component can only change when the user types
    // into the input element.
    //
    // However, in some edge cases you might want to change this component's
    // value via other means, for example when the user clicks the back button
    // in the browser and the URL changes from `?search=Foo` to `?search=Bar`.
    // In this case we would like to update the input's value from `Foo` to
    // `Bar`.
    //
    // We can do that by simply changing the `valueInitial` that we are passing
    // into this component as a prop. This component will inform the parent
    // <Form> about the change, but without emitting the form's `onChange`.
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
    // Helper function to "normalize" the value.
    // If this field is a number field, we want "" to be `null`, internally.
    let { type } = props
    if (type === "number" && value === "") { value = null }
    return value
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
    // If the user typed into the input field, we will save the new value
    // into this.state and inform the parent <Form> about the new value.
    let value = e.target.value
    let { name, type } = this.props
    let { formContext } = this.context
    value = this.getValue(this.props, value)
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, value, true)
    }
    this.setState({value: value})
  }

  render() {
    // NOTE: We display the displayValue to the user, but when you call
    // form.getValues() you will get whatever internal value we computed in
    // `this.getValue()`, so the `<input value="blabla" />` in your DOM
    // might not be what you will actually POST to your API.
    let { style, type, ...other } = this.props
    let valueDisplay = this.getDisplayValue()
    return (
      <input
        className="form-control"
        onChange={(val) => this.handleChange(val)}
        style={style}
        type={type}
        value={valueDisplay}
        {...other}
      />
    )
  }
}
