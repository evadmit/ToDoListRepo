import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";

export default class Input extends Component {

  render() {
    const {
      textInputStyle,
    } = this.props;
    return (
      <TextInput
        style={[styles.textInput, textInputStyle]}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    width: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#60b1fc',
  },
});