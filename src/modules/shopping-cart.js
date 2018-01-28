var _ = require('lodash');

// Constants
const EMPTY_SHOPPING = 'EMPTY_SHOPPING';
const REMOVE_SHOPPING = 'REMOVE_SHOPPING';
const ADD_SHOPPING = 'ADD_SHOPPING';

// Initial state
const initialState = {
	items: []
};

/**
 * {
 *    firstName: "",
 *    lastName: "",
 *    _id: "",
 *    email: "",
 *    authyId: "",
 *    phone: "",
 * }
 */
// Reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case ADD_SHOPPING:
			return {
				...state,
				items: [...state.items, action.payload.item],
			}
		case REMOVE_SHOPPING:
			for(var i = 0; i < state.items; i++) {
				if(_.isEqual(state.items[i], action.payload.item)) {
					return {
						...state,
						items: [...this.state.items.pop(i)]
					}
				}
			}
			return {
				...state,
				items: [...state.items.pop(payload.index)]
			}
		case EMPTY_SHOPPING:
			return {
				...state,
				items: []
			}
		default:
			return { ...state }
	}
}

// Action emitters
export function addToCart(item) {
	return { type: ADD_SHOPPING, payload: {item} };
}
export function removeFromCart(item) {
    return { type: REMOVE_SHOPPING, payload: {item} };
}
export function emptyCart() {
    return { type: EMPTY_SHOPPING };
}