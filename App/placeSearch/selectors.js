import { createSelector } from 'reselect'
import { NAME } from './constants'

export const getPlaceInfo = createSelector(
  [ (state) => state[NAME] ],
  (placeInfo) => placeInfo
)
