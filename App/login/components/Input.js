import React from 'react'

import {
	View,
	TextInput,
	Image,
	StyleSheet,
} from 'react-native'

const Input = (props) => {
	const placeholder = props.value ? "" : props.placeholder
	const secure = props.imageURI === 'lock' ? true : false

	return (
		<View style={styles.container}>
			<Image source={{uri: props.imageURI}} resizeMode='contain' style={styles.icon} />
			<TextInput
					style={styles.textInput}
					value={props.value}
					autoCorrect={false}
					secureTextEntry={secure}
					placeholder={placeholder}
					placeholderTextColor='rgb(155, 155, 155)'
					onChangeText={(text) => props.setText(text)} />
		</View>
	)
}

export default Input;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: 'rgb(232, 232, 232)',
		borderRadius: 5,
		height: 44,
		width: 219,
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 5,
	},
	icon: {
		height: 20,
		width: 20,
	},
	textInput: {
		flex: 1,
		fontSize: 14,
		color: 'rgb(64, 64, 64)',
		marginLeft: 15,
	}

})