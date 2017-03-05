import React from 'react'

import {
	View,
	Text,
	TouchableWithoutFeedback,
	StyleSheet
} from 'react-native'

const ToolbarIconContainer = (props) => {
	const extraIconContainerStyles = {
		height: props.layoutInfo.iconContainer.height,
		width: props.layoutInfo.iconContainer.height,
		borderRadius: props.layoutInfo.iconContainer.height * .5,
	}
	if (props.icon.priority === 4) {
		iconContainerStyle = extraIconContainerStyles
	} else {
		iconContainerStyle = [styles.iconContainer, extraIconContainerStyles]
	}
	const selected = props.selected ? styles.selected : {}
	return (
		<TouchableWithoutFeedback
			onPress={() => props.handleSelect(props.icon.priority)}>
			<View style={[iconContainerStyle, selected]}>
			</View>
		</TouchableWithoutFeedback>
	)
}

var styles = StyleSheet.create({
	iconContainer: {
		flexDirection: 'row',
		opacity: .4,
		backgroundColor: 'rgb(255,255,255)',
	},
	selected: {
		borderWidth: 2,

	}
})

export default ToolbarIconContainer;

ToolbarIconContainer.proptypes = {
	layoutInfo: React.PropTypes.object.isRequired,
	icon: React.PropTypes.object.isRequired
}