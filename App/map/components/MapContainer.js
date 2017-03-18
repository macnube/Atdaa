import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	Dimensions,
	LayoutAnimation,
} from 'react-native';

import { 
	setCardScrollInfo,
	endCardScroll,
	setCardId,
	setRegion,
	setUserLocation,
	setNearbyPlaces 
} from '../actions'
import { getNearbyPlaces, getPlaceDetails } from '../../utils/api'
import placeSearch from '../../placeSearch'
import dashboard from '../../dashboard'
import { 
	getTagIdsByCategoryId, 
	getPlaces, 
	compareToolbars, 
	compareRegions,
	getMapPlaces,
	getMapIcon,
	filterPlacesByType
} from '../../utils/helpers'
import { 
	getMatchingPlaces, 
	getVisiblePlaces, 
	getMarkerPlaces, 
	getRegion, 
	getUserLocation, 
	getCardId,
	getShowNames
} from '../selectors'
import toolbar from '../../toolbar'
import searchButton from '../../searchButton'
import Map from './Map';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.watchID = (null: ?number);
		this._lastRegion = null;
		this._imageURI = null;
		this._mapReference = null;
		this._animating = false;
		this._fromPOI = false;
		this.markerPlaces = {ids: [], placeById: {}};
		this.visiblePlaces = {ids: [], placeById: {}};
		this.matchingPlaces = {ids: [], placeById: {}};
		this.state = {
			region: this.props.region,
			userLocation: this.props.userLocation,
			cardId: this.props.cardId,
		}
	}

	componentWillUpdate(nextProps, nextState) {
  	//If new card is selected
  	const { region } = nextState;
  	const { myPlaces, filters } = nextProps
  	this.markerPlaces = this._getPlaces(myPlaces, filters, region, 5)
  	this.visiblePlaces = this._getPlaces(this.markerPlaces, filters, region, 1.1);
  	this.matchingPlaces = this._getMatchingPlaces(this.visiblePlaces)
  	if (this.state.userLocation.latitude !== nextState.userLocation.latitude) {
      getNearbyPlaces(this.props.userLocation)
      .then((res) => res.json())
      .then((responseJson) => {
      	var filteredPlaces = filterPlacesByType(responseJson.results)
      	var counter = 0
      	var places = []
      	filteredPlaces.forEach((place) => {
      		getPlaceDetails(place.place_id)
      		.then((res) => res.json())
      		.then((details) => {
      			counter ++
      			if (counter === filteredPlaces.length) {
      				this.props.setNearbyPlaces(places)
      			}
      			places.push(details.result)
      		})
      		.catch((error) => {
      			console.log('Error getting place details for nearby places', error)
      		})
      	})
      })
      .catch((error) => {
        console.log('Error getting nearby places', error)
      })
    }
  	/*
  	if ((this.state.cardId !== nextState.cardId) && nextState.cardId) {
  		var place = this.markerPlaces.placeById[nextState.cardId]
  		var nextRegion = {
				latitude: place.latlng.latitude,
	      longitude: place.latlng.longitude,
	      latitudeDelta: this.state.region.latitudeDelta,
	      longitudeDelta: this.state.region.longitudeDelta,
			}
			this._animating = true;
  		this._mapReference.animateToRegion(nextRegion, .5)
  	}
  	*/
  }

	componentWillMount() {
		console.log("MapContainer will mount")
		this._fromPOI = true;
		const { region } = this.state;
  	const { myPlaces, filters } = this.props;
  	this.markerPlaces = this._getPlaces(myPlaces, filters, region, 5)
  	this.visiblePlaces = this._getPlaces(this.markerPlaces, filters, region, 1.2);
  	this.matchingPlaces = this._getMatchingPlaces(this.visiblePlaces)
		if (this.props.searchMarker) {
    	var nextRegion = {
        latitude: this.props.searchMarker.latlng.latitude,
        longitude: this.props.searchMarker.latlng.longitude,
        latitudeDelta: LATITUDE_DELTA / 5,
        longitudeDelta: LATITUDE_DELTA / 5 * ASPECT_RATIO,
    	}
    	this.setState({
    		region: nextRegion
    	})
		} else if (!region) {
			this.getCurrentLocation();
		}
    getNearbyPlaces(this.props.userLocation)
      .then((res) => res.json())
      .then((responseJson) => {
      	var filteredPlaces = filterPlacesByType(responseJson.results)
      	var counter = 0
      	var places = []
      	filteredPlaces.forEach((place) => {
      		getPlaceDetails(place.place_id)
      		.then((res) => res.json())
      		.then((details) => {
      			counter ++
      			if (counter === filteredPlaces.length) {
      				this.props.setNearbyPlaces(places)
      			}
      			places.push(details.result)
      		})
      		.catch((error) => {
      			console.log('Error getting nearby place details', error)
      		})
      	})
      })
      .catch((error) => {
        console.log('Error getting nearby places', error)
      })
	}

	componentWillUnmount() {
		console.log('MapContainer will unmount')
    navigator.geolocation.clearWatch(this.watchID);
    this.props.setRegion(this.state.region)
  }

  _getPlaces(places, filters, region, scale) {
  	if (places.placeById) {
			return getMapPlaces(places, filters, region, scale)
		} else {
			return {ids: [], placeById: {}}
		}
  }

  _getMatchingPlaces(visiblePlaces) {
		return visiblePlaces.ids.reduce( (acc, id) => {
			if (visiblePlaces.placeById[id].score > 0) {
				var place = visiblePlaces.placeById[id];
				acc['ids'] = acc['ids'].concat([id]);
				acc['placeById'][id] = {...place}
				return acc
			} else {
				return acc
			}
		}, {ids: [], placeById: {}})
	}

	_shouldShowNames(region) {
		if (region.longitudeDelta > .010) {
			return false
		} else return true
	}

	setMapReference(map) {
		this._mapReference = map;
	}

	moveMapToPlace(place) {
		this._animating = true;
		var nextRegion = {
				latitude: place.latlng.latitude,
	      longitude: place.latlng.longitude,
	      latitudeDelta: this.state.region.latitudeDelta,
	      longitudeDelta: this.state.region.longitudeDelta,
			}
		this._mapReference.animateToRegion(nextRegion, .5)
	}

  saveRegion(event) {
  	var lastRegion = this._lastRegion || this.state.region;
  	this.setState({
  		region: lastRegion
  	})
  }

  onRegionChange(region) {
  	if (this._animating) {
  		this._animating = false;
  		this.setState({
  			region: region
  		})
  	} else if (this._fromPOI) {
  		this._fromPOI = false;
  		this.setState({
  			region: region
  		})
  	} else {
  		this._animating = false;
  		this.setState({
  			region: region,
  			cardId: null
  		})
  	}
  }

  handleMarkerClick(place) {
  	console.log('User clicked marker')
  	var region = {
			latitude: place.latlng.latitude,
      longitude: place.latlng.longitude,
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta,
		}
  	this._mapReference.animateToRegion(region, .5)
  	LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  	this.setState({
  		cardId: place.place_id
  	})
  	
  	this._animating = true;
  }

  handleMapPress(event) {
  	if (!event.nativeEvent.hasOwnProperty('action') && this.state.cardId) {
  		//LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  		this.setState({
  			cardId: null
  		})
  	}
  }

  getCurrentLocation() {
  	console.log('getCurrentLocation from MapContainer')
  	var geo = navigator.geolocation;
  	geo.getCurrentPosition(
      (position) => {
      	var region = {
	        latitude: position.coords.latitude,
	        longitude: position.coords.longitude,
	        latitudeDelta: LATITUDE_DELTA,
	        longitudeDelta: LONGITUDE_DELTA,
      	}
      	//LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      	this.setState({
      		userLocation: region,
      		region: region
      	})
      },
      (positionErr) => {
      	console.log("Couldn't get current position", positionErr)
      }
    )
  }

	render() {
		return (
			<Map
				setMapReference={this.setMapReference.bind(this)}
				setCardId={(cardId) => this.setState({cardId: cardId})}
				handleRegionChange={this.onRegionChange.bind(this)}
				handleMarkerClick={this.handleMarkerClick.bind(this)}
				handleMapPress={this.handleMapPress.bind(this)}
				getLocation={this.getCurrentLocation.bind(this)}
				showNames={this._shouldShowNames(this.state.region)}
				markerPlaces={this.markerPlaces}
				visiblePlaces={this.visiblePlaces}
				matchingPlaces={this.matchingPlaces}
				region={this.state.region}
				userLocation={this.state.userLocation}
				showGPS={this.props.showGPS}
				POICardId={this.state.cardId}
				layoutInfo={this.props.layoutInfo}
				moveMapToPlace={this.moveMapToPlace.bind(this)}
				searchMarker={this.props.searchMarker}
				scrollEnabled={this.props.scrollEnabled}
        rotateEnabled={this.props.rotateEnabled}
        pitchEnabled={this.props.pitchEnabled}
				/>
			)
	}

}



