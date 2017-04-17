import React from "react"
import Radium from "radium"

import { Tag } from "./Tag"
import { MultiText } from "./MultiText"

const styles = {
  base: {
    width: "100%",
    padding: ".1em",
    display: "flex",
    flexDirection: "column",
  }
}


@Radium
export class BaseMultiTextInput extends React.Component {
  static propTypes = {
    ...MultiText.propTypes,
    inputStyle: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
  }

  static defaultProps = {
    addKeys: [13, 188],
    inputStyle: {},
    containerStyle: {}
  }

  constructor(props) {
    super(props)
    this.state = { input: "", action: "none" }
    this.resetInput = this.resetValues.bind(this)
  }

  resetValues() {
    this.setState({input: "", action: "none"})
  }

  handleTextChange(evt) {
    this.setState({input: evt.target.value})
  }

  handleKey(evt) {
    if (evt.keyCode == 8) {
      if (this.state.input === "")
        this.handleRemove(-1)
    } else {
      if (this.props.addKeys.indexOf(evt.keyCode) > -1) {
        this.setState({action: "add"})
        evt.preventDefault()
      }
    }
  }

  handleClick() {
    if (this.input)
      this.input.focus()
  }

  handleRemove(index) {
    this.setState({action: "remove", input: index })
  }

  handleChange(value) {
    if (this.props.onChange)
      this.props.onChange(value)
    this.resetValues()
  }

  renderTag(value, index) {
    let tag
    if (this.props.renderTag)
      tag = this.props.renderTag(value, index)
    else 
      tag = <Tag>{value}</Tag>
    return (
      <span key={value} onClick={() => this.handleRemove(index)}>
        {tag}
      </span>
    )
  }

  render() {
    let { inputStyle, containerStyle, onChange, ...others } = this.props
    let { input, action } = this.state
    return (
      <div 
        style={[styles.base, containerStyle]} 
        onClick={() => this.handleClick()}
      >
        <MultiText 
          renderTag={(value,index) => this.renderTag(value,index)}
          onChange={(value) => this.handleChange(value)}
          resetInput={this.resetInput}
          WrapperComp={"div"}
          WrapperStyle={
            {
              flexDirection: "row", 
              flexWrap: "wrap", 
              alignItems: "center",
            }
          }
          input={input}
          action={action}
          {...others}
        />
        <input
          ref={(item) => { this.input = item}}
          onChange={(evt) => this.handleTextChange(evt)}
          onKeyDown={(evt) => this.handleKey(evt)}
          style={inputStyle}
          value={String(input)}
        />     
      </div>
    )
  }
}