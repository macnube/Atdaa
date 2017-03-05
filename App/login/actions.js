import * as types from './actionTypes'

export function setUserInfo(info) {
	return {
		type: types.SET_USER_INFO,
		info
	}
}