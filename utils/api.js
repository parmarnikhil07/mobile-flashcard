import { AsyncStorage } from 'react-native'
const FLASHCARD_STORAGE_KEY = 'FlashCard-Udacity-Project'

// Check if any decks are already added on device with matching storage key
export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then ((results) => {
      if (results === null) {
        return {}
      }
      else {
        return JSON.parse(results)
      }
    })
}

// Get Get by id
export function getDeck(id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then ((results) => {
      let all = JSON.parse(results)
      return theDeck = all[id]
    })
}

// Create new deck, check if no key added => setItem else mergeItem
export function submitDeck(deckTitle) {
  let val = { [deckTitle]: { title: [deckTitle], questions: []} }
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then ((results) => {
      if (results === null) {
        return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(val))
      }
      else {
        return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,
          JSON.stringify(val)
        )
      }
    })
}

//add Quiz object
export function submitQuiz(deckTitle, question, answer) {
  getDeck(deckTitle)
    .then ((resultObj => {
      let questions = resultObj.questions
      questions.push({ question, answer })
      let val = { [deckTitle]: { title: [deckTitle], questions} }
      return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,
        JSON.stringify(val)
      )
    }))
}
