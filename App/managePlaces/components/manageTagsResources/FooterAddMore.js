import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

const FooterAddMore = ({ visible, handlePress }) => {
	const addMore = visible ?
		<TouchableOpacity
			onPress={handlePress}
			style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.Text}>Add More</Text>
			</View>
		</TouchableOpacity>
		: <View style={styles.addMorePlaceholder} />

	return addMore
}

export default FooterAddMore;

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
	textContainer: {
		width: 150,
		alignItems: "center",
	},
	addMorePlaceholder: {
		width: 150
	}
})