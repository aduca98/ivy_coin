import { combineReducers } from 'redux';
import user from './user';
import cards from './cards';
import shoppingCart from './shopping-cart';

const reducer = combineReducers({
  user,
  cards,
  shoppingCart
});

export default reducer;
