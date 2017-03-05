import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './App/rootReducer'

import Firestack from 'react-native-firestack'


const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__});


const configureStore = (userInitialState = {}) => {
	let middleware = [
		thunkMiddleware,
		loggerMiddleware
	]
	let tools = [];
	let firestackConfig = {
		debug: true
	}
	const firestack = new Firestack(firestackConfig)

	let finalCreateStore;
	finalCreateStore = compose(
		applyMiddleware(...middleware),
		...tools,
	)(createStore);

	const finalInitialState = Object.assign({},
		initialState,
		userInitialState,
		{firestack}
	);

	const store = finalCreateStore(
		rootReducer,
		finalInitialState
	);

	

}

export default configureStore;