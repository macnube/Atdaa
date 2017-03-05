import { combineReducers } from 'redux'
import * as types from './actionTypes'
import { getIconById } from '../utils/helpers'
import api from '../utils/api'

const initialToolbarIds = ['empty', 'empty', 'empty', 'empty', 'openButton']
const initialToolbar = getToolbarFromIds(initialToolbarIds)

/*
TO DO LIST
can creater helper functions with names get... to indicate that it prepares the data to be used by the UI
these can be named exports so that they can be used from the view layer.
Theses are called selectors
*/

// HELPERS
function getToolbarFromIds (toolbarIds) {
  return toolbarIds.map((id, index) => getToolbarIcon(id, index))
}

function getToolbarIcon (id, index) {
  return {
    ...getIconById(id),
    priority: index
  }
}

function sortToolbarByPriority (toolbar) {
  return toolbar.sort((a, b) => {
    if (a.priority < b.priority) {
      return -1
    } else {
      return 1
    }
  })
}

// Reducer Helpers

function deleteToolbarIcon (toolbar, index) {
  return updateToolbarIcon(toolbar, 'empty', index)
}

function switchToolbarIcons (toolbar, indexOne, indexTwo) {
  const newToolbar = sortToolbarByPriority(toolbar.map((icon, index) => {
    if (index === indexOne) {
      icon.priority = indexTwo
    } else if (index === indexTwo) {
      icon.priority = indexOne
    }
    return icon
  }))
  api.updateLocalToolbar(newToolbar)
  return newToolbar
}

function updateToolbarIcon (toolbar, id, index) {
  const newToolbar = toolbar.map((icon, i) => {
    if (i !== index) {
      return icon
    } else {
      return getToolbarIcon(id, index)
    }
  })
  if (id !== 'trash' && id !== 'openButton') {
    api.updateLocalToolbar(newToolbar)
  }
  return newToolbar
}

function toggleTrash (toolbar) {
  if (toolbar[4].id === 'trash') {
    return updateToolbarIcon(toolbar, 'openButton', 4)
  } else return updateToolbarIcon(toolbar, 'trash', 4)
}

function readLocalInfo (state, userInfo) {
  if (userInfo.toolbar) {
    var toolbar = sortToolbarByPriority(userInfo.toolbar.toolbarIcons)
    toolbar.pop()
    toolbar.push(getToolbarIcon('openButton', 4))
    return sortToolbarByPriority(toolbar)
  } else return state
}

function handleTabChange (state, tab) {
  if (tab !== 'iconSearch') {
    return null
  } else return state
}

function getNextIconSelected (state, action) {
  for (let i = 0; i < 4; i++) {
    var icon = action.toolbar[i]
    if (icon.id === 'empty' && i !== action.index) {
      return action.toolbar[i]
    }
  }
  return state
}

// REDUCERS

function toolbarIcons (state = initialToolbar, action) {
  switch (action.type) {
    case types.SET_USER_INFO: return readLocalInfo(state, action.info)
    case types.CLEAR_TOOLBAR: return initialToolbar
    case types.DELETE_TOOLBAR_ICON: return deleteToolbarIcon(state, action.index)
    case types.UPDATE_TOOLBAR_ICON: return updateToolbarIcon(state, action.iconId, action.index)
    case types.SWITCH_TOOLBAR_ICONS: return switchToolbarIcons(state, action.indexOne, action.indexTwo)
    case types.TOGGLE_TRASH: return toggleTrash(state)
    default: return state
  }
}

function showingTrash (state = false, action) {
  switch (action.type) {
    case types.SWITCH_TOOLBAR_ICONS:
    case types.TOGGLE_TRASH: return !state
    default: return state
  }
}

function iconSelected (state = null, action) {
  switch (action.type) {
    case types.SET_SELECTED_TAB: return handleTabChange(state, action.tab)
    case types.SET_SELECTED_ICON: return action.icon
    case types.UPDATE_TOOLBAR_ICON: return getNextIconSelected(state, action)
    default: return state
  }
}

export default combineReducers({
  toolbarIcons,
  showingTrash,
  iconSelected
})
