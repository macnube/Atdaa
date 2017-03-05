import React from 'react'

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

const TagsSelectedBar = ({ selectedTags }) => {
	if (selectedTags.length === 0) return <View />;
	else {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>You have tagged {selectedTags.length} icons</Text>
			</View>
		)
	}
	
}

export default TagsSelectedBar;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		backgroundColor: 'rgb(74,144,226)'
	},
	text: {
		fontSize: 14,
		color: 'white',
	}
})