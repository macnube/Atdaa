import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './App/rootReducer'

import Firestack from 'react-native-firestack'


const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__});

function configureStore() {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		),
	);
	const store = createStore(rootReducer, {}, enhancer);
	return store;
}

export default configureStore;