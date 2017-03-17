import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import * as colors from '../../../resources/Colors'

import Icon from '../../../shared/Icon'

import Phone from './Phone'
import AddTag from './AddTag'
import Website from './Website'
import Address from './Address'
import OpenHours from './OpenHours'
import Open from './Open'

const PlaceDetails = ({ placeInfo, icon, handleAddTag, hours, distance, open }) => {
  const textColor = placeInfo.isNew ? 'rgb(120,120,120)' : 'white'
  const mainInfoColor = placeInfo.isNew ? 'rgb(240, 240, 240)' : icon.iconColor
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={[styles.mainInfo, {backgroundColor: mainInfoColor}]}>
          <Text style={[styles.nameText, {color: textColor}]} numberOfLines={1}>{placeInfo.name}</Text>
          <Text style={[styles.typeText, {color: textColor}]}>{placeInfo.type}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAddTag()}>
          <View style={styles.iconContainer}>
            <Icon
              style={{height: 50}}
              icon={icon}
              shadow={true} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contactContainer}>
        <Phone />
        <AddTag handlePress={handleAddTag} />
        <Website />
      </View>
      <View style={styles.locationContainer}>
        <Address address={placeInfo.address} />
        <OpenHours hours={hours} />
      </View>
    </View>
  )
}

PlaceDetails.propTypes = {
  placeInfo: React.PropTypes.object.isRequired,
  icon: React.PropTypes.object.isRequired,
  handleAddTag: React.PropTypes.func.isRequired
}

export default PlaceDetails

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  mainContainer: {
    height: 90,
    backgroundColor: 'transparent'
  },
  mainInfo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    paddingBottom: 15,
    paddingTop: 30
  },
  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -115,
    backgroundColor: 'transparent',
    zIndex: 10
  },
  nameInfo: {
    flexDirection: 'column',
    fontSize: 17,
    justifyContent: 'space-around',
    color: 'rgb(74,74,74)'
  },
  nameText: {
    fontSize: 20,
    color: 'rgb(120,120,120)'
  },
  openInfo: {
    flexDirection: 'row'
  },
  distanceText: {
    marginLeft: 19,
    fontSize: 12,
    color: 'rgb(155,155,155)'
  },
  typeText: {
    color: 'rgb(120,120,120)',
    fontSize: 14
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(238,238,238)',
    height: 80,
    paddingHorizontal: 30,
    zIndex: 1
  },
  locationContainer: {
    flexDirection: 'column',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingBottom: 10,
    paddingTop: 10
  }
})
