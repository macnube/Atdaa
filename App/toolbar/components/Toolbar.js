import React from 'react'

import {
  View,
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
      return (
        <ToolbarIconAnimated
          key={index}
          icon={icon}
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
        <View style={[styles.toolbar, extraToolbarStyles]}>
          {iconContainers}
          {icons}
          <ToolbarIconLabels toolbar={toolbarIcons} layoutInfo={layoutInfo} />
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
  }
})

export default Toolbar
