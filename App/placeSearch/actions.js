import * as types from './actionTypes'

export function setPlaceInfo (place) {
  return {
    type: types.SET_PLACE_INFO,
    place
  }
}
