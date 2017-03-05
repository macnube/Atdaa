import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTrash, switchToolbarIcons, deleteToolbarIcon, setSelectedIcon } from '../actions'

import {
  LayoutAnimation
} from 'react-native'

import dashboard from '../../dashboard'
import Toolbar from './Toolbar'

class ToolbarContainer extends Component {

  handleDrop (icon, index) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    console.log('HANDLING DROP FROM TOOLBARCONTAINER')
    // If the icon is dropped on the trash delete
    if (index === 4) this.props.deleteToolbarIcon(icon.priority)
    else this.props.switchToolbarIcons(icon.priority, index)
  }

  handleSelect (index) {
    this.props.setSelectedIcon(this.props.toolbarIcons[index])
  }

  render () {
    return (
      <Toolbar
        handleDrop={this.handleDrop.bind(this)}
        handleSelect={this.handleSelect.bind(this)}
        {...this.props} />
    )
  }
}

const getBackgroundColor = (selectedTab) => {
  if (selectedTab === 'iconSearch') return 'rgb(255,255,255)'
  else return 'transparent'
}

const isVisible = (selectedTab) => {
  const excludedTabs = ['placeSearch', 'manageTags', 'placeInfo']
  return excludedTabs.indexOf(selectedTab) === -1
}

const mapStateToProps = (state) => {
  return {
    toolbarIcons: state.toolbar.toolbarIcons,
    iconSelected: state.toolbar.iconSelected,
    isVisible: isVisible(dashboard.selectors.getSelectedTab(state.dashboard)),
    backgroundColor: getBackgroundColor(dashboard.selectors.getSelectedTab(state.dashboard)),
    layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard)
  }
}

export default connect(mapStateToProps,
  {toggleTrash, switchToolbarIcons, deleteToolbarIcon, setSelectedIcon})(ToolbarContainer)
