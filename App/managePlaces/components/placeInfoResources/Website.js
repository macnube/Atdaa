import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

const Website = (props) => {
	return (
		<View style={styles.container}>
			<Image source={{uri: 'website'}} style={styles.image} />
			<Text style={styles.text}>Website</Text>
		</View>
	)
}

export default Website;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 40,
	},
	image: {
		width: 19,
		height: 19,
	},
	text: {
		fontSize: 12,
	}
})