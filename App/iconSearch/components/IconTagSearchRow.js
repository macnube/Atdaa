import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native'

import Icon from '../../shared/Icon';


const IconTagSearchRow = ({ layoutInfo, icon, handleNewIcon, handleUpdateToolbar }) => {
	let name = icon.name
	if (icon.type === 'category') {
		name = 'No Preference'
	}
	const textColor = icon.selected ? icon.iconColor : "rgb(74,74,74)"
	const borderLeftColumn = {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderRightWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgb(216,216,216)',
	};
	const borderRightColumn = {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderLeftWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgb(216,216,216)',
	};
	var borderStyle;
	if (icon.index % 2 === 0) {
		borderStyle = borderLeftColumn;
	} else borderStyle = borderRightColumn
	return (
		<TouchableOpacity
			onPress={() => handleUpdateToolbar(icon)}
			onLongPress={(e) => handleNewIcon(icon, e)}
			style={[styles.container, borderStyle]}
			>
			<Text style={[styles.tagText, {color: textColor}]}>{name}</Text>
		</TouchableOpacity>
	)
}

export default IconTagSearchRow;

IconTagSearchRow.propTypes = {
	layoutInfo: React.PropTypes.object.isRequired,
	icon: React.PropTypes.object.isRequired,
	handleNewIcon: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	container: {
		height: 63,
		width: 142,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tagText: {
		fontSize: 14,
		textAlign: "center",
		backgroundColor: "transparent",
	},
	tagContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'rgb(255,255,255)',
		borderWidth: 2,
		borderColor: 'rgb(213,213,213)',
	}
})