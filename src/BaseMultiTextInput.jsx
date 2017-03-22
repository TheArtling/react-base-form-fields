import React from "react"
import Radium from "radium"
import { Formfield } from "react-get-form-data"

const styles = {
  base: {
    width: "100%",
    padding: ".1em",
    border: `1px solid grey`,
    borderRadius: "3px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  input: {
    flex: "1 0 25px",
    minWidth: "15px"
  }
}

class Tag extends React.Component {
  render() {
    return (
      <span 
        style={{
          padding: ".25em .5em", 
          backgroundColor: "#c8af78",
          margin: "5px",
          color: "white",
          display: "inline-block"
        }}>
        {this.props.children}
        <span
          style={{
            marginLeft: "10px", 
            textDecoration: "none",
          }}>
          x
        </span>
      </span>
    )
  }
}

@Formfield
@Radium
export class BaseMultiTextInput extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    unique: React.PropTypes.bool,
    renderTag: React.PropTypes.func,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    valueInitial: React.PropTypes.any,
    inputStyle: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
    addKeys: React.PropTypes.array,
  }

  static defaultProps = {
    unique: true,
    addKeys: [13, 188] // Enter key and ','
  }

  constructor(props) {
    super(props)
    let value = props.valueInitial ? props.valueInitial : []
    this.state = {
      current: "",
      tags: value,
      hasUpdated: false,
    }
  }

  componentDidMount() {
    let { formContext } = this.context
    if (formContext && formContext.handleChange) {
      formContext.handleChange("", this.props.name, this.state.tags, false)
      if (this.props.onChange) { this.props.onChange(this.state.tags) }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.valueInitial !== nextProps.valueInitial) {
      let value = nextProps.valueInitial
      this.setState({tags: value})
      let { formContext } = this.context
      if (formContext && formContext.handleChange) {
        formContext.handleChange("", nextProps.name, value, false)
        if (nextProps.onChange) { nextProps.onChange(value) }
      }
    }
  }

  handleCheckExisting(original, valueToCheck) {
    return original.indexOf(valueToCheck) > -1
  }

  handleAddTag(value) {
    let newValue = value
    let isEmpty = newValue === ""
    let isExistingValue = false
    if (this.props.unique) {
      isExistingValue = this.handleCheckExisting(this.state.tags, newValue)
    }
    if (!isEmpty && !isExistingValue) {
      let newTags = this.state.tags.concat(newValue)
      let newState = { current: "", tags: newTags, hasUpdated: true}
      this.setState(newState)
    } else {
      this.setState({ current: "" })
    }
  }

  handleChange(e) {
    this.setState({current: e.target.value})
  }

  handleClick() {
    if (this.input)
      this.input.focus()
  }

  removeTag(value) {
    let newTags = this.state.tags.filter((tag) => tag !== value)
    this.setState({tags: newTags, hasUpdated: true})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasUpdated) {
      let { name, onChange } = this.props
      let { formContext } = this.context
      if (formContext && formContext.handleChange) 
        formContext.handleChange("", name, this.state.tags, true)

      if (onChange) 
        onChange(this.state.tags)
      this.setState({hasUpdated: false})
    }
  }

  handleKey(evt) {
    //test for backspace
    if (evt.keyCode === 8) {
      if (this.state.current === "" && this.state.tags.length > 0) {
        this.setState({
          tags: this.state.tags.slice(0, -1),
          hasUpdated: true
        })
      }
    }
    //test for enter and ','
    if (this.props.addKeys.indexOf(evt.keyCode) > -1) {
      if (this.state.current !== "") {
        this.handleAddTag(this.state.current)
        evt.preventDefault()
      }
    } 
  }

  renderTag(value) {
    let node 
    if (this.props.renderTag)
      node = this.props.renderTag(value)
    else 
      node = <Tag>{value}</Tag>
    return (
      <a key={value} onClick={() => this.removeTag(value)}>
        {node}
      </a>
    )
  }

  render() {
    let { inputStyle, containerStyle } = this.props
    let { current, tags } = this.state
    let renderedTags = tags.map((tag) => this.renderTag(tag))
    return (
      <div 
        style={[styles.base, containerStyle && containerStyle]} 
        onClick={() => this.handleClick()}
      >
        {renderedTags}
        <input
          ref={(item) => { this.input = item}}
          onChange={(evt) => this.handleChange(evt)}
          onKeyDown={(evt) => this.handleKey(evt)}
          style={[
            styles.input,
            inputStyle && inputStyle
          ]}
          value={current}
        />     
      </div>
    )
  }
}