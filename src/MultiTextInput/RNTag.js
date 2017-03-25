import React from "react"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#c8af78",
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cross: {
    marginLeft: 5,
  },
  font: {
    color: "white",
  }
})

export class Tag extends React.Component {
  render() {
    return (
      <View style={styles.base}>
        <Text style={styles.font}>
          {this.props.children}
        </Text>
        <Text style={[styles.cross,styles.font]}>
          x
        </Text>
      </View>
    )
  }
}