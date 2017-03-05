import { combineReducers } from 'redux'
import * as types from './actionTypes'
import { updateObject } from '../utils/reducerLib'
import { getLayout } from '../utils/helpers'

function layoutInfo (state = getLayout(), action) {
  switch (action.type) {
    case types.SET_LAYOUT: return updateObject(state, action.layoutInfo)
    default: return state
  }
}

function scrollEnabled (state = true, action) {
  switch (action.type) {
    case types.TOGGLE_SCROLL_ENABLED: return !state
    default: return state
  }
}

function selectedTab (state = 'map', action) {
  switch (action.type) {
    case types.SET_SELECTED_ICON: return 'iconSearch'
    case types.SET_SELECTED_TAB: return action.tab
    case types.ADD_PLACE:
    case types.SET_PLACE_INFO: return 'placeInfo'
    default: return state
  }
}

// Modal

function modalVisible (state = false, action) {
  switch (action.type) {
    case types.OPEN_MODAL: return true
    case types.CLOSE_MODAL: return false
    default: return state
  }
}

function modalText (state = '', action) {
  switch (action.type) {
    case types.OPEN_MODAL: return action.text
    case types.CLOSE_MODAL: return ''
    default: return state
  }
}

function modalOnYes (state = null, action) {
  switch (action.type) {
    case types.OPEN_MODAL: return action.onYes
    case types.CLOSE_MODAL: return null
    default: return state
  }
}

function modalYesText (state = 'Yes', action) {
  switch (action.type) {
    case types.OPEN_MODAL: return action.yesText
    default: return state
  }
}

function modalURI (state = null, action) {
  switch (action.type) {
    case types.OPEN_MODAL: return action.uri
    default: return state
  }
}

var modal = combineReducers({
  visible: modalVisible,
  text: modalText,
  onYes: modalOnYes,
  yesText: modalYesText,
  uri: modalURI
})

export default combineReducers({
  layoutInfo,
  scrollEnabled,
  selectedTab,
  modal
})