//==============================//
//==============================//
//==============================//
//==============================//
//VERSION WITH REDUX


/*
class MapContainer extends Component {
	constructor(props) {
		console.log("constructing map");
		super(props);
		this.watchID = (null: ?number);
		this._lastRegion = null;
		this._imageURI = null;
		this._mapReference = null;
		this._animating = false;
		this._fromPOI = false;

	}

	shouldComponentUpdate(nextProps, nextState) {
		//If map has moved, render again
		if (!compareRegions(this.state.region, nextState.region)) {
			return true
		} 
		//If card has changed, render again
		else if (this.props.map.cardId !== nextProps.map.cardId) {
			return true
		} 
		//If toolbar hasn't updated, don't render
		else if (compareToolbars(this.props.filters, nextProps.filters)) {
			return false
		} 
		//If cards are scrolling
		else if (this.props.map.scrolling) {
			return false
		} else {
			return true
		}
		return true
	}

	componentWillUpdate(nextProps, nextState) {
  	//If new card is selected

  	if ((this.props.POICardId !== nextProps.POICardId) && nextProps.POICardId) {
  		var place = nextProps.markerPlaces.placeById[nextProps.POICardId]
  		var nextRegion = {
				latitude: place.latlng.latitude,
	      longitude: place.latlng.longitude,
	      latitudeDelta: this.props.region.latitudeDelta,
	      longitudeDelta: this.props.region.longitudeDelta,
			}
			this._animating = true;
  		this._mapReference.animateToRegion(nextRegion, .5)
  	}
  	//Map click without marker
  	
  }

	componentWillMount() {
		this._fromPOI = true;
		if (this.props.searchMarker) {
    	var region = {
        latitude: this.props.searchMarker.latlng.latitude,
        longitude: this.props.searchMarker.latlng.longitude,
        latitudeDelta: LATITUDE_DELTA / 30,
        longitudeDelta: LONGITUDE_DELTA / 30,
    	}
    	this.props.setRegion(region)
		} else if (this.props.region) {
			//Do nothing so it returns to same location
		} else {
			this.getCurrentLocation();
		}
	}

	componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

	setMapReference(map) {
		this._mapReference = map;
	}

  saveRegion(event) {
  	var lastRegion = this._lastRegion || this.props.region;
  	this.props.setRegion(lastRegion)
  }

  onRegionChange(region) {
  	console.log("On region change", region);
  	//this.props.setCardId(null)
  	this.props.setRegion(region)
  	if (this._animating) {
  		this._animating = false;
  	} else if (this._fromPOI) {
  		this._fromPOI = false;
  	} else {
  		this.props.setCardId(null)
  		this._animating = false;
  	}
  }

  handleMarkerClick(place) {
  	LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  	this.props.setCardId(place.place_id)
  	var region = {
			latitude: place.latlng.latitude,
      longitude: place.latlng.longitude,
      latitudeDelta: this.props.region.latitudeDelta,
      longitudeDelta: this.props.region.longitudeDelta,
		}
  	this._mapReference.animateToRegion(region, .5)
  	this._animating = true;
  }

  handleMapPress(event) {
  	if (!event.nativeEvent.hasOwnProperty('action') && this.props.POICardId) {
  		//LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
			this.props.setCardId(null)
  	}
  }

  getCurrentLocation() {
  	var geo = navigator.geolocation;
  	geo.getCurrentPosition(
      (position) => {
      	var region = {
	        latitude: position.coords.latitude,
	        longitude: position.coords.longitude,
	        latitudeDelta: LATITUDE_DELTA,
	        longitudeDelta: LONGITUDE_DELTA,
      	}
      	//LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      	this.props.setUserLocation(region)
      },
      (positionErr) => {
      	console.log("Couldn't get current position", positionErr)
      }
    )
  }

	render() {
		console.log("rendering map with props", this.props);
		return (
			<Map
				setMapReference={this.setMapReference.bind(this)}
				handleRegionChange={this.onRegionChange.bind(this)}
				handleMarkerClick={this.handleMarkerClick.bind(this)}
				handleMapPress={this.handleMapPress.bind(this)}
				getLocation={this.getCurrentLocation.bind(this)}
				{...this.props} />
			)
	}
}

*/

