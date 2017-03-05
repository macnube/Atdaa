import React, { Component } from 'react'
import api from '../../utils/api'
import CreateAccount from './CreateAccount'
import CreateEmailContainer from './CreateEmailContainer'

class CreateAccountContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			error: '',
		}
	}

	toCreateEmail() {
		this.props.navigator.push({
			title: 'Sign Up',
			component: CreateEmailContainer,
			passProps: { 
				toDashboard: this.props.toDashboard,
				setUserInfo: this.props.setUserInfo,
			}
		})
	}

	onFacebookCreateAccount(data) {
		console.log("Creating WITH FACEBOOK");
		this.setState({
			isLoading: true,
		})

		let token = data.credentials.token
		api.signInFacebook(token)
			.then( (user) => {
				console.log('user from firestack', user);
				const userInfo = {
					id: user.uid,
					email: user.email,
				}
				api.setLocalUserInfo(userInfo);
				this.props.setUserInfo(userInfo);
				this.props.toDashboard();
			})
			.catch( (error) => {
				this.setState({
					isLoading: false,
					error: error.description
				})
				console.log("Facebook login failed with", error);
			})
	}

	onFacebookLogout() {
  	console.log("logout successful");
	}

	render() {
		return (
			<CreateAccount
				error={this.state.error}
				isLoading={this.state.isLoading}
				onFacebookCreateAccount={this.onFacebookCreateAccount.bind(this)}
				onFacebookLogout={this.onFacebookLogout.bind(this)}
				toCreateEmail={this.toCreateEmail.bind(this)} />
		)
	}
}

export default CreateAccountContainer