import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton( {children, onPress, color, reverse }) {
  if ( typeof color === 'undefined' )
    bgColor = '#4868d6'
  else
    bgColor = color

  return (
    <TouchableOpacity
      style={ reverse
            ? [styles.button, {backgroundColor: 'white', borderWidth: 2, borderColor: bgColor}]
            : [styles.button, {backgroundColor: bgColor}] }
      onPress = {onPress}>
      <Text style={ reverse
                  ? [styles.btnText, {color: bgColor}]
                  : [styles.btnText, {color: 'white'}] }>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width:200,
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
  },
})
