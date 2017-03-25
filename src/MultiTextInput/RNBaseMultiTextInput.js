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
    padding: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  input: {
    minWidth: 15
  }
})

export default class BaseMultiTextInput extends React.Component {
  static propTypes = {
    ...MultiText.propTypes,
    inputStyle: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
  }

  static defaultProps = {
    addKeys: [',', 'Enter'],
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
    console.log(evt.nativeEvent)
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
        <View style={[styles.base, containerStyle]}>
          <MultiText 
            renderTag={(value,index) => this.renderTag(value,index)}
            onChange={(value) => this.handleChange(value)}
            resetInput={this.resetInput}
            WrapperComp={View}
            input={input}
            action={action}
            {...others}
          />
          <TextInput
            ref={(item) => { this.input = item}}
            onChange={(evt) => this.handleTextChange(evt)}
            onSubmitEditing={(evt) => this.handleSubmit(evt)}
            style={[styles.input, inputStyle]}
            underlineColorAndroid="transparent"
            value={input}
          />     
        </View>
      </TouchableWithoutFeedback>
    )
  }
}