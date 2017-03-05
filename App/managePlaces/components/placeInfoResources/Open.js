import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

import * as colors from '../../../resources/Colors'

const Open = (props) => {
	const uri = props.open === 'Open Now' ? 'clockOpen' : 'clockClosed'
	const color = props.open === 'Open Now' ? colors.paleOliveGreen : colors.carnationPink
	return (
		<View style={styles.container}>
			<Image source={{uri: uri}} style={styles.image} />
			<Text style={[styles.text, {color: color}]}>{props.open}</Text>
		</View>
	)
}

export default Open;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: 10,
		height: 10,
	},
	text: {
		fontSize: 12,
		marginLeft: 5	
	}
})