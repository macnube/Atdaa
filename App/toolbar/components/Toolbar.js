import React from 'react'

import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native'

import ToolbarIconAnimated from './ToolbarIconAnimated'
import ToolbarIconContainer from './ToolbarIconContainer'
import ToolbarIconLabels from './ToolbarIconLabels'
import searchButton from '../../searchButton'

const { SearchButtonContainer } = searchButton

const Toolbar = (props) => {
  const { layoutInfo, toggleTrash, handleDrop, handleSelect,
   toolbarIcons } = props
  const extraToolbarStyles = {
    height: layoutInfo.toolbar.height,
    width: layoutInfo.toolbar.width,
    backgroundColor: props.backgroundColor,
    paddingTop: layoutInfo.toolbar.paddingTop
  }
  const iconSelected = props.iconSelected || {priority: -1}
  const iconContainers = toolbarIcons.map((icon, index) => {
    return (
      <ToolbarIconContainer
        key={index}
        layoutInfo={layoutInfo}
        icon={icon} />
    )
  })

  const icons = toolbarIcons.map((icon, index) => {
    if (icon.id === 'openButton') {
      return <SearchButtonContainer key={index} />
    } else {
      var newIcon = {...icon}
      if (icon.id === 'empty') {
        newIcon.imageURI += index
      }
      return (
        <ToolbarIconAnimated
          key={index}
          icon={newIcon}
          shadow={true}
          layoutInfo={layoutInfo}
          toggleTrash={toggleTrash}
          onDrop={handleDrop}
          handleSelect={handleSelect}
          selected={index === iconSelected.priority} />
      )
    }
  })
  function render () {
    if (props.isVisible) {
      return (
        <View>
          <View style={[styles.toolbarBackground, {width: layoutInfo.toolbar.width}]} />
          <View style={[styles.toolbar, extraToolbarStyles]}>
            {iconContainers}
            {icons}
            <ToolbarIconLabels toolbar={toolbarIcons} layoutInfo={layoutInfo} />
          </View>
        </View>
      )
    } else return <View />
  }
  return render()
}

Toolbar.propTypes = {
  isVisible: React.PropTypes.bool,
  toolbarIcons: React.PropTypes.array.isRequired,
  iconSelected: React.PropTypes.object,
  toggleTrash: React.PropTypes.func.isRequired,
  handleDrop: React.PropTypes.func.isRequired,
  layoutInfo: React.PropTypes.object.isRequired,
  backgroundColor: React.PropTypes.string
}

Toolbar.defaultProps = {
  backgroundColor: 'transparent',
  isVisible: true
}

var styles = StyleSheet.create({
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  toolbarBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: Dimensions.get('window').height > 570 ? 70 : 60,
    backgroundColor: 'rgba(255,255,255,0.9)'
  }
})

export default Toolbar
