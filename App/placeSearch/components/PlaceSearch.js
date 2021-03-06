import React, { Component} from 'react'
import Config from 'react-native-config'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native'

const googleAPI = Config.GOOGLE_API_KEY

class PlaceSearch extends Component {

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
    return (
      <View>
        <Text style={{color: 'rgb(139, 139, 139)', fontSize: 18}}>{name}</Text>
        <Text style={{color: 'rgb(195,195,195)', fontSize: 14, marginTop: 2}}>{address}</Text>
      </View>
    )
  }

  renderNearby (nearbyPlaces) {
    if (this.props.showNearby) {
      var nearby = nearbyPlaces.map((place, index) => {
        return (
          <TouchableHighlight
            onPress={() => this.props.handleSetPlace({}, place)}
            key={index}>
            <View>
              <View style={styles.nearbyRow}>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={styles.nearbyName}>{place.name}</Text>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={{color: 'rgb(195,195,195)', fontSize: 14, marginTop: 2}}>{place.vicinity}</Text>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableHighlight>
        )
      })
      return (
        <View style={styles.nearbyContainer}>
          <Text style={styles.nearbyText}>Places Nearby</Text>
          <View style={styles.nearbyResultsContainer}>
            <ScrollView>
              {nearby}
            </ScrollView>
          </View>
        </View>
      )
    } else {
      return <View />
    }
  }

  renderLoading () {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.gifContainer}>
          <Image
            source={require('../../shared/Images/loading_place.gif')}
            style={{flex: 1}}
            resizeMode='contain' />
        </View>
      </View>
    )
  }

  render() {
    var loadingText = this.props.loading ? this.renderLoading() : <View />
    return (
      <View style={{flex: 1}}>
        <GooglePlacesAutocomplete
          ref="placeSearch"
          placeholder='Search for a Place...'
          textInputProps={{onChangeText: this.props.handleChangeText}}
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
            types: 'establishment'
          }}
          styles={{
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            row: {
              height: 57,
              justifyContent: 'space-around',
              flexDirection: 'column',
              padding: 0,
              paddingVertical: 7,
              paddingLeft: 22
            },
            separator: {
              height: StyleSheet.hairlineWidth
            },
            container: {
              flex: 1,
              backgroundColor: 'rgb(240,240,240)'
            },
            listView: {
              backgroundColor: 'white',
              borderRadius: 3,
              marginTop: 50,
              marginHorizontal: 11
            },
            textInputContainer: {
              backgroundColor: 'rgb(240,240,240)',
              borderBottomWidth: 0
            },
            textInput: {
              height: 40,
              borderRadius: 3,
              paddingLeft: 15
            }
          }}

          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}
          >
          {this.renderNearby(this.props.nearbyPlaces)}
          {loadingText}
          </GooglePlacesAutocomplete>
      </View>
    )

  }

}

var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    marginHorizontal: 11,
    borderRadius: 3,
    alignItems: 'center'
  },
  gifContainer: {
    height: 200,
    alignSelf: 'center'
  },
  loadingText: {
    fontSize: 20
  },
  nearbyContainer: {
    marginTop: 15,
    paddingBottom: 20,
    flex: 1
  },
  nearbyText: {
    fontSize: 16,
    height: 22,
    marginLeft: 25,
    color: 'rgb(156,156,156)',
    fontWeight: 'bold'
  },
  nearbyResultsContainer: {
    backgroundColor: 'white',
    borderRadius: 3,
    marginHorizontal: 11,
    marginTop: 13,
    flex: 1
  },
  nearbyRow: {
    justifyContent: 'space-around',
    paddingRight: 13,
    paddingVertical: 7,
    paddingLeft: 22,
    height: 57
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c8c7cc'
  },
  nearbyName: {
    color: 'rgb(139, 139, 139)',
    fontSize: 18,
    width: 300,
    paddingRight: 25
  }
})

export default PlaceSearch
