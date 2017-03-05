import * as types from './actionTypes'

export function addPlace (place, time) {
  return {
    type: types.ADD_PLACE,
    place,
    time
  }
}

export function updatePlaceNote (note) {
  return {
    type: types.UPDATE_PLACE_NOTE,
    note
  }
}
