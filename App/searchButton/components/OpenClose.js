import React, { Component } from 'React';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';

import * as colors from '../../resources/Colors'

const OpenClose = (props) => {
	const { searchButtonOpen, selectedTab, 
		handlePress, style, height } = props;
	const iconStyle = {
		height: height,
		width: height
	}
	const iconContainerStyle = {
		position: "absolute",
		height: height,
		width: height,
		borderRadius: height / 2,
		shadowColor: 'rgb(0,0,0)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2,
		shadowOpacity: .5,
	}	
	var imageURI;
	if (searchButtonOpen) {
		imageURI = 'closeButton'
	} else {
		imageURI = selectedTab === "iconSearch" ? 'closeButtonLight' : 'openButton'
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => handlePress()}>
			<View style={[iconContainerStyle, style]}>
				<Image source={{uri: imageURI}} style={iconStyle}/>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default OpenClose;


	