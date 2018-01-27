// Constants
const EMPTY_SHOPPING = 'EMPTY_SHOPPING';
const REMOVE_SHOPPING = 'REMOVE_SHOPPING';
const ADD_SHOPPING = 'ADD_SHOPPING';

// Initial state
const initialState = {};

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
		// case ADD_FULL_USER:
		// 	return {
		// 		...state,
		// 		...action.payload.user
		// 	}
		// case ADD_USER:
		// 	return {
		// 		...state, 
		// 		email: action.payload.email,
		// 		firstName: action.payload.firstName,
		// 		lastName: action.payload.lastName,
		// 		password: action.payload.password
		// 	};
		// case ADD_PHONE:
		// 	return {
		// 		...state, 
		// 		phone: action.payload.phone,
		// 	};
		// case ADD_AUTHY_ID:
		default:
			return { ...state }
	}
}

// Action emitters
export function addToCart(item) {
	return { type: ADD_SHOPPING, payload: {} };
}
export function removeFromCart(itemId) {
    return { type: REMOVE_SHOPPING, payload: {} };
}
export function emptyCart() {
    return { type: EMPTY_SHOPPING, payload: {} };
}