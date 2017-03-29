import React, { Component } from 'react'
import { Picker, StyleSheet } from 'react-native'
import { Formfield } from 'react-get-form-data'


class BaseSelectInput extends Component {

  static propTypes = {
    valueInitial: React.PropTypes.number.isRequired,
    choices: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = { value: props.valueInitial }
  }

  handleValueChange = (value) => {
    let { name, onChange } = this.props
    let { formContext } = this.context
    this.setState({ value: value })
    if (formContext && formContext.handleChange) {
      formContext.handleChange('', name, value, true)
    }
    if (onChange) {
      onChange(value)
    }
  }

  componentDidMount = () => {
    let { formContext } = this.context
    if (formContext && formContext.handleChange) {
      formContext.handleChange('', this.props.name, this.state.value, false)
      if (this.props.onChange) {
        this.props.onChange(this.state.value)
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.valueInitial !== nextProps.valueInitial) {
      let value = this.getValue(nextProps.type, nextProps.valueInitial)
      this.setState({ value: value })
      let { formContext } = this.context

      /* istanbul ignore next */
      if (formContext && formContext.handleChange) {
        formContext.handleChange('', nextProps.name, value, false)
        if (nextProps.onChange) {
          nextProps.onChange(value)
        }
      }
    }
  }

  getDisplayValue = (value) => {
    if (value === null) {
      return this.props.name
    }
    if (value === undefined) {
      return this.props.name
    }
    return value
  }

  render () {
    let { choices } = this.props
    return (
      <Picker
        selectedValue={this.getDisplayValue(this.state.value)}
        onValueChange={this.handleValueChange}>
        {choices.map(choice => <Picker.Item
          key={choice.value}
          label={choice.label}
          value={choice.value}
        />)}
      </Picker>

    )
  }
}

const styles = StyleSheet.create({
  base: {}
})


export default Formfield(BaseSelectInput)
