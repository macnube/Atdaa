import { createSelector } from 'reselect'
import { NAME } from './constants'

const _getFilters = (state) => {
  var result = []
  for (var i = 0; i < 4; i++) {
    if (state[NAME].toolbarIcons[i].id !== 0) {
      result.push(state[NAME].toolbarIcons[i])
    }
  }
  return result
}

export const getFilters = createSelector(
  [ _getFilters ],
  (filters) => filters
)

export const getTrashState = createSelector(
  [(state) => state[NAME].showingTrash ],
  (trashState) => trashState
)

export const getIconSelected = createSelector(
  [(state) => state[NAME].iconSelected ],
  (iconSelected) => iconSelected
)

export const getToolbarIcons = createSelector(
  [(state) => state[NAME].toolbarIcons ],
  (toolbarIcons) => toolbarIcons
)
