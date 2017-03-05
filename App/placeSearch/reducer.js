import * as types from './actionTypes';

const clearPlace = (state, action) => {
  if (action.tab === 'map') {
    return null
  } else return state
}

export default function placeInfo (state = null, action) {
  switch (action.type) {
    case types.ADD_PLACE: return action.place
    case types.SET_PLACE_INFO: return action.place
    case types.SET_SELECTED_TAB: return clearPlace(state, action)
    case types.LOGOUT: return null
    default: return state
  }
}
