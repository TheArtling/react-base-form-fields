import React from "react"
import { 
  View, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
} from "react-native"

import { Tag } from "./RNTag"
import { MultiText } from "./MultiText"

const styles = StyleSheet.create({
  base: {
    padding: 5,
    flexDirection: "column",
  }
})

export default class BaseMultiTextInput extends React.Component {
  static propTypes = {
    ...MultiText.propTypes,
    inputStyle: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
  }

  static defaultProps = {
    addKeys: [",", "Enter"],
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
    let lastEnteredKey = evt.nativeEvent.text.slice(-1)
    if (lastEnteredKey == 8) {
      if (this.state.input === "")
        this.handleRemove(-1)
    } else if (this.props.addKeys.indexOf(lastEnteredKey) > -1){
      this.setState({action: "add"})
    } else {
      this.setState({input: evt.nativeEvent.text})
    }
  }

  handleSubmit(evt) {
    if (this.state.input !== "") {
      this.setState({action: "add"})
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
      <TouchableOpacity 
        key={value} 
        onPress={() => this.handleRemove(index)}
      >
        {tag}
      </TouchableOpacity>
    )
  }

  render() {
    let { inputStyle, containerStyle, onChange, ...others } = this.props
    let { input, action } = this.state
    return (
      <TouchableWithoutFeedback
        onPress={() => this.handleClick()}
      >
        <View style={[styles.base, containerStyle]}>
          <MultiText 
            renderTag={(value,index) => this.renderTag(value,index)}
            onChange={(value) => this.handleChange(value)}
            resetInput={this.resetInput}
            WrapperComp={View}
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
          <TextInput
            ref={(item) => { this.input = item}}
            onChange={(evt) => this.handleTextChange(evt)}
            onSubmitEditing={(evt) => this.handleSubmit(evt)}
            style={inputStyle}
            underlineColorAndroid="transparent"
            value={String(input)}
          />  
        </View>
      </TouchableWithoutFeedback>
    )
  }
}