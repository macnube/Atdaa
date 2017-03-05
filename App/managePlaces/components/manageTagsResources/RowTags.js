import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native'

import * as colors from '../../../resources/Colors'

import Icon from '../../../shared/Icon';


const RowTags = ({ layoutInfo, icon, handleAddRemoveTag }) => {
	console.log("icon from RowTags", icon);

	const selectedColor = icon.selected ? icon.iconColor : 'rgb(250,250,250)'
	const borderColor = icon.selected ? icon.iconColor : 'rgb(199,199,199)'
	const textColor = icon.selected ? 'white' : 'rgb(137,137,137)'
	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => handleAddRemoveTag(icon)}
			style={[styles.container, {backgroundColor: selectedColor, borderColor: borderColor}]}>
			<Text style={[styles.tagText, {color: textColor}]}>{icon.name}</Text>
		</TouchableOpacity>
	)
}

export default RowTags;

var styles = StyleSheet.create({
	container: {
		marginBottom: 11,
		height: 38,
		width: 280,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 6,
		opacity: .58,
	},
	tagText: {
		fontSize: 16,
		textAlign: "center",
		backgroundColor: "transparent",
	},
})