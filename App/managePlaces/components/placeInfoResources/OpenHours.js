import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

const OpenHours = (props) => {
	return (
		<View style={styles.container}>
			<Image source={{uri: 'openHours'}} style={styles.image} />
			<Text style={styles.text}>Today</Text>
			<Text style={styles.text}>{props.hours}</Text>
		</View>
	)
}

export default OpenHours;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 32,
	},
	image: {
		width: 17,
		height: 17,
	},
	text: {
		fontSize: 12,
		marginLeft: 15
	}
})