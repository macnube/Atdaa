import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native'

import { setCardScrollInfo, endCardScroll, setCardId} from '../actions'
import * as colors from '../../resources/Colors'

class MapMarker extends Component {
	constructor(props) {
		super(props);
		this.markerStyle = {}
	}

	shouldComponentUpdate(nextProps, nextState) {
		/*
		if (this._isSelected(this.props) !== this._isSelected(nextProps)) {
			return true
		} else if (this._isNext(this.props) !== this._isNext(nextProps)) {
			return true
		} else {
			return false
		}
		*/
		return true
	}

	_isSelected(props) {
		console.log("props from _isSelected", props);
		return props.place.place_id === props.map.cardId
	}

	_isNext(props) {
		console.log("props from _isNext", props);
		return props.place.place_id === props.map.nextCardId
	}


	_getStyle() {
		const selected = this._isSelected(this.props)
		const next = this._isNext(this.props)
		const { scrollPercent, scrolling } = this.props.map
		console.log("percentage from getStyle", scrollPercent);
		if (scrolling) {
			if (selected) {
				return this._getStyleWithPercentage(scrollPercent, selected)
			}
			else if (next) {
				return this._getStyleWithPercentage(scrollPercent, !next)
			} else {
				return this._getStaticStyle(selected)
			}
		}
		else {
			return this._getStaticStyle(selected)
		}
	}

  _getStyleWithPercentage(percentage, wasSelected) {
  	var shadow = {
  		shadowColor: 'rgb(0,0,0)',
			shadowOffset: {width: 1, height: 2},
			shadowRadius: 2,
			shadowOpacity: .25
  	}
  	var currentStyle = this._getStaticStyle(wasSelected)
  	var nextStyle = this._getStaticStyle(!wasSelected)
  	console.log("currentStyle is: ", currentStyle)
  	console.log("nextStyle is:", nextStyle)
  	if (wasSelected) {
  		return {
  			height: 40 - (40 - nextStyle.height) * percentage,
  			width: 40 - (40 - nextStyle.width) * percentage,
  			borderRadius: 20,
  			...shadow
  		}
  	} else {
  		return {
  			height: (40 - currentStyle.height) * percentage + currentStyle.height,
  			width: (40 - currentStyle.height) * percentage + currentStyle.width,
  			borderRadius: 20,
  			...shadow
  		}
  	}
  }

  _getStaticStyle(selected) {
  	var place = this.props.place
  	var shadow = {
  		shadowColor: 'rgb(0,0,0)',
			shadowOffset: {width: 1, height: 2},
			shadowRadius: 2,
			shadowOpacity: .25
  	}
  	if (selected) {
			return {height: 40, width: 40, borderRadius: 20, zIndex: 10, ...shadow}
		} else if (place.score === 1) {
			return {height: 20, width: 20, borderRadius: 20, zIndex: 1, ...shadow}
		} else if (place.score === 2) {
			return {height: 22, width: 22, borderRadius: 20, zIndex: 1, ...shadow}
		} else if (place.score === 3) {
			return {height: 24, width: 24, borderRadius: 20, zIndex: 1, ...shadow}
		} else if (place.score === 4) {
			return {height: 26, width: 26, borderRadius: 20, zIndex: 1, ...shadow}
		} else {
			return {height: 18, width: 18, borderRadius: 20, zIndex: 1}
		}
  }

  _getScoreStyle() {
  	const selected = this._isSelected(this.props)
		const next = this._isNext(this.props)
		const { scrollPercent, scrolling } = this.props.map
		console.log("percentage from getStyle", scrollPercent);
		if (scrolling) {
			if (selected) {
				return this._getScoreStyleWithPercentage(scrollPercent, selected)
			}
			else if (next) {
				return this._getScoreStyleWithPercentage(scrollPercent, !next)
			} else {
				return this._getScoreStaticStyle(selected)
			}
		}
		else {
			return this._getScoreStaticStyle(selected)
		}
  }

  _getScoreStaticStyle(selected) {
  	var place = this.props.place
  	if (selected) {
			return {height: 15, width: 15}
		} else {
			return {height: 12, width: 12}
		}
  }

  _getScoreStyleWithPercentage(percentage, wasSelected) {
  	var currentStyle = this._getScoreStaticStyle(wasSelected)
  	var nextStyle = this._getScoreStaticStyle(!wasSelected)
  	if (wasSelected) {
  		return {
  			height: 15 - (15 - nextStyle.height) * percentage,
  			width: 15 - (15 - nextStyle.width) * percentage,
  		}
  	} else {
  		return {
  			height: (15 - currentStyle.height) * percentage + currentStyle.height,
  			width: (15 - currentStyle.height) * percentage + currentStyle.width,
  		}
  	}
  }

