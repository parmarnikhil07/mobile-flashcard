export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUIZ = 'ADD_QUIZ'

//action to add decks
export function addDeck(deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle,
  }
}

//action to get decks
export function retrieveDecks(decks) {
  return {
    type: RETRIEVE_DECKS,
    decks,
  }
}

//action to add quiz
export function addQuiz(deckTitle, question, answer) {
  return {
    type: ADD_QUIZ,
    deckTitle,
    question,
    answer,
  }
}
