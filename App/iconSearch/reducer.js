import * as types from './actionTypes';

export default function newIcon(state = null, action) {
	switch(action.type) {
		case types.CLEAR_NEW_ICON: return null;
		case types.SET_NEW_ICON: return action.newIcon;
		default: return state
	}
}

