// Constants
const ADD_USER = 'ADD_USER';
const ADD_PHONE = 'ADD_PHONE';
const ADD_AUTHY_ID = 'ADD_AUTHY_ID';
const ADD_FULL_USER = 'ADD_FULL_USER';

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
		case ADD_FULL_USER:
			return {
				...state,
				...action.payload.user
			}
		case ADD_USER:
			return {
				...state, 
				email: action.payload.email,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				password: action.payload.password
			};
		case ADD_PHONE:
			return {
				...state, 
				phone: action.payload.phone,
			};
		case ADD_AUTHY_ID:
		return {
			...state,
			authyId: action.payload.authyId
		}
		default:
			return { ...state }
	}
}

// Action emitters
export function addUser(user) {
	return { type: ADD_USER, payload: user };
}
// {phone: phone}
export function addPhone(phone) {
	return { type: ADD_PHONE, payload: phone };
}
// {authyId: authyId}
export function addAuthyId(authyId) {
	return { type: ADD_AUTHY_ID, payload: authyId };
}

// {user: {}}
export function addFullUser(user) {
	return { type: ADD_FULL_USER, payload: user };
}

