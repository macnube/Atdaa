import * as types from './actionTypes';

export function toggleSearchButton() {
	console.log("Dispatching toggleSearchButton");
	return {
		type: types.TOGGLE_SEARCH_BUTTON
	}
}