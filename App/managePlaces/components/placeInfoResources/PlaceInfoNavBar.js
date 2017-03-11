import React, { Component } from 'React'

import {
	Image,
	View,
	StyleSheet,
	TouchableHighlight,
	TextInput,
	Dimensions
} from 'react-native'


const PlaceInfoNavBar = (props) => {
	return (
		<View style={styles.navBar}>
			<TouchableHighlight
				onPress={() => props.handleToMap()}>
				<View style={styles.nav}>
					<Image style={styles.back} source={{uri: 'backArrowDark'}} />
				</View>
			</TouchableHighlight>
		</View>
	)
}

export default PlaceInfoNavBar

PlaceInfoNavBar.propTypes = {
	handleToMap: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	navBar: {
		position: 'absolute',
		height: 66,
		width: Dimensions.get('window').width,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgb(255,255,255)',
		shadowColor: 'rgb(0,0,0)',
		shadowOpacity: .25,
		shadowOffset: {width: 1, height: 2},
		shadowRadius: 2
	},
	filler: {
		width: 58
	},
	search: {
		height: 18,
		width: 18
	},
	back: {
		height: 22,
		width: 13,
		marginTop: 15,
	},
	nav: {
		width: 60,
		alignItems: 'center',
	}
});