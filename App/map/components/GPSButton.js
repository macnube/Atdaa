import React, { Component } from 'React';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const GPSButton = (props) => {
	const style = {
		bottom: props.layoutInfo.toolbar.height - 5,
		left: props.layoutInfo.dropZones[4].xmin, 
		height: props.layoutInfo.icon.height,
		width: props.layoutInfo.icon.height,
		borderRadius: props.layoutInfo.icon.height / 2,
		shadowColor: 'rgb(0,0,0)',
		shadowOffset: {width: 1, height: 2},
		shadowRadius: 2,
		shadowOpacity: .25,
	}

	return (
		<TouchableOpacity 
			style={[styles.container, style]} 
			onPress={() => props.getLocation()}>
			<Image resizeMode="contain" style={{flex: 1}} source={{uri: "locateMe"}} />
		</TouchableOpacity>
	)
}

export default GPSButton;

var styles = StyleSheet.create({
	container: {
		position: 'absolute',
	}
})