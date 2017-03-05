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
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => handleAddTag()}>
          <View style={[styles.iconContainer, {backgroundColor: icon.iconColor}]}>
            <Icon
              style={{height: 50}}
              icon={icon}
              shadow={true} />
          </View>
        </TouchableOpacity>
        <View style={styles.mainInfo}>
          <Text style={styles.nameText} numberOfLines={1}>{placeInfo.name}</Text>
          <View style={styles.openInfo}>
            <Open open={open} />
            <Text style={styles.distanceText}>{distance} Km</Text>
          </View>
          <Text style={styles.typeText}>{placeInfo.type}</Text>
        </View>
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
    flexDirection: 'row',
    height: 80
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 80,
    backgroundColor: colors.pumpkinOrange,
    opacity: 0.7
  },
  mainInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(238,238,238)'
  },
  nameInfo: {
    flexDirection: 'column',
    fontSize: 17,
    justifyContent: 'space-around',
    color: 'rgb(74,74,74)'
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
    paddingHorizontal: 30
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
