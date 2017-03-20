import * as types from './actionTypes';

const clearPlace = (state, action) => {
  if (action.tab === 'map') {
    return null
  } else return state
}

const setIsNew = (state) => {
  var newPlace = {...state}
  newPlace.isNew = true
  return newPlace
}

export default function placeInfo (state = null, action) {
  switch (action.type) {
    case types.ADD_PLACE: return action.place
    case types.DELETE_PLACE: return setIsNew(state)
    case types.SET_PLACE_INFO: return action.place
    case types.SET_SELECTED_TAB: return clearPlace(state, action)
    case types.LOGOUT: return null
    default: return state
  }
}
