import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Icon from '../../shared/Icon'
import POITagsBar from './POITagsBar'
import POIOpen from './POIOpen'

const POICard = ({ placeInfo, setPlaceInfo, smallScreen, distance, cardIcons, open, match }) => {
  const backgroundColor = match ? placeInfo.mapIcon.iconColor : 'rgb(74,74,74)'
  const icon = match ? placeInfo.mapIcon : placeInfo.primaryIcon
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setPlaceInfo(placeInfo)}>
      <View style={[styles.container, {width: smallScreen ? 275 : 300}]}>
        <View style={[styles.iconContainer, {backgroundColor: backgroundColor}]}>
          <Icon
            icon={icon}
            shadow={true}
            style={{height: 43}} />
        </View>
        <View style={styles.mainContainer}>
          <Text numberOfLines={1} style={styles.nameText}>{placeInfo.name}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.infoContainer}>
              <POIOpen open={open} />
              <Text style={styles.distance}>{distance} Km</Text>
            </View>
            <POITagsBar
              cardIcons={cardIcons}
              placeInfo={placeInfo}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

POICard.propTypes = {
  placeInfo: React.PropTypes.object.isRequired,
  setPlaceInfo: React.PropTypes.func.isRequired,
  distance: React.PropTypes.number.isRequired,
  open: React.PropTypes.string.isRequired,
  match: React.PropTypes.bool,
  cardIcons: React.PropTypes.array.isRequired
}

POICard.defaultProps = {
  match: true,
  cardIcons: []
}

const styles = StyleSheet.create({
  container: {
    height: 85,
    margin: 5,
    flexDirection: 'row',
    zIndex: 10,
    backgroundColor: 'white',
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.1,
    borderRadius: 6
  },
  iconContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    opacity: 0.7
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(255,255,255)',
    borderColor: 'rgb(255,255,255)',
    borderWidth: 2,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    paddingHorizontal: 10
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 17,
    color: 'rgb(135,135,135)'
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 40
  },
  distance: {
    color: 'rgb(156,156,156)'
  }
})

export default POICard