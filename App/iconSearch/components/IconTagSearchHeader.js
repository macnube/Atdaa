import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
} from 'react-native'

import * as colors from '../../resources/Colors'

import Icon from '../../shared/Icon';
import IconSearchNavBar from './IconSearchNavBar';


const IconTagSearchHeader = ({ layoutInfo, icon, onBack }) => {
	console.log("Icon going into IconTagSearchBar", icon);
	const iconStyle = {
		height: layoutInfo.searchIcon.height,
		width: layoutInfo.searchIcon.height,
		alignSelf: 'center',
	}
	return (
		<View style={[styles.container, {backgroundColor: icon.iconColor}]}>
			<IconSearchNavBar 
				categoryIcon={icon}
				width={layoutInfo.toolbar.width}
				handlePress={onBack}
				barColor={icon.iconColor} />
			<View style={styles.iconContainer}>
				<Icon
					style={iconStyle}
					shadow={true}
					icon={icon}
					layoutInfo={layoutInfo} />
				<Text style={styles.iconText}>{icon.name}</Text>
			</View>
		</View>
	)
}

export default IconTagSearchHeader;

IconTagSearchHeader.propTypes = {
	layoutInfo: React.PropTypes.object.isRequired,
	icon: React.PropTypes.object.isRequired,
	onBack: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	container: {
		height: 100,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 60,
		shadowColor: 'rgb(203,203,203)',
		shadowOffset: {width: 1, height: 2},
		shadowRadius: 3,
		shadowOpacity: 1,
	},
	iconText: {
		fontSize: 14,
		color: 'rgb(74,74,74)',
		backgroundColor: 'transparent',
	},
	iconContainer: {
		height: 90,
		top: -6,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'transparent'
	}
});