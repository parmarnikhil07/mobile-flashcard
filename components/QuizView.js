import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import FlipCard from 'react-native-flip-card'
import TextButton from './TextButton'
import { setLocalNotification, clearLocalNotification } from '../utils/helper'

class QuizView extends Component {
  state = {
    flip: false,
    questionCounter: 0,
    correctAnswers: 0,
  }

  correctFunction = () => {
    this.setState({correctAnswers : this.state.correctAnswers + 1, questionCounter: this.state.questionCounter + 1})
  }

  incorrectFunction = () => {
    this.setState({questionCounter: this.state.questionCounter + 1})
  }

  restartClick = () => {
    this.setState({questionCounter: 0, correctAnswers: 0})
  }

  render() {
    const navigate = this.props.navigation.navigate
    const { questions } = this.props.navigation.state.params.deck
    const { questionCounter, correctAnswers } = this.state

    if (questionCounter === questions.length ) {
      //clear today's notification and then set tomorrow's notification
      clearLocalNotification()
        .then(setLocalNotification)
      return (
        <View style={styles.container}>
            <Text style={styles.text}> Quiz Result </Text>
            <Text style={styles.textGreen}> Score : {correctAnswers}/{questions.length} </Text>
            <TextButton
              onPress={this.restartClick}
              color='blue'>
              Restart
            </TextButton>
            <TextButton
              onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
              color='red'>
              Back
            </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.quizCount}> {questionCounter + 1} / {questions.length} </Text>

        <FlipCard
          style={styles.card}
          flip={this.state.flip}
          friction={10}
          perspective={500}
          flipHorizontal={true}
          flipVertical={false}
          clickable={false}
        >

          <View style={styles.face}>
            <Text style={styles.title}>{questions[questionCounter].question}</Text>
            <Text
              onPress={()=>{this.setState({flip: !this.state.flip})}}
              style={styles.answer}>
              Answer
            </Text>
            <TextButton onPress={this.correctFunction} color='green'>
              Correct
            </TextButton>
            <TextButton onPress={this.incorrectFunction} color='red' >
              Incorrect
            </TextButton>
          </View>

          <View style={styles.back}>
            <Text style={styles.title}>{questions[questionCounter].answer}</Text>
            <Text
              onPress={()=>{this.setState({flip: !this.state.flip})}}
              style={styles.answer}>
              Back
            </Text>
          </View>

        </FlipCard>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  textGreen: {
    fontSize: 40,
    color: 'green',
  },
  quizCount: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignSelf: 'stretch',
    marginLeft:20,
    marginRight:20,
    marginTop: 100,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  answer: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
})

export default QuizView