  _getTextStyle() {
  	const selected = this._isSelected(this.props)
		const next = this._isNext(this.props)
		const { scrollPercent, scrolling } = this.props.map
		console.log("percentage from getStyle", scrollPercent);
		if (scrolling) {
			if (selected) {
				return this._getTextStyleWithPercentage(scrollPercent, selected)
			}
			else if (next) {
				return this._getTextStyleWithPercentage(scrollPercent, !next)
			} else {
				return this._getTextStaticStyle(selected)
			}
		}
		else {
			return this._getTextStaticStyle(selected)
		}
  }

  _getTextStaticStyle(selected) {
  	var place = this.props.place
  	if (selected) {
			return {fontSize: 10}
		} else {
			return {fontSize: 7}
		}
  }

  _getTextStyleWithPercentage(percentage, wasSelected) {
  	if (wasSelected) {
  		return {
  			height: 10 - 4 * percentage,
  		}
  	} else {
  		return {
  			height: 4 * percentage + 7,
  		}
  	}
  }		

  render() {
  	const selected = this._isSelected(this.props)
  	const next = this._isNext(this.props)
  	const { place } = this.props
  	console.log("selected from marker render", selected);
  	console.log("next from marker render", next);
  	const markerStyle = this._getStyle()
  	const scoreSize = this._getScoreStyle()
  	const textStyle = this._getTextStyle()
		const uri = place.score === 0 ? place.primaryIcon.imageURI + '_clean_inactive' : place.primaryIcon.imageURI
		
		const score = place.score > 1 
			? (
				<View style={[styles.scoreStyle, scoreSize]}>
					<Text style={[textStyle, {color: 'white'}]}>{place.score}</Text>
				</View>
			) : 
			<View />
		const name = place.score > 0
			? <Text style={styles.placeName}>{place.name}</Text>
			: <View />
  	return (
  		<View style={styles.container}>
				<View style={markerStyle}>
					<Image source={{uri: uri}} style={{flex: 1}} resizeMode='contain' />
					{score}
				</View>
				{name}
			</View>
		)
  }
}

const mapStateToProps = (state) => {
	return {
		map: state.map
	}
}


export default connect(mapStateToProps, null)(MapMarker)

/*

const MapMarker = ({ selected, place}) => {
	const scoreSize = selected ? styles.selectedScoreSize : styles.scoreSize
	const uri = place.score === 0 ? place.primaryIcon.imageURI + '_clean_inactive' : place.primaryIcon.imageURI
	var markerStyle;
	if (selected) {
		markerStyle = [styles.selectedMarker, styles.shadow]
	} else if (place.score === 1) {
		markerStyle = [styles.markerOne, styles.shadow]
	} else if (place.score === 2) {
		markerStyle = [styles.markerTwo, styles.shadow]
	} else if (place.score === 3) {
		markerStyle = [styles.markerThree, styles.shadow]
	} else if (place.score === 4) {
		markerStyle = [styles.markerFour, styles.shadow]
	} else {
		markerStyle = styles.markerInactive
	}
	const textStyle = selected ? styles.selectedText : styles.text
	const score = place.score > 1 
		? (
			<View style={[styles.scoreStyle, scoreSize]}>
				<Text style={textStyle}>{place.score}</Text>
			</View>
		) : 
		<View />
	const name = place.score > 0
		? <Text style={styles.placeName}>{place.name}</Text>
		: <View />
	return (
		<View style={styles.container}>
			<View style={markerStyle}>
				<Image source={{uri: uri}} style={{flex: 1}} resizeMode='contain' />
				{score}
			</View>
			{name}
		</View>
	)
}

*/

var styles = StyleSheet.create({
	selectedMarker: {
		height: 40,
		width: 40,
		borderRadius: 20,
	},
	scoreSize: {
		height: 12, 
		width: 12,
	}, 
	selectedScoreSize: {
		height: 15,
		width: 15,
	},
	selectedText: {
		fontSize: 9,
		color: 'white'
	},
	text: {
		fontSize: 7,
		color: 'white'
	},
	scoreStyle: {
		position: 'absolute',
		top: -2,
		right: -3,
		borderRadius: 10,
		borderColor: 'white',
		borderWidth: 1,
		backgroundColor: colors.activeIcon,
		alignItems: 'center',
		justifyContent: 'center',
	},
	markerInactive: {
		height: 18,
		width: 18,
	},
	markerOne: {
		height: 20,
		width: 20,
		borderRadius: 10,
	},
	markerTwo: {
		height: 22,
		width: 22,
		borderRadius: 11,
	},
	markerThree: {
		height: 24,
		width: 24,
		borderRadius: 12,
	},
	markerFour: {
		height: 26,
		width: 26,
		borderRadius: 13,
	},
	container: {
		height: 55,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
	},
	placeName: {
		marginLeft: 3,
	},
	shadow: {
		shadowColor: 'rgb(0,0,0)',
		shadowOffset: {width: 1, height: 2},
		shadowRadius: 2,
		shadowOpacity: .25
	}
})