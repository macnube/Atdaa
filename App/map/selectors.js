import { createSelector } from 'reselect'
import { getMapPlaces } from '../utils/helpers'

import toolbar from '../toolbar'

const getMapRegion = (state) => state.map.region
const getToolbarFilters = (state) => toolbar.selectors.getFilters(state.toolbar)
const getPlaces = (state) => state.myPlaces

export const getMarkerPlaces = createSelector(
  [getMapRegion, getToolbarFilters, getPlaces],
  (region, filters, myPlaces) => {
    if (myPlaces.placeById) {
      return getMapPlaces(myPlaces, filters, region, 5)
    } else {
      return {ids: [], placeById: {}}
    }
  }
)

export const getVisiblePlaces = createSelector(
  [getMapRegion, getToolbarFilters, getPlaces],
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
  [ getMapRegion ],
  (region) => region
)

export const getUserLocation = createSelector(
  [ (state) => state.map.userLocation ],
  (userLocation) => userLocation
)

export const getCardId = createSelector(
  [ (state) => state.map.cardId ],
  (cardId) => cardId
)

export const getShowNames = createSelector(
  [(state) => state.map.showNames],
  (showNames) => showNames
)
