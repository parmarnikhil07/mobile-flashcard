import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { retrieveDecks } from '../actions'
import { getDecks } from '../utils/api'

class DeckList extends Component {
  //get decks from AsyncStorage
  componentDidMount() {
    getDecks()
      .then ((resultObj => {
        this.props.dispatch(retrieveDecks(resultObj))
      }))
  }

  render() {
    const { decks } = this.props
    const navigate = this.props.navigation.navigate
    console.log(decks);
    return (
      <ScrollView>
        <View style={styles.container}>
          {Object.keys(decks).length>0 ?
            Object.keys(decks).map((key) => (
            <TouchableOpacity
              style={styles.deck}
              key={key}
              onPress={() => navigate('DeckDetail', { deckTitle: key })} >
              <Text style={styles.title}>{key}</Text>
              <Text style={styles.cards}>{decks[key].questions.length} cards</Text>
            </TouchableOpacity>
          ))
          :
          <Text style={styles.noDeck}>No deck added!</Text>
        }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  noDeck:{
    marginTop:50,
    marginBottom:50,
    alignItems: 'center',
    justifyContent: 'center',
    color:'grey',
    fontSize:20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  cards:{
    color: '#666'
  },
  deck: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: '#eee',
  }
})

function mapStateToProps(decks) {
  console.log(decks);
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
