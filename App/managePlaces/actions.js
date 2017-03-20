import * as types from './actionTypes'

export function addPlace (place, time) {
  return {
    type: types.ADD_PLACE,
    place,
    time
  }
}

export function deletePlace (placeId, time) {
  return {
    type: types.DELETE_PLACE,
    placeId,
    time
  }
}

export function updatePlaceNote (note) {
  return {
    type: types.UPDATE_PLACE_NOTE,
    note
  }
}

export function editPlaceCategory (category) {
	return {
		type: types.EDIT_PLACE_CATEGORY,
		category
	}
}

export function clearPlaceCategory () {
	return {
		type: types.CLEAR_PLACE_CATEGORY
	}
}
