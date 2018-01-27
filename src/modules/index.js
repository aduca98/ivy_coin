import { combineReducers } from 'redux';
import transactions from './transactions';
import user from './user';
import cards from './cards';

const reducer = combineReducers({
  transactions,
  user,
  cards
});

export default reducer;
