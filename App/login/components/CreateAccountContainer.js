import React, { Component } from 'react'
import api from '../../utils/api'
import CreateAccount from './CreateAccount'
import CreateEmailContainer from './CreateEmailContainer'
import LoginContainer from './LoginContainer'
import { cleanMyPlaces } from '../../utils/helpers'

class CreateAccountContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      error: ''
    }
  }

  toCreateEmail () {
    console.log('Moving from CreateAccount to CreateEmail')
    this.props.navigator.push({
      title: 'Sign Up',
      component: CreateEmailContainer,
      passProps: {
        toDashboard: this.props.toDashboard,
        setUserInfo: this.props.setUserInfo
      }
    })
  }

  toLogIn () {
    console.log('Moving from CreateAccount to Login')
    this.props.navigator.push({
      title: 'Login',
      component: LoginContainer,
      passProps: {
        toDashboard: this.props.toDashboard,
        setUserInfo: this.props.setUserInfo
      }
    })
  }

  onFacebookCreateAccount (data) {
    console.log('Creating account with Facebook')
    this.setState({
      isLoading: true
    })
    let token = data.credentials.token
    api.signInFacebook(token)
      .then((data) => {
        console.log('data from signIn', data)
        var userInfo = {
          id: data.user.uid,
          email: data.user.email
        }
        api.setFirebaseUserEmail(data.user.email)
        console.log('userInfo before firebase check', userInfo)
        this.setState({
          downloading: 'downloading and updating userInfo'
        })
        return Promise.all([userInfo, api.getFirebaseUserPlaces(userInfo.id)])
      })
      .then((results) => {
        var [userInfo, snapshot] = results
        if (snapshot.value) {
          console.log('User information found on server')
          userInfo = {
            ...userInfo,
            myPlaces: {...snapshot.value.myPlaces}
          }
          return Promise.resolve([userInfo, {}])
        } else {
          return Promise.all([userInfo, api.getFirebaseUserPlaces('mCrr7jrsfJTpooIGJPPPfL0p4c42')]) // Get Kaan's data
        }
      })
      .then((results) => {
        var [userInfo, kaanData] = results
        if (Object.keys(kaanData).length > 0) {
          console.log('Getting Kaan data for new user')
          userInfo = {
            ...userInfo,
            myPlaces: {...kaanData.value.myPlaces}
          }
        }
        console.log('userInfo is from login: ', userInfo)
        var cleanedInfo = cleanMyPlaces(userInfo)
        api.setLocalUserInfo(cleanedInfo)
        this.props.setUserInfo(cleanedInfo)
        this.props.toDashboard()
      })
      .catch((error) => {
        console.log('Facebook login failed with', error)
        this.setState({
          facebookLoading: false,
          downloading: error,
          error: error.description
        })
      })
  }

  onFacebookLogout () {
    console.log('logout successful')
  }

  render () {
    return (
      <CreateAccount
        error={this.state.error}
        isLoading={this.state.isLoading}
        onFacebookCreateAccount={this.onFacebookCreateAccount.bind(this)}
        onFacebookLogout={this.onFacebookLogout.bind(this)}
        toCreateEmail={this.toCreateEmail.bind(this)}
        toLogIn={this.toLogIn.bind(this)} />
    )
  }
}

export default CreateAccountContainer
