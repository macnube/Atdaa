import { createSelector } from 'reselect'
import { NAME } from './constants'

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
