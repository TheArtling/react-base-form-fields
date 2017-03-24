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
    width: "100%",
    padding: "10px",
    border: `1px solid grey`,
    borderRadius: "3px",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  input: {
    flex: "1 0 25px",
    minWidth: "15px"
  }
})

export default class BaseMultiTextInput extends React.Component {
  static propTypes = {
    ...MultiText.propTypes,
    inputStyle: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
  }

  static defaultProps = {
    addKeys: [13, 188],
    containerStyle: {},
    inputStyle: {}
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
    this.setState({input: evt.nativeEvent.text})
  }

  handleKey(evt) {
    if (evt.nativeEvent.key == 8) {
      if (this.state.input === "")
        this.handleRemove(-1)
    } else {
      if (this.props.addKeys.indexOf(evt.nativeEvent.key) > -1) {
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
      <TouchableOpacity 
        key={value} 
        onPress={() => this.handleRemove(index)}
      >
        <Tag>{value}</Tag>
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
        <View style={{...styles.base, ...containerStyle}}>
          <MultiText 
            renderTag={(value) => this.renderTag(value)}
            onChange={(value) => this.handleChange(value)}
            resetInput={this.resetInput}
            WrapperComp={"View"}
            input={input}
            action={action}
            {...others}
          />
          <TextInput
            ref={(item) => { this.input = item}}
            onChange={(evt) => this.handleTextChange(evt)}
            onKeyPress={(evt) => this.handleKey(evt)}
            style={{...styles.input, ...inputStyle}}
            underlineColorAndroid="transparent"
            value={input}
          />     
        </View>
      </TouchableWithoutFeedback>
    )
  }
}