import * as types from './actionTypes'

export function toggleTrash () {
  return {
    type: types.TOGGLE_TRASH
  }
}

export function deleteToolbarIcon (index) {
  return {
    type: types.DELETE_TOOLBAR_ICON,
    index
  }
}

export function updateToolbarIcon (iconId, toolbar, index) {
  return {
    type: types.UPDATE_TOOLBAR_ICON,
    iconId,
    toolbar,
    index
  }
}

export function switchToolbarIcons (indexOne, indexTwo) {
  return {
    type: types.SWITCH_TOOLBAR_ICONS,
    indexOne,
    indexTwo
  }
}

export function toggleToolbar () {
  return {
    type: types.TOGGLE_TOOLBAR
  }
}

export function setSelectedIcon (icon) {
  return {
    type: types.SET_SELECTED_ICON,
    icon
  }
}

export function clearToolbar () {
  return {
    type: types.CLEAR_TOOLBAR
  }
}
