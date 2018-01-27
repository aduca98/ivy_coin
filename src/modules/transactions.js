// Constants
const ALL_TRANSACTIONS = 'ALL_TRANSACTIONS';
const ALL_BALANCES = 'ALL_BALANCES';

// Initial state
const initialState = {
  balances: [],
  transactions: []
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ALL_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions
      };
    case ALL_BALANCES:
      return {
        ...state,
        balances: action.payload.balances
      };
    default:
      return { ...state }
        
  }
}

// Action emitters
export function storeAllTransactions(t) {
  return { type: ALL_TRANSACTIONS, payload: {t} };
}

export function updateBalances(balances) {
  return { type: ALL_BALANCES, payload: {balances} };
}
