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
import { getDashboard } from '../selectors'
import CodePush from 'react-native-code-push'
import Config from 'react-native-config'

import toolbar from '../../toolbar'
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
      modalYes: null,
      syncStatus: '',
      syncMessage: '',
      restartAllowed: true,
      progress: ''
    }
  }

  componentWillMount () {
    console.log('DashboardContainer mounted')
    console.log('Dashboard props is: ', this.props.dashboard)
    this.props.setLayout(getLayout())
    api.getFirebaseUserPlaces(this.props.user.id)
      .then((snapshot) => {
        console.log('Info on server, checking which one is most recent')
        console.log('Server last updated is: ', snapshot.value)
        console.log('Local last updated is: ', this.props.localLastUpdated)
        if (snapshot.value.myPlaces.lastUpdated > this.props.localLastUpdated
          && this.props.localLastUpdated !== -1) {
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

  componentWillUnmount () {
    console.log('Unmounting DashboardContainer')
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('componentWillUpdate from DashboardContainer')
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
    console.log('Logout modal opened')
    const logoutText = 'Are you sure you want to log out?'
    this.props.openModal(logoutText, this.handleLogout.bind(this), 'Log Out', 'logoutModal')
  }

  handleLogout () {
    console.log('User logging out')
    const { SplashContainer } = login
    this.props.closeModal()
    this.props.logout()
    api.signOut()
    api.deleteLocalUserInfo()
      .then(() => console.log('Successfully signed out of firebase'))
    this.props.navigator.replace({
      title: 'Splash',
      component: SplashContainer
    })
  }

  navVisible () {
    const excludedTabs = ['iconSearch', 'manageTags', 'placeInfo']
    return excludedTabs.indexOf(this.props.dashboard.selectedTab) === -1
  }

  //Code push helpers

  codePushStatusDidChange(syncStatus) {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then((metadata: LocalPackage) => {
        this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
      }, (error: any) => {
        this.setState({ syncMessage: "Error: " + error, progress: false });
      });
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true, appendReleaseDescription: true },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  render () {
    return (
      <Dashboard
        navVisible={this.navVisible()}
        handleLogout={this.openLogoutModal.bind(this)}
        cardId={this.cardId}
        syncImmediate={this.syncImmediate.bind(this)}
        syncVisible={Config.CODEPUSH_SYNC_VISIBLE === 'true'}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: getDashboard(state),
    user: login.selectors.getUserInfo(state),
    placeInfo: placeSearch.selectors.getPlaceInfo(state)
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
