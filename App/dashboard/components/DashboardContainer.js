import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  setSelectedTab,
  setLayout,
  loadLocalInfo,
  logout,
  openModal,
  closeModal
} from '../actions'

import toolbar from '../../toolbar'
import iconSearch from '../../iconSearch'
import placeSearch from '../../placeSearch'
import login from '../../login'
import map from '../../map'

import Dashboard from './Dashboard'

import api from '../../utils/api'
import { getLayout } from '../../utils/helpers'

// Todo:
// Create a loadState and saveState function
// Need to subscribe so that saveState is called every time new data is available.
// Don't want to save UI state, only data.
// Think about using 'node-uuid' library to create unique ids every time.
// import 'v4' from 'node-uuid'
// explore lodash library and throttle to ensure that the inner function isn't called more than specified
// import throttle from 'lodash/throttle'

class DashboardContainer extends Component {

  constructor (props) {
    super(props)
    this.cardId = null
    this.state = {
      modalVisible: false,
      modalText: '',
      modalYes: null
    }
  }

  componentWillMount () {
    this.props.setLayout(getLayout())
    api.getFirebaseUserPlaces(this.props.user.id)
      .then((snapshot) => {
        console.log('Info on server, checking which one is most recent')
        console.log('Server last updated is: ', snapshot.value)
        console.log('Local last updated is: ', this.props.localLastUpdated)
        if (snapshot.value.myPlaces.lastUpdated > this.props.localLastUpdated && this.props.localLastUpdated !== -1) {
          console.log('Updating from server!!!!')
          var userInfo = {
            ...this.props.user,
            ...snapshot.value
          }
          api.setLocalUserInfo(userInfo)
          this.props.setUserInfo(userInfo)
        }
      })
      .catch((error) => {
        console.log('error getting server info, sticking with local data', error)
      })
  }

  componentWillUpdate (nextProps, nextState) {
    const currentTab = this.props.dashboard.selectedTab
    const nextTab = nextProps.dashboard.selectedTab
    const { placeInfo } = this.props
    if (currentTab === 'placeInfo' && nextTab === 'map' && !placeInfo.isNew) {
      this.cardId = placeInfo.place_id
    } else {
      this.cardId = null
    }
  }

  openLogoutModal () {
    const logoutText = 'Are you sure you want to log out?'
    this.props.openModal(logoutText, this.handleLogout.bind(this), 'Log Out', 'logoutModal')
  }

  handleLogout () {
    const { SplashContainer } = login
    this.props.closeModal()
    this.props.logout()
    api.signOut()
    api.deleteLocalUserInfo()
    this.props.navigator.push({
      title: 'Splash',
      component: SplashContainer
    })
  }

  navVisible () {
    const excludedTabs = ['iconSearch', 'manageTags', 'placeInfo']
    return excludedTabs.indexOf(this.props.dashboard.selectedTab) === -1
  }

  render () {
    return (
      <Dashboard
        navVisible={this.navVisible()}
        handleLogout={this.openLogoutModal.bind(this)}
        cardId={this.cardId}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    user: login.selectors.getUserInfo(state.user),
    newIcon: state.newIcon,
    placeInfo: placeSearch.selectors.getPlaceInfo(state.placeInfo)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTab (tab) {
      dispatch(setSelectedTab(tab))
    },
    setNearbyPlaces (places) {
      dispatch(map.actions.setNearbyPlaces(places))
    },
    setUserInfo (userInfo) {
      dispatch(login.actions.setUserInfo(userInfo))
    },
    setLayout (layoutInfo) {
      dispatch(setLayout(layoutInfo))
    },
    updateToolbarIcon (iconId, index) {
      dispatch(toolbar.actions.updateToolbarIcon(iconId, index))
    },
    clearNewIcon () {
      dispatch(iconSearch.actions.clearNewIcon())
    },
    loadLocalInfo (userInfo) {
      dispatch(loadLocalInfo(userInfo))
    },
    logout () {
      dispatch(logout())
    },
    openModal (text, onYes, yesText, uri) {
      dispatch(openModal(text, onYes, yesText, uri))
    },
    closeModal () {
      dispatch(closeModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
