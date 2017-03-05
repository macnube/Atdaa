import React from 'react'

import {
	View,
	StyleSheet,
	Dimensions,
} from 'react-native'

//Import padding from 

const SinglePOICard = (props) => {
	return (
		<View style={styles.container}>
			{props.children}
		</View>
	)
}

export default SinglePOICard

var styles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: 110,
		width: Dimensions.get('window').width,
		zIndex: 10,
		marginTop: 7,
		alignItems: 'center',
	}
})