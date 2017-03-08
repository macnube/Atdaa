import * as types from './actionTypes'
import { combineReducers } from 'redux';
import api from '../utils/api'

function id(state = '', action) {
	switch(action.type) {
		case types.SET_USER_INFO: return action.info.id;
		default: return state
	}
}

function email(state = '', action) {
	switch(action.type) {
		case types.SET_USER_INFO: return action.info.email || ''
		default: return state
	}
}

export default combineReducers({
	email,
	id,
})