import * as types from './actionTypes'

export function setUserLocation (userLocation) {
  return {
    type: types.SET_USER_LOCATION,
    userLocation
  }
}

export function setRegion (region) {
  return {
    type: types.SET_REGION,
    region
  }
}

export function setCardId (id, searchRegion = null) {
  return {
    type: types.SET_CARD_ID,
    id,
    searchRegion
  }
}

export function setCardScrollInfo (id, percent) {
  return {
    type: types.SET_CARD_SCROLL_INFO,
    id,
    percent
  }
}

export function endCardScroll (id) {
  return {
    type: types.END_CARD_SCROLL,
    id
  }
}

export function toggleScroll () {
  return {
    type: types.TOGGLE_SCROLL
  }
}

export function setNearbyPlaces (places) {
  return {
    type: types.SET_NEARBY_PLACES,
    places
  }
}
