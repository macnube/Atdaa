import React, { Component } from 'React'

import {
	Image,
	View,
	StyleSheet,
	TouchableHighlight,
	TextInput,
	Text
} from 'react-native'

import * as colors from '../../../resources/Colors'


const ManageTagsNavBar = ({ categoryIcon, width, placeInfo, handlePress, barColor }) => {
	const extraStyle= categoryIcon ? 
		{width: width, backgroundColor: barColor} : 
		[styles.navBarShadow, {width: width, backgroundColor: barColor, marginBottom: 30}];
	const atdaaURI = categoryIcon ? 'atdaaLight' : 'atdaaOrange'
	const backURI = categoryIcon ? 'backArrowLight' : 'backArrowDark'
	const searchURI = categoryIcon ? 'searchLight' : 'searchDark'
	const navTextColor = categoryIcon ? 'white' : 'rgb(74,74,74)'
	return (
		<View style={[styles.navBar, extraStyle]}>
			<TouchableHighlight
				onPress={() => handlePress()}>
				<View style={styles.nav}>
					<Image style={styles.back} source={{uri: backURI}} />
					<Text style={{fontSize: 15, marginLeft: 5}}>Done</Text>
				</View>
			</TouchableHighlight>
			<Text style={[styles.navText, {color: navTextColor}]}>Editing {placeInfo.name}</Text>
			<View>
				<View style={styles.nav}>
				</View>
			</View>
		</View>
	)
}

export default ManageTagsNavBar

ManageTagsNavBar.propTypes = {
	categoryIcon: React.PropTypes.object,
	width: React.PropTypes.number.isRequired,
	handlePress: React.PropTypes.func.isRequired,
	barColor: React.PropTypes.string.isRequired
}

ManageTagsNavBar.defaultProps = {
	categoryIcon: null,
	barColor: 'rgb(255,255,255)'
}

var styles = StyleSheet.create({
	navBar: {
		height: 66,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 23,
		alignItems: 'center',
	},
	navBarShadow: {
		shadowColor: 'rgb(203,203,203)',
		shadowOffset: {width: 1, height: 2},
		shadowRadius: 3,
		shadowOpacity: 1,
	},
	navText: {
		fontSize: 15,
		marginTop: 15,
	},
	back: {
		width: 12,
		height: 22
	},
	search: {
		height: 17,
		width: 17
	},
	atdaa: {
		height: 24,
		width: 58,
		marginTop: 15,
	},
	nav: {
		marginTop: 15,
		width: 60,
		alignItems: 'center',
		flexDirection: 'row'
	}
});