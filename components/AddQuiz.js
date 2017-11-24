import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import TextButton from './TextButton'
import { addQuiz } from '../actions'
import { submitQuiz } from '../utils/api'

class AddQuiz extends Component {

  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const question = this.state.question.trim()
    const answer = this.state.answer.trim()
    const { title } = this.props.navigation.state.params.deck

    if ( question && answer) {
      // update redux
      this.props.dispatch(addQuiz(title, question, answer))
      this.setState(() => ({question: '', answer: ''}))

      // navigate to DeckList
      this.props.navigation.dispatch(NavigationActions.back())

      // Save to AsyncStorage
      submitQuiz(title, question, answer)
    }
  }

  componentDidMount() {
    this.refs.question_input.focus()
  }

  render() {
    const { title, questions } = this.props.navigation.state.params.deck

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.subtitle}>Question</Text>
        <TextInput
          ref='question_input'
          multiline = {true}
          style={ Platform.OS === 'ios' ? styles.input_ios : styles.input_android }
          placeholder="New Question"
          value={this.state.question}
          onChangeText={(question) => this.setState({question})}
        />
        <Text style={styles.subtitle}>Answer</Text>
        <TextInput
          multiline = {true}
          style={ Platform.OS === 'ios' ? styles.input_ios : styles.input_android }
          placeholder="New Answer"
          value={this.state.answer}
          onChangeText={(answer) => this.setState({answer})}
        />
        <TextButton onPress={this.submit} reverse>
          ADD
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
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  input_ios: {
    height: 60,
    width: 300,
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  input_android: {
    height: 60,
    width: 300,
    fontSize: 18,
    marginBottom: 20,
  },
})

export default connect()(AddQuiz)
