import React from "react"
import Radium from "radium"

import { Tag } from "./Tag"
import { MultiText } from "./MultiText"

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


@Radium
export class BaseMultiTextInput extends React.Component {
  static propTypes = {
    ...MultiText.propTypes,
    inputStyle: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
  }

  static defaultProps = {
    addKeys: [13, 188] 
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
    this.setState({ focusInput: true })
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
    return (
      <a key={value} onClick={() => this.handleRemove(index)}>
        <Tag>{value}</Tag>
      </a>
    )
  }

  render() {
    let { inputStyle, containerStyle, onChange, ...others } = this.props
    let { input, action } = this.state
    return (
      <div 
        style={[styles.base, containerStyle && containerStyle]} 
        onClick={() => this.handleClick()}
      >
        <MultiText 
          renderTag={(value) => this.renderTag(value)}
          onChange={(value) => this.handleChange(value)}
          resetInput={this.resetInput}
          WrapperComp={"div"}
          input={input}
          action={action}
          {...others}
        />
        <input
          ref={(item) => { this.input = item}}
          onChange={(evt) => this.handleTextChange(evt)}
          onKeyDown={(evt) => this.handleKey(evt)}
          style={[
            styles.input,
            inputStyle && inputStyle
          ]}
          value={input}
        />     
      </div>
    )
  }
}