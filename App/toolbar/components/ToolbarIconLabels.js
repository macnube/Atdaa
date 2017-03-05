import React from 'react'

import {
	View,
	Text,
	StyleSheet
} from 'react-native'

const ToolbarIconLabels = ({ toolbar, layoutInfo }) => {
	const labels = toolbar.map( (icon, index) => {
		const label = icon.abName || icon.name
		if (index === 4 || icon.id === 'empty') return <View key={index} style={{width: layoutInfo.icon.height}} />;
		else {
			return (
				<View key={index} style={[styles.textContainer, {width: layoutInfo.icon.height}]}>
					<Text style={styles.text}>{label}</Text>
				</View>
			)
		}
	})
	return (
		<View style={[styles.container, {width: layoutInfo.toolbar.width}]}>
			{labels}
		</View>
		

	)
}

export default ToolbarIconLabels

var styles = StyleSheet.create({
	container: {
		height: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		position: 'absolute',
		bottom: 10,
		left: 0,
	},
	textContainer: {
		alignItems: 'center',
	},
	text: {
		fontSize: 9,
		textAlign: 'center',
		backgroundColor: 'rgba(250,250,250,0.8)',
		borderRadius: 3,
		paddingHorizontal: 3,
		paddingVertical: 1,
		color: 'rgb(100,99,99)',
	}
})