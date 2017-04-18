import * as types from './actionTypes'

export function addPlace (place, time) {
  console.log('ACTION: ADD_PLACE with place:', place)
  return {
    type: types.ADD_PLACE,
    place,
    time
  }
}

export function deletePlace (placeId, time) {
  console.log('ACTION: DELETE_PLACE with place:', placeId)
  return {
    type: types.DELETE_PLACE,
    placeId,
    time
  }
}

export function updatePlaceNote (note) {
  console.log('ACTION: UPDATE_PLACE_NOTE with place:', note)
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
