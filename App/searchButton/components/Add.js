import React, { Component } from 'React';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const Add = (props) => {
	const { type, handlePress, style, height, searchButtonOpen, selectedTab } = props;
	const iconContainerStyle = {
		position: "absolute",
		height: height,
		width: height,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: height / 2,
		shadowColor: 'rgb(0,0,0)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2,
		shadowOpacity: .5,
	}	
	const opacity = searchButtonOpen ? 1 : 0
	const iconStyle = {
		height: height,
		width: height,
		opacity: opacity
	}
	
	return (
		<TouchableOpacity
			style={[iconContainerStyle, style]}
			onPress={() => handlePress()}>
			<View>
				<Image source={{uri: `add${type}`}} style={iconStyle}/>
			</View>
		</TouchableOpacity>
	)
}

export default Add;