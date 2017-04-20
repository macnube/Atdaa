import { createSelector } from 'reselect'
import { NAME } from './constants'

export const getMyPlaces = createSelector(
  [ (state) => state[NAME] ],
  (myPlaces) => myPlaces)
