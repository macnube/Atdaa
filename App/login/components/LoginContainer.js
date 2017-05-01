import React, { Component } from 'react'
import api from '../../utils/api'
import Login from './Login'
import { Keyboard } from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import { cleanMyPlaces } from '../../utils/helpers'

class LoginContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: null,
      email: '',
      password: '',
      isLoading: false,
      facebookLoading: false,
      error: '',
      keyboard: false
    }
  }

  componentWillMount () {
    console.log('LoginContainer mounting')
    const keyboardOpen = () => {
      console.log('toggling Keyboard')
      this.setState({
        keyboard: true
      })
    }
    const keyboardClosed = () => {
      console.log('toggling Keyboard')
      this.setState({
        keyboard: false
      })
    }
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardOpen)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardClosed)
  }

  componentWillUnmount () {
    console.log('LoginContainer unmounting')
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  handleLogIn () {
    console.log('Handling Email Log In')
    dismissKeyboard()
    this.setState({
      isLoading: true
    })
    api.signIn(this.state.email, this.state.password)
      .then((data) => {
        console.log('data from signIn', data)
        var userInfo = {
          id: data.user.uid,
          email: data.user.email
        }
        console.log('userInfo before firebase check', userInfo)
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
        var cleanedInfo = cleanMyPlaces(userInfo)
        api.setLocalUserInfo(cleanedInfo)
        this.props.setUserInfo(cleanedInfo)
        this.props.toDashboard()
      })
      .catch((error) => {
        console.log('Error from login', error)
        this.setState({
          error: error.rawDescription,
          isLoading: false
        })
      })
  }

  onFacebookLogin (data) {
    console.log('LOGGING IN WITH FACEBOOK')
    this.setState({
      facebookLoading: true
    })
    let token = data.credentials.token
    api.signInFacebook(token)
      .then((data) => {
        console.log('data from signIn', data)
        var userInfo = {
          id: data.user.uid,
          email: data.user.email
        }
        api.setFirebaseUserEmail(date.user.email)
        console.log('userInfo before firebase check', userInfo)
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
      <Login
        email={this.state.email}
        password={this.state.password}
        downloading={this.state.downloading}
        error={this.state.error}
        isLoading={this.state.isLoading}
        facebookLoading={this.state.facebookLoading}
        setEmail={(email) => this.setState({email: email})}
        setPass={(password) => this.setState({password: password})}
        handleLogIn={this.handleLogIn.bind(this)}
        onFacebookLogin={this.onFacebookLogin.bind(this)}
        onFacebookLogout={this.onFacebookLogout.bind(this)}
        keyboard={this.state.keyboard} />
    )
  }
}

export default LoginContainer
