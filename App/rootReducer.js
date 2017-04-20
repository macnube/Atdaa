import { combineReducers } from 'redux'
import dashboard from './dashboard'
import toolbar from './toolbar'
import placeSearch from './placeSearch'
import managePlaces from './managePlaces'
import login from './login'
import map from './map'

export default combineReducers({
  [dashboard.constants.NAME]: dashboard.reducer,
  [toolbar.constants.NAME]: toolbar.reducer,
  [placeSearch.constants.NAME]: placeSearch.reducer,
  [managePlaces.constants.NAME]: managePlaces.reducer,
  [login.constants.NAME]: login.reducer,
  [map.constants.NAME]: map.reducer
})
