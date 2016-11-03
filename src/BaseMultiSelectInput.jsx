import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"


@Formfield
@Radium
export class BaseMultiSelectInput extends React.Component {
  // Base component for a DropDownList that can have several selected items.
  // In order to style this, write a wrapper component that has this as a child
  // and passes in all necessary props.
  //
  // @prop renderDisplay(value): This function should return the component
  //   that is rendered when the DDL is not selected.
  //
  // @prop renderItem(name, index, label, value, selected, handleChangeCallback):
  //   This function should return the component that represents one selectable
  //   option in the modal that opens when the user clicks at the displayValue.
  //
  // @prop modal: Your project's component class for a modal. It must have a
  //   `showModal` prop, if set to `true`, it should show the modal. It must
  //   emit an `onClose` event that can be handled by this base component.

  static propTypes = {
    modal: React.PropTypes.any.isRequired,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    renderDisplay: React.PropTypes.func.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    valueInitial: React.PropTypes.any,
  }

  constructor(props) {
    // See BaseTextInput for explanation.
    super(props)
    let value = this.getValue(props.valueInitial)
    this.state = {value: value, isActive: false}
  }

  componentWillReceiveProps(nextProps) {
    // See BaseTextInput for explanation.
    if (this.props.valueInitial !== nextProps.valueInitial) {
      let value = this.getValue(nextProps.valueInitial)
      this.setState({value: value})
      let { formContext } = this.context
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false)
      }
    }
  }

  getValue(value) {
    // Helper function to "normalize" the value.
    // If this field is empty, we turn it into an empty Array.
    // If this field is not an Array, we turn it into an Array with one element.
    if (!value) { value = [] }
    if (value instanceof Array === false) { value = [value] }
    return value
  }

  handleChange(e) {
    // See BaseTextInput for explanation.
    //
    // This component is based on checkboxes. If the user clicks on a checkbox,
    // it always emits the checkbox value, we don't know if it was checked or
    // unchecked. Therefore, we check if the value currently exists in our
    // internal state or not. If it exists, we remove it, if it doesn't exist,
    // we add it.
    //
    let { value } = this.state
    let newValue = e.target.value
    let newValueList = value
    let found = false
    value.forEach((item, index) => {
      if (item === newValue) {
        found = true
        newValueList.splice(index, 1)
      }
    })
    if (!found) { newValueList.push(newValue) }

    let { name } = this.props
    let { formContext } = this.context
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", name, newValueList, true)
    }
    this.setState({value: newValueList})
  }

  getDisplayValue() {
    // Returns the value that should be shown when the DDL is not activated.
    //
    // This should be a comma separated list of selected items.
    //
    let { options } = this.props
    let { value } = this.state
    let displayValue = ""
    value.forEach((value) => {
      options.forEach((option) => {
        if (value === option.value) {
          displayValue += `${option.label}, `
        }
      })
    })
    if (displayValue) { displayValue = displayValue.replace(/, $/, "") }
    if (!displayValue) { return options[0].label }
    return displayValue
  }

  handleClick() {
    // Toggles active state of the modal when user clicks at the displayValue.
    this.setState({isActive: !this.state.isActive})
  }

  handleClose() {
    // Closes the modal.
    this.setState({isActive: false})
  }

  renderItems() {
    // Renders the items that should be shown in the modal.
    //
    // These should be checkboxes so that the user can select many items.
    //
    let { name, options, renderItem } = this.props
    let { value } = this.state
    return options.map((option, index) => {
      let selected = false
      value.forEach((valueItem) => {
        if (valueItem === option.value) { selected = true }
      })
      let item = renderItem(
        name,
        index,
        option.label,
        option.value,
        selected,
        (e) => this.handleChange(e)
      )
      return item
    })
  }

  render() {
    let { renderDisplay } = this.props
    let { isActive } = this.state
    let value = this.getDisplayValue()
    return (
      <div>
        <div onClick={() => this.handleClick()}>
          {renderDisplay(value)}
        </div>
        <this.props.modal showModal={isActive} onClose={() => this.handleClose()}>
          {this.renderItems()}
        </this.props.modal>
      </div>
    )
  }
}
