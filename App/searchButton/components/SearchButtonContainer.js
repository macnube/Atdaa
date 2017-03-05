import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LayoutAnimation } from 'react-native'

import { toggleSearchButton } from '../actions'
import dashboard from '../../dashboard'
import toolbar from '../../toolbar'

import SearchButton from './SearchButton'

class SearchButtonContainer extends Component {

  handlePress () {
    if (this.props.selectedTab === 'iconSearch') {
      this.openClearModal()
    } else {
      this.props.setSelectedTab('placeSearch')
    }
  }

  openClearModal () {
    const text = 'Are you sure you want to clear your filters?'
    this.props.openModal(text, this.handleClearToolbar.bind(this), 'Clear', 'clearModal')
  }

  handleClearToolbar () {
    this.props.closeModal()
    this.props.clearToolbar()
  }

  render () {
    return (
      <SearchButton
        handlePress={this.handlePress.bind(this)}
        {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    layoutInfo: state.dashboard.layoutInfo,
    searchButtonOpen: state.searchButtonOpen,
    selectedTab: state.dashboard.selectedTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSearchButton () {
      dispatch(toggleSearchButton())
    },
    setSelectedTab (tab) {
      dispatch(dashboard.actions.setSelectedTab(tab))
    },
    openModal (text, onYes, yesText, uri) {
      dispatch(dashboard.actions.openModal(text, onYes, yesText, uri))
    },
    closeModal () {
      dispatch(dashboard.actions.closeModal())
    },
    clearToolbar () {
      dispatch(toolbar.actions.clearToolbar())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchButtonContainer)
