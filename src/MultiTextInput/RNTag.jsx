import React from "react"
import { View, Text, StyleSheet } from "react-native"

const styles = {
  base: {
    backgroundColor: "#c8af78",
    color: "white",
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cross: {
    marginLeft: 5,
  }
}

export default class Tag extends React.Component {
  render() {
    return (
      <View style={styles.base}>
        <Text>
          {this.props.children}
        </Text>
        <Text style={styles.cross}>
          x
        </Text>
      </View>
    )
  }
}