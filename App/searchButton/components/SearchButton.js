import React from 'React'

import {
  View,
  TouchableOpacity,
  Image
} from 'react-native'

const SearchButton = (props) => {
  const { layoutInfo, handlePress, selectedTab } = props
  const containerStyle = {
    position: 'absolute',
    top: layoutInfo.dropZones[4].ymin,
    left: layoutInfo.dropZones[4].xmin,
    borderRadius: layoutInfo.icon.height / 2,
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.25
  }
  const trashContainerStyle = {
    position: 'absolute',
    top: layoutInfo.dropZones[4].ymin,
    left: layoutInfo.dropZones[4].xmin,
    backgroundColor: 'transparent'
  }
  const buttonStyle = selectedTab === 'iconSearch' ? trashContainerStyle : containerStyle
  var buttonURI = selectedTab === 'iconSearch' ? 'iconTrash' : 'addPlace'
  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={1}
      onPress={() => handlePress()}>
      <View style={{height: layoutInfo.icon.height, width: layoutInfo.icon.height}}>
        <Image source={{uri: buttonURI}} resizeMode='contain' style={{flex: 1}} />
      </View>
    </TouchableOpacity>
  )
}
export default SearchButton
