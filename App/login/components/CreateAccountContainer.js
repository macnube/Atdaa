import React, { Component } from 'react'
import api from '../../utils/api'
import CreateAccount from './CreateAccount'
import CreateEmailContainer from './CreateEmailContainer'
import LoginContainer from './LoginContainer'

class CreateAccountContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      error: ''
    }
  }

  toCreateEmail () {
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
    this.setState({
      isLoading: true
    })

    let token = data.credentials.token
    api.signInFacebook(token)
      .then((data) => {
        console.log('data from firestack', data)
        var userInfo = {
          id: data.user.uid,
          email: data.user.email
        }
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
            api.setLocalUserInfo(userInfo)
            this.props.setUserInfo(userInfo)
            this.props.toDashboard()
          })
          .catch((error) => {
            this.setState({
              downloading: error
            })
            api.setLocalUserInfo(userInfo)
            this.props.setUserInfo(userInfo)
            this.props.toDashboard()
            console.log('error fetching data from server', error)
          })
      })
      .catch((error) => {
        console.log('Facebook login failed with', error)
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
