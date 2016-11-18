import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"


@Formfield
@Radium
export class BaseTextInput extends React.Component {
  // Base component for all Input elements of type `text`.
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
    type: React.PropTypes.string.isRequired,
    valueInitial: React.PropTypes.any,
  }

  constructor(props) {
    // The component manages it's own state internally. So when it is created
    // we save the initial value into the state.
    super(props)
    let value = this.getValue(props.type, props.valueInitial)
    this.state = {value: value}
  }

  /* istanbul ignore next */
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
      if (this.props.onChange) { this.props.onChange(this.state.value) }
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
    // <Form> about the change, but without emitting the form's `onChange` (
    // thanks to the `false` parameter in `handleChange)`).
    //
    if (this.props.valueInitial !== nextProps.valueInitial) {
      let value = this.getValue(nextProps.type, nextProps.valueInitial)
      this.setState({value: value})
      let { formContext } = this.context

      /* istanbul ignore next */
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false)
        if (nextProps.onChange) { nextProps.onChange(value) }
      }
    }
  }

  getValue(type, value) {
    // Helper function to "normalize" the value.
    // If this field is a number field, we want "" to be `null`, internally.
    if (type === "number" && value === "") { value = null }
    return value
  }

  getDisplayValue(value) {
    // Whatever this field is, we never want to render `undefined` or `null`,
    // so for display purposes we set it to `""`
    if (value === null) { return "" }
    if (value === undefined) { return "" }
    return value
  }

  handleChange(e) {
    // If the user typed into the input field, we will save the new value
    // into this.state and inform the parent <Form> about the new value.
    let value = e.target.value
    let { name, onChange } = this.props
    let { formContext } = this.context
    value = this.getValue(this.props.type, value)
    this.setState({value: value})
    /* istanbul ignore next */
    if (true) {
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", name, value, true)
      }
      if (onChange) { onChange(value) }
    }
  }

  render() {
    // NOTE: We display the displayValue to the user, but when you call
    // form.getValues() you will get whatever internal value we computed in
    // `this.getValue()`, so the `<input value="blabla" />` in your DOM
    // might not be what you will actually POST to your API.
    let { style, type, valueInitial, ...other } = this.props
    let valueDisplay = this.getDisplayValue(this.state.value)
    return (
      <input
        className="form-controll"
        onChange={(val) => this.handleChange(val)}
        style={style}
        type={type}
        value={valueDisplay}
        {...other}
      />
    )
  }
}
