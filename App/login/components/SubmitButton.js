import React from 'react'

import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'

import * as colors from '../../resources/Colors'

const SubmitButton = (props) => {
	const containerStyle = props.active ? styles.activeContainer : styles.inactiveContainer
	const textColor = props.active ? colors.pumpkinOrange : 'rgb(231, 231, 231)'
	return (
		<TouchableOpacity
			onPress={() => props.handlePress()}
			style={containerStyle}
			disabled={!props.active}>
			<Text style={[styles.text, {color: textColor}]}>{props.text}</Text>
		</TouchableOpacity>

	)
}

export default SubmitButton;

var styles = StyleSheet.create({
	activeContainer: {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: colors.pumpkinOrange,
		borderRadius: 5,
		height: 44,
		width: 219,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inactiveContainer: {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: 'rgb(231, 231, 231)',
		borderRadius: 5,
		height: 44,
		width: 219,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 17,
		textAlign: 'center',
	}

})