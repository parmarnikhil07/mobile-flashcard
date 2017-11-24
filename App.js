import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { StatusBar, View, Platform } from 'react-native'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helper'
import reducer from './reducers'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddQuiz from './components/AddQuiz'
import QuizView from './components/QuizView'

function UdaciStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'DECKS',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-book' size={35} color={tintColor} />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions : {
        tabBarLabel: 'NEW DECK',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={35} color={tintColor} />
      }
    }
  }, {
    navigationOptions: {
      header: null,
    },
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#4868d6' : 'white',
      style: {
        height: 50,
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#4868d6',
        shadowColor: 'red',
      }
    }
  }
)

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4868d6',
      },
      title: 'Deck',
    }
  },
  AddQuiz: {
    screen: AddQuiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4868d6',
      },
      title: 'New Quiz',
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4868d6',
      },
      title: 'Quiz',
    }
  }
})

export default class App extends React.Component {
  // notification on app launch
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, devToolsEnhancer())}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor='#4868d6' barStyle='default' />
          <Stack />
        </View>
      </Provider>
    )
  }
}