MapContainer.defaultProps = {
	showGPS: true,
	scrollEnabled: true,
	pitchEnabled: true,
	rotateEnabled: true
}
/*
const mapStateToProps = (state) => {
	return {
		layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard),
		filters: toolbar.selectors.getFilters(state.toolbar),
		matchingPlaces: getMatchingPlaces(state),
		visiblePlaces: getVisiblePlaces(state),
		markerPlaces: getMarkerPlaces(state),
		region: getRegion(state),
		userLocation: getUserLocation(state),
		POICardId: getCardId(state),
		showNames: getShowNames(state),
		tab: dashboard.selectors.getSelectedTab(state.dashboard)
	}
}
*/

const mapStateToProps = (state) => {
	return {
		layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard),
		myPlaces: state.myPlaces,
		filters: toolbar.selectors.getFilters(state.toolbar),
		region: getRegion(state),
		userLocation: getUserLocation(state),
		placeInfo: state.placeInfo,
		tab: dashboard.selectors.getSelectedTab(state.dashboard)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCardId(id) {
			dispatch(setCardId(id))
		},
		endCardScroll(id) {
			dispatch(endCardScroll(id))
		},
		setCardScrollInfo(id, percent) {
			dispatch(setCardScrollInfo(id, percent))
		},
		setRegion(region) {
			dispatch(setRegion(region))
		},
		setUserLocation(userLocation) {
			dispatch(setUserLocation(userLocation))
		},
		setNearbyPlaces(places) {
			dispatch(setNearbyPlaces(places))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)