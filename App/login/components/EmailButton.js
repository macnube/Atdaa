import React from 'react'

import {
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
} from 'react-native'

const EmailButton = (props) => {
	return (
		<TouchableOpacity 
			onPress={() => props.handlePress()}
			style={styles.container}>
			<Image source={{uri: 'email'}} resizeMode='contain' style={styles.email} />
			<Text style={styles.text}>E-Mail</Text>
		</TouchableOpacity>
	)
}

export default EmailButton;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'rgba(241,126,2,0.7)',
		borderRadius: 5,
		height: 44,
		width: 219,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingHorizontal: 40,
	},
	email: {
		height: 16,
		width: 16,
	},
	text: {
		fontSize: 14,
		color: 'white',
		left: -20
	}

})