import {
  Dimensions,
  AsyncStorage
} from 'react-native'

import Config from 'react-native-config'
import Firestack from 'react-native-firestack'
import { cleanMyPlaces } from './helpers'

var googleAPI = Config.GOOGLE_API_KEY
var firestackConfig = {
  debug: true
}
const firestack = new Firestack(firestackConfig)
firestack.on('debug', msg => console.log('Received debug message', msg))

var database = firestack.database

export const getCenter = () => {
  return {
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2
  }
}

// Google API calls
export const getPlacePhoto = (reference, maxHeight) => {
  var url = `https://maps.googleapis.com/maps/api/place/photo?&maxwidth=${600}&photoreference=${reference}&key=${googleAPI}`
  return fetch(url)
}

export const getPlaces = (search, currentLocation) => {
  var latlng = currentLocation.latitude + ',' + currentLocation.longitude
  var radius = 1000
  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleAPI}&location=${latlng}&radius=${radius}&keyword=${search}`
  return fetch(url).then((res) => res.json())
}

export const getPlaceDetails = (id) => {
  var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${googleAPI}`
  return fetch(url)
}

export const getTypeNearbyPlaces = (userLocation, type) => {
  return getNearbyPlaces(userLocation, type)
    .then((res) => res.json())
    .then((responseJson) => {
      return responseJson.results
    })
    .catch((error) => {
      console.log('Error getting place details for nearby places', error)
    })
}

export const getNearbyPlaces = (userLocation, type = '') => {
  var latlng = userLocation.latitude + ',' + userLocation.longitude
  var radius = 100
  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleAPI}&location=${latlng}&radius=${radius}`
  if (type) url += `&type=${type}`
  return fetch(url)
}

// Firestack API calls
export const createUser = (email, password) => {
  return firestack.auth.createUserWithEmail(email, password)
}

export const getUser = () => {
  firestack.auth.listenForAuth((evt) => {
    if (!evt.authenticated) {
      console.log('There is no user')
    } else {
      console.log('User details', evt.user)
    }
  })
  .then(() => console.log('Listening for authentication changes'))
}

export const signIn = (email, password) => {
  return firestack.auth.signInWithEmail(email, password)
}

export const signInFacebook = (token) => {
  return firestack.auth.signInWithProvider('facebook', token, '')
}

export const signOut = () => {
  return firestack.auth.signOut()
}

export const setFirebaseUserPlaces = (userId, myPlaces) => {
  return database.ref('users/' + userId).set({...myPlaces})
}

export const getFirebaseUserPlaces = (userId) => {
  return database.ref('users/' + userId).once('myPlaces')
}

export const setFirebaseUserEmail = (email) => {
  firestack.auth.updateUserEmail(email)
  .then((res) => console.log('Updated user email in firebase'))
  .catch((error) => console.log('Failed to update user email: ', error))
}

// Async Data calls

export const updateMyPlaces = (userInfo, currentPlaces, newPlace, currentTime, deletePlace = false) => {
  var id = newPlace.place_id
  var placeIds = [...currentPlaces.ids]
  var placeById = {...currentPlaces.placeById}
  if (deletePlace) {
    var index = currentPlaces.ids.indexOf(id)
    console.log('placeIds before delete', placeIds)
    if (index > -1) {
      placeIds.splice(index, 1)
    }
    console.log('placeIds after delete', placeIds)
    console.log('placeById before delete', placeById)
    delete placeById[id]
    console.log('placeById after delete', placeById)
  } else {
    if (currentPlaces.ids.indexOf(id) === -1) placeIds.push(id)
    placeById[id] = newPlace
  }
  var start = Date.now()
  var cleanedData = cleanMyPlaces({
    ...userInfo,
    myPlaces: {
      lastUpdated: currentTime,
      ids: placeIds,
      placeById: placeById
    }
  })
  var end = Date.now()
  console.log('Total time to clean data: ', end - start)
  var delta = {
    myPlaces: cleanedData.myPlaces
  }
  console.log('cleaned ID is before updateMyPlaces: ', cleanedData.id)
  if (cleanedData.id) {
    setFirebaseUserPlaces(cleanedData.id, delta)
    .then(() => console.log('successfully wrote to database'))
    updateLocalMyPlaces(cleanedData)
  }
}

export async function getLocalUserInfo () {
  try {
    var userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
    // Use below to clear local data
    // var userInfo = {};
    if (Object.keys(userInfo).length !== 0 && userInfo.id) {
      console.log('Successfully read local userInfo', userInfo)
      return userInfo
    } else {
      console.log('No local userInfo on disk')
      return null
    }
  } catch (error) {
    console.log('Error trying to read local userInfo', error)
  }
}

export async function deleteLocalUserInfo () {
  try {
    await AsyncStorage.removeItem('userInfo')
    console.log('successfully cleared local info')
  } catch (error) {
    console.log('Error clearing local info', error)
  }
}

export async function setLocalUserInfo (userInfo) {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    console.log('Local UserInfo Successfully Updated')
  } catch (error) {
    console.log('Unable to set local user info:', error)
  }
}

export async function updateLocalToolbar (toolbar) {
  var delta = {
    toolbar: {
      toolbarIcons: toolbar
    }
  }
  try {
    await AsyncStorage.mergeItem('userInfo', JSON.stringify(delta))
    console.log('Local toolbar updated successfully')
  } catch (error) {
    console.log('Unable to update local user toolbar:', error)
  }
}

export async function updateLocalMyPlaces (delta) {
  console.log('value of delta from updateLocalMyPlaces', delta)
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(delta))
    console.log('Local map updated successfully')
  } catch (error) {
    console.log('Unable to update local user map:', error)
  }
}

const api = {
  getCenter,
  getPlacePhoto,
  getPlaces,
  createUser,
  getUser,
  signIn,
  signInFacebook,
  signOut,
  setFirebaseUserPlaces,
  setFirebaseUserEmail,
  updateMyPlaces,
  getLocalUserInfo,
  deleteLocalUserInfo,
  setLocalUserInfo,
  updateLocalToolbar,
  updateLocalMyPlaces,
  getFirebaseUserPlaces
}

export default api
