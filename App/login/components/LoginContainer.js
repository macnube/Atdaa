import React, { Component } from 'react'
import api from '../../utils/api'
import Login from './Login'
import { Keyboard } from 'react-native'
import dismissKeyboard from 'dismissKeyboard'

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
      keyboard: false,
      downloading: ''
    }
  }

  componentWillMount () {
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
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  handleLogIn () {
    console.log('Handling Log In')
    dismissKeyboard()
    this.setState({
      isLoading: true,
      downloading: 'Checking User Credentials'
    })
    api.signIn(this.state.email, this.state.password)
      .then((data) => {
        console.log('data from signIn', data)
        var userInfo = {
          id: data.user.uid,
          email: data.user.email
        }
        console.log('userInfo', userInfo)
        this.setState({
          downloading: 'downloading and updating userInfo'
        })
        api.getFirebaseUserPlaces(userInfo.id)
          .then((snapshot) => {
            if (snapshot.value) {
              console.log('snapshot value from snapshot', snapshot.value)
              userInfo = {
                ...userInfo,
                myPlaces: {...snapshot.value.myPlaces}
              }
            } else {
              console.log('no data on server')
            }
            console.log('UserInfo before local write', userInfo)
            api.setLocalUserInfo(userInfo)
            this.props.setUserInfo(userInfo)
            this.props.toDashboard()
          })
          .catch((error) => {
            console.log('error fetching data from server', error)
            this.setState({
              isLoading: false
            })
          })
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
      facebookLoading: true,
      downloading: 'Checking User Credentials'
    })
    let token = data.credentials.token
    api.signInFacebook(token)
      .then((data) => {
        console.log('data from signIn', data)
        var userInfo = {
          id: data.user.uid,
          email: data.user.email
        }
        console.log('userInfo', userInfo)
        this.setState({
          downloading: 'downloading and updating userInfo'
        })
        console.log('Right before getFirebaseUserPlaces')
        api.getFirebaseUserPlaces(userInfo.id)
          .then((snapshot) => {
            console.log('here with snapshot', snapshot)
            if (snapshot.value) {
              console.log('snapshot value from snapshot', snapshot.value)
              userInfo = {
                ...userInfo,
                myPlaces: {...snapshot.value.myPlaces}
              }
            } else {
              console.log('no data on server')
            }
            console.log('UserInfo before local write', userInfo)
            api.setLocalUserInfo(userInfo)
            this.props.setUserInfo(userInfo)
            this.setState({
              facebookLoading: false
            })
            this.props.toDashboard()
          })
          .catch((error) => {
            this.setState({
              downloading: error
            })
            console.log('error fetching data from server', error)
          })
      })
      .catch((error) => {
        console.log('Facebook login failed with', error)
        this.setState({
          facebookLoading: false,
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
