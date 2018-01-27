// Constants
const ALL_CARDS = 'ALL_CARDS';
const ADD_ONE_CARD = 'ADD_ONE_CARD';

// Initial state
const initialState = {
  cards: [], // where first card is defualt
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ALL_CARDS:
      return {
        ...state,
        cards: action.payload.cards,
        defaultCard: action.payload.cards[0] || ""
      };
    case ADD_ONE_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload.card],
        defaultCard: action.payload.card
      }
    default:
      return { ...state }
        
  }
}

// Action emitters
export function updateCards(cards) {
  return { type: ALL_CARDS, payload: {cards} };
}

// Action emitters
export function addCard(card) {
  return { type: ADD_ONE_CARD, payload: {card} };
}

