import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native'

import { setUserInfo } from '../actions'
import api from '../../utils/api'
import { getLatestPlaces } from '../../utils/helpers'

import dashboard from '../../dashboard'
import map from '../../map'
import LoginContainer from './LoginContainer'
import CreateAccountContainer from './CreateAccountContainer'
import Splash from './Splash'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.025
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class SplashContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      reading: false
    }
    this._userInfo = null
  }

  toLogIn () {
    this.props.navigator.push({
      title: 'Login',
      component: LoginContainer,
      passProps: {
        toDashboard: this.toDashboard.bind(this),
        setUserInfo: this.props.setUserInfo.bind(this)
      }
    })
  }

  toDashboard (localLastUpdated = -1) {
    const { DashboardContainer } = dashboard
    this.props.navigator.push({
      title: 'Dashboard',
      component: DashboardContainer,
      passProps: {
        localLastUpdated: localLastUpdated
      }
    })
  }

  toCreateAccount () {
    this.props.navigator.push({
      title: 'Sign Up',
      component: CreateAccountContainer,
      passProps: {
        toDashboard: this.toDashboard.bind(this),
        setUserInfo: this.props.setUserInfo.bind(this)
      }
    })
  }

  getCurrentLocation () {
    console.log('Attempting to getCurrentLocation from SplashContainer')
    var geo = navigator.geolocation
    geo.getCurrentPosition(
      (position) => {
        var region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        this.props.setUserLocation(region)
      },
      (positionErr) => {
        console.log("Couldn't get current position", positionErr)
      }
    )
  }

  componentWillMount () {
    api.getLocalUserInfo()
      .then((userInfo) => {
        this._userInfo = userInfo
      })
      .catch((error) => {
        console.log('Error', error)
      })
    if (!this.props.region) {
      this.getCurrentLocation()
    }
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('componentWillUpdate from SplashContainer')
    // api.deleteLocalUserInfo()
    if (nextProps.region && !this.props.region) {
      if (!nextState.reading && this._userInfo) {
        this.setState({
          reading: true
        })
        console.log('This is user from SplashContainer', this._userInfo)
        this.props.setUserInfo(this._userInfo)
        var lastUpdated = 0
        if (this._userInfo.myPlaces) lastUpdated = this._userInfo.myPlaces.lastUpdated || 0
        this.toDashboard(lastUpdated)
      }
    }
  }

  componentWillUnmount () {
    console.log('Unmounting Splash Container')
  }

  render () {
    return (
      <Splash
        toLogIn={this.toLogIn.bind(this)}
        toCreateAccount={this.toCreateAccount.bind(this)}
        reading={this.state.reading}
        />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo (info) {
      dispatch(setUserInfo(info))
    },
    setUserLocation (userLocation) {
      dispatch(map.actions.setUserLocation(userLocation))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    region: map.selectors.getRegion(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashContainer)

