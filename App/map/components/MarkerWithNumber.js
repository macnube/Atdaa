import React from 'react'

import {
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native'

const MarkerWithNumber = ({ imageURI, score, selected }) => {
	const defaultStyle = {
		height: 15 + 4 * score,
		width: 15 + 4 * score
	}
	const markerStyle = selected ? styles.selectedMarker : defaultStyle
	const uri = imageURI + 'Map'
	return (
		<View>
			<Image source={{uri: uri}} style={markerStyle} />
			<Text style={styles.text}>{score}</Text>
		</View>
	)
}

var styles = StyleSheet.create({
	selectedMarker: {
		height: 35,
		width: 35
	},
	text: {
		position: 'absolute',
		top: 1,
		right: 1,
		color: 'white',
		fontSize: 8
	}
})

export default MarkerWithNumber;