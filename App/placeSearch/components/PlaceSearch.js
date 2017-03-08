import React, { Component} from 'react';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import helpers from '../../utils/helpers';

import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native'

const googleAPI = "AIzaSyChab7O6hfps-mXbk-DDtsdThWongFboZA";



class PlaceSearch extends Component {
  /*
  componentDidMount() {
    this.refs['placeSearch'].triggerFocus();
  }
  */

  renderRow(rowData) {
    var name, address;
    if (rowData.terms[0]) {
      name = rowData.terms[0].value
    } else {
      name = "Unknown"
    }
    if (rowData.terms[1]) {
      address = rowData.terms[1].value
    } else {
      address = ""
    }
    console.log("rowData going into PlaceSearch", rowData);
    return (
      <View style={{flex: 1, justifyContent: 'space-around', paddingRight: 15}}>
        <Text style={{color: 'rgb(139, 139, 139)', fontSize: 18}}>{name}</Text>
        <Text style={{color: 'rgb(195,195,195)', fontSize: 14}}>{address}</Text>
      </View>
    )
  }

  renderLoading() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.loadingText}>Loading Place Card</Text>
      </View>
    )
  }

  render() {
    var loadingText = this.props.loading ? this.renderLoading() : <View />
    return (
      <View style={{flex: 1}}>
        {loadingText}
        <GooglePlacesAutocomplete
          ref="placeSearch"
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderRow={(row) => this.renderRow(row)}
          //renderDescription={(row) => row.terms[0].value + ', ' + row.terms[1].value} // display street only
          onPress={(data, details = null) => this.props.handleSetPlace(data, details)}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: googleAPI,
            language: 'en', // language of the results
            location: this.props.location,
            radius: "5000",
          }}
          styles={{
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            row: {
              height: 57,
              padding: 0,
              paddingVertical: 7,
              paddingLeft: 22
            },
            separator: {
              height: StyleSheet.hairlineWidth
            },
            container: {
              flex: 1
            }
          }}

          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          />
      </View>
    )

  }

}

var styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    height: 50,
    width: Dimensions.get('window').width,
    top: 100,
    alignSelf: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
  }
})

export default PlaceSearch;