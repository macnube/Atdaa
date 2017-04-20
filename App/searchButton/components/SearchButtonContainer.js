import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    const text = 'Are you sure you want to trash all your filters?'
    this.props.openModal(text, this.handleClearToolbar.bind(this), 'Trash', 'iconTrash')
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
    layoutInfo: dashboard.selectors.getLayoutInfo(state),
    selectedTab: dashboard.selectors.getSelectedTab(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
