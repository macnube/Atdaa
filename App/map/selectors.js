import { createSelector } from 'reselect'
import { getMapPlaces } from '../utils/helpers'
import { NAME } from './constants'

import toolbar from '../toolbar'
import managePlaces from '../managePlaces'

const _getRegion = (state) => state[NAME].region
const _getToolbarFilters = (state) => toolbar.selectors.getFilters(state.toolbar)
const _getMyPlaces = (state) => managePlaces.selectors.getMyPlaces(state)
const _getNearbyPlaces = (state) => state[NAME].nearbyPlaces

export const getNearbyPlaces = createSelector(
  [_getNearbyPlaces],
  (nearbyPlaces) => nearbyPlaces
)

export const getMarkerPlaces = createSelector(
  [_getRegion, _getToolbarFilters, _getMyPlaces],
  (region, filters, myPlaces) => {
    if (myPlaces.placeById) {
      return getMapPlaces(myPlaces, filters, region, 5)
    } else {
      return {ids: [], placeById: {}}
    }
  }
)

export const getVisiblePlaces = createSelector(
  [_getRegion, _getToolbarFilters, _getMyPlaces],
  (region, filters, myPlaces) => {
    if (myPlaces.placeById) {
      return getMapPlaces(myPlaces, filters, region, 1.1)
    } else {
      return {ids: [], placeById: {}}
    }
  }
)

export const getMatchingPlaces = createSelector(
  [getVisiblePlaces],
  (visiblePlaces) => {
    return visiblePlaces.ids.reduce((acc, id) => {
      if (visiblePlaces.placeById[id].score > 0) {
        acc['ids'] = acc['ids'].concat([id])
        acc['placeById'][id] = {...visiblePlaces.placeById[id]}
        return acc
      } else {
        return acc
      }
    }, {ids: [], placeById: {}})
  }
)

export const getRegion = createSelector(
  [ _getRegion ],
  (region) => region
)

export const getUserLocation = createSelector(
  [ (state) => state[NAME].userLocation ],
  (userLocation) => userLocation
)

export const getCardId = createSelector(
  [ (state) => state[NAME].cardId ],
  (cardId) => cardId
)

export const getShowNames = createSelector(
  [(state) => state[NAME].showNames],
  (showNames) => showNames
)
