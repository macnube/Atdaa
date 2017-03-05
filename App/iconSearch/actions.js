import * as types from './actionTypes';

export function setNewIcon(newIcon) {
	return {
		type: types.SET_NEW_ICON,
		newIcon
	}
}

export function clearNewIcon() {
	return {
		type: types.CLEAR_NEW_ICON,
	}
}


