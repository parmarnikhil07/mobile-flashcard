import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import TextButton from './TextButton'

class AddDeck extends Component {

  state = {
    text: ''
  }

  submit() {
    const {text} = this.state
    const {decks} = this.props

    if (text) {
      this.props.dispatch(addDeck(text))
      this.setState(() => ({text: ''})) //reset state
      // navigate to DeckList and call API to AsyncStorage
      this.props.navigation.navigate('DeckDetail', { deckTitle: text })
      submitDeck(text)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.headingTitle}>What is the title of your new deck?</Text>
        <TextInput
          ref='text_input'
          style={ styles.input }
          placeholder="Deck Title"
          value={this.state.text}
          onChangeText={(text) => this.setState({text: text.trim()})}
        />
        <TextButton onPress={() => this.submit()} reverse>
          Submit
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTitle: {
    marginBottom: 20,
    fontSize: 34,
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    fontSize: 22,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'stretch',
    paddingLeft:5,
  }
})

function mapStateToProps(decks) {
  return {
    decks: Object.keys(decks)
  }
}

export default connect(mapStateToProps)(AddDeck)
