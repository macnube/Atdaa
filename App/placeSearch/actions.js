import * as types from './actionTypes'

export function setPlaceInfo (place) {
  console.log('ACTION: SET_PLACE_INFO with place: ', place)
  return {
    type: types.SET_PLACE_INFO,
    place
  }
}
