import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
} from 'react-native'

import ManageTagsNavBar from './ManageTagsNavBar'

const HeaderCategory = ({ categoryIcon, layoutInfo, onBack, placeInfo }) => {
	return (
		<ManageTagsNavBar 
			categoryIcon={categoryIcon}
			width={layoutInfo.toolbar.width}
			handlePress={onBack}
			placeInfo={placeInfo} />
	)
}

export default HeaderCategory;