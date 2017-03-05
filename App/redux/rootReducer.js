import { combineReducers } from 'redux';
import dashboard from '../dashboard';
import toolbar from '../toolbar';
import searchButton from '../searchButton';
import iconSearch from '../iconSearch';
import placeSearch from '../placeSearch';
import managePlaces from '../managePlaces';
import login from '../login'

export default combineReducers({
	[dashboard.constants.NAME]: dashboard.reducer,
	[toolbar.constants.NAME]: toolbar.reducer,
	searchButtonOpen: searchButton.reducer,
	newIcon: iconSearch.reducer,
	placeInfo: placeSearch.reducer,
	myPlaces: managePlaces.reducer,
	user: login.reducer
})