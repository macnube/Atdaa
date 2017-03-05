import React from 'React'

import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import Icon from '../../../shared/Icon'
import ManageTagsNavBar from './ManageTagsNavBar'

const HeaderTags = ({ layoutInfo, icon, onBack, placeInfo }) => {
  const iconStyle = {
    height: layoutInfo.searchIcon.height,
    width: layoutInfo.searchIcon.height,
    alignSelf: 'center'
  }
  console.log('icon going into HeaderTags', icon)
  icon.imageURI = icon.imageURI.split('_')[0]
  return (
    <View style={[styles.container, {backgroundColor: icon.iconColor}]}>
      <ManageTagsNavBar
        categoryIcon={icon}
        width={layoutInfo.toolbar.width}
        handlePress={onBack}
        barColor={icon.iconColor}
        placeInfo={placeInfo} />
      <View style={[styles.iconContainer, {height: layoutInfo.searchIcon.height * 1.4}]}>
        <Icon
          style={iconStyle}
          shadow={true}
          icon={icon}
          layoutInfo={layoutInfo} />
        <Text style={styles.iconText}>{icon.name}</Text>
      </View>
    </View>
  )
}

export default HeaderTags

HeaderTags.propTypes = {
  layoutInfo: React.PropTypes.object.isRequired,
  icon: React.PropTypes.object.isRequired,
  onBack: React.PropTypes.func.isRequired
}

var styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 60,
    shadowColor: 'rgb(203,203,203)',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
    shadowOpacity: 1
  },
  iconText: {
    fontSize: 14,
    color: 'rgb(74,74,74)',
    backgroundColor: 'transparent',
    marginBottom: 10
  },
  iconContainer: {
    height: 90,
    top: -6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  }
});