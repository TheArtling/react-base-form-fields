import React from "react"
import PropTypes from "prop-types"
import { Formfield } from "react-get-form-data"

@Formfield
export class MultiText extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    unique: PropTypes.bool,
    renderTag: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    valueInitial: PropTypes.any,
    input: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    action: PropTypes.oneOf(["add", "remove", "none"]),
    addKeys: PropTypes.array,
  }

  static defaultProps = {
    unique: true,
    WrapperStyle: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      tags: props.valueInitial || [],
      propagateChange: false,
      hasUpdated: false,
    }
  }

  componentDidMount() {
    this.handleChange(this.props, this.state.tags, false)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.action !== "none") {
      if (nextProps.action === "add")
        this.handleAddTag(nextProps, nextProps.input)
      if (nextProps.action === "remove") this.handleRemoveTag(nextProps.input)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasUpdated) {
      this.handleChange(this.props, this.state.tags, this.state.propagateChange)
      this.setState({ hasUpdated: false, propagateChange: false })
    }
  }

  handleChange(props, value, propagate) {
    if (this.context) {
      let { formContext } = this.context
      if (formContext && formContext.handleChange)
        formContext.handleChange("", props.name, value, propagate)
    }
    if (props.onChange) props.onChange(value)
  }

  checkExisting(original, valueToCheck) {
    return original.indexOf(valueToCheck) > -1
  }

  handleAddTag(props, newValue) {
    let isEmpty = newValue === ""
    let isExistingValue = false
    if (this.props.unique)
      isExistingValue = this.checkExisting(this.state.tags, newValue)

    if (!isEmpty && !isExistingValue) {
      let newTags = this.state.tags.concat(newValue)
      this.setState({ tags: newTags, hasUpdated: true, propagateChange: true })
    }
    this.props.resetInput()
  }

  handleRemoveTag(removalIndex) {
    let tagLength = this.state.tags.length
    if (tagLength.length === 0) return

    let indexToRemove = removalIndex
    if (removalIndex < 0) indexToRemove += tagLength
    let newTags = this.state.tags.filter(
      (tag, index) => index !== indexToRemove
    )
    this.setState({ tags: newTags, hasUpdated: true, propagateChange: true })
  }

  handleRemoveLastTag() {
    if (this.state.tags.length > 0)
      this.setState({
        tags: this.state.tags.slice(0, -1),
        hasUpdated: true,
        propagateChange: true,
      })
  }

  renderTag(value, index) {
    return this.props.renderTag(value, index)
  }

  render() {
    let { WrapperComp, WrapperStyle, inputComp } = this.props
    let { tags } = this.state
    let renderedTags = []
    if (tags.length > 0)
      renderedTags = tags.map((tag, index) => this.renderTag(tag, index))
    return React.createElement(
      WrapperComp,
      { style: WrapperStyle },
      renderedTags
    )
  }
}
