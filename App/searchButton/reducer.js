import * as types from './actionTypes';

export default function searchButtonOpen(state = false, action) {
	switch (action.type) {
		case types.SET_SELECTED_TAB: {
			if (state) return !state;
			else return state
		};
		case types.TOGGLE_SEARCH_BUTTON: {
			console.log("TOGGLE SEARCH BUTTON CASE");
			return !state
		};
		default: {
			return state
		}
	}
}