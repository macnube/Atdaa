import React from 'react'

import {
	View,
	Text,
	StyleSheet,
	Image
} from 'react-native';

const Phone = (props) => {
	return (
		<View style={styles.container}>
			<Image source={{uri: 'phone'}} style={styles.image} />
			<Text style={styles.text}>Call</Text>
		</View>
	)
}

export default Phone;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 40,
	},
	image: {
		width: 19,
		height: 18,
	},
	text: {
		fontSize: 12,
	}
})