import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

import * as colors from '../../resources/Colors'

const POIOpen = (props) => {
	const uri = props.open === 'Open Now' ? 'clockOpen' : 'clockClosed'
	const color = props.open === 'Open Now' ? colors.paleOliveGreen : 'rgb(243,89,112)'
	return (
		<View style={styles.container}>
			<Image source={{uri: uri}} style={styles.image} />
			<Text style={[styles.text, {color: color}]}>{props.open}</Text>
		</View>
	)
}

export default POIOpen;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: 12,
		height: 12,
	},
	text: {
		fontSize: 14,
		marginLeft: 5
	}
})