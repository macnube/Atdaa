import { createSelector } from 'reselect'
import { NAME } from './constants'

console.log('name from dashboard constants is: ', NAME);

export const getSelectedTab = createSelector(
  [ (state) => state[NAME].selectedTab ],
  (selectedTab) => selectedTab
)

export const getLayoutInfo = createSelector(
  [ (state) => state[NAME].layoutInfo ],
  (layoutInfo) => layoutInfo
)

export const getDashboard = createSelector(
  [ (state) => state[NAME] ],
  (dashboard) => dashboard
)
