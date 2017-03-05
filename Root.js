import React from 'react';
import { Provider } from 'react-redux';
import login from './App/login'
import {
	NavigatorIOS, 
} from 'react-native';


const Root = ({ store }) => {
	const { SplashContainer } = login
	console.log("this is store", store.getState());
	return (
		<Provider store={store}>
			<NavigatorIOS
				style={{flex: 1}}
	      initialRoute={{
	        title: "SatisFI",
	        component: SplashContainer,
	        
	      }}
	      navigationBarHidden={true} 
	    />
		</Provider>
	)
};

export default Root;