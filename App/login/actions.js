import * as types from './actionTypes'

export function setUserInfo(info) {
  console.log('ACTION: SET_USER_INFO with info: ', info)
	return {
		type: types.SET_USER_INFO,
		info
	}
}