import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

const FooterCancel = ({ handlePress }) => {

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={styles.container}>
			<Text style={styles.Text}>Cancel</Text>
		</TouchableOpacity>
	)
}

export default FooterCancel;

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
})