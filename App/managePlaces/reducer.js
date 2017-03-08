import * as types from './actionTypes'
import { combineReducers } from 'redux'
import { updateObject } from '../utils/reducerLib'

const createPlace = (place) => {
  return {
    [place.place_id]: place
  }
}

const getPlaceId = (place) => {
  return place.place_id
}

const updatePlaceIds = (state, placeId) => {
  if (state.indexOf(placeId) === -1) {
    return state.concat([placeId])
  } else return state
}

function readLocalPlaces (state, userInfo) {
  if (userInfo.myPlaces) {
    return updateObject(state, userInfo.myPlaces.placeById)
  } else return state
}

function readLocalPlaceIds (state, userInfo) {
  if (userInfo.myPlaces) {
    return userInfo.myPlaces.ids
  } else return state
}

function readLocalLastUpdated (state, userInfo) {
  if (userInfo.myPlaces) {
    return userInfo.myPlaces.lastUpdated
  } else return state
}

function updatePlace (state, place) {
  return {...state, [place.place_id]: place}
}

export function placeById (state = {}, action) {
  switch (action.type) {
    case types.UPDATE_PLACE: return updatePlace(state, action.place)
    case types.SET_USER_INFO: return readLocalPlaces(state, action.info)
    case types.ADD_PLACE: return updateObject(state, createPlace(action.place))
    case types.LOGOUT: return {}
    default: return state
  }
}

export function ids (state = [], action) {
  switch (action.type) {
    case types.SET_USER_INFO: return readLocalPlaceIds(state, action.info)
    case types.ADD_PLACE: return updatePlaceIds(state, getPlaceId(action.place))
    case types.LOGOUT: return []
    default: return state
  }
}

export function lastUpdated (state = null, action) {
  switch (action.type) {
    case types.SET_USER_INFO: return readLocalLastUpdated(state, action.info)
    case types.ADD_PLACE: return action.time
    case types.LOGOUT: return null
    default: return state
  }
}

export function editPlaceCategory (state = null, action) {
  switch (action.type) {
    case types.EDIT_PLACE_CATEGORY: return action.category
    case types.CLEAR_PLACE_CATEGORY: return null
    default: return state
  }
}

export default combineReducers({
  placeById,
  ids,
  lastUpdated,
  editPlaceCategory
})
