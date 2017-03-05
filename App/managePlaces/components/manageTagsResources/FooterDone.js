import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

const FooterDone = ({ visible, handlePress }) => {
	return visible ?
		<TouchableOpacity
			onPress={handlePress}
			style={styles.container}>
			<Text style={styles.Text}>Done</Text>
		</TouchableOpacity>
		: <Text style={styles.textGrey}>Done</Text>
}

export default FooterDone;

var styles = StyleSheet.create({
	container: {
		height: 50,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 12,
		textAlign: 'center',
	},
	textGrey: {
		fontSize: 14,
		color: 'grey'
	}
})