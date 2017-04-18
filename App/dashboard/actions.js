import * as types from './actionTypes'

export function logout () {
  return {
    type: types.LOGOUT
  }
}

export function setLayout (layoutInfo) {
  return {
    type: types.SET_LAYOUT,
    layoutInfo
  }
}

export function setSelectedTab (tab) {
  return {
    type: types.SET_SELECTED_TAB,
    tab
  }
}

export function loadLocalInfo (userInfo) {
  console.log('ACTION: LOAD_LOCAL_INFO with userInfo: ', userInfo)
  return {
    type: types.LOAD_LOCAL_INFO,
    userInfo
  }
}

export function openModal (text, onYes, yesText, uri) {
  return {
    type: types.OPEN_MODAL,
    text,
    onYes,
    yesText,
    uri
  }
}

export function closeModal () {
  return {
    type: types.CLOSE_MODAL
  }
}
