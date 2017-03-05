import React, { Component } from 'react';

import {
	View,
	PanResponder,
	Animated,
	TouchableHighlight,
	Image,

} from 'react-native'

var PropTypes = React.PropTypes;

import Icon from '../../shared/Icon';


export default class SearchIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pan: new Animated.ValueXY(),
		};
	}

	componentWillMount() {
		console.log("Creating new draggable icon with props", this.props);
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: () => {
				return true
			},
			onPanResponderMove: Animated.event([null,{
				dx : this.state.pan.x,
				dy : this.state.pan.y
			}]),
			onPanResponderRelease: this._handlePanResponderEnd.bind(this)
			});
	}

	_handlePanResponderEnd(e, gesture) {
		this._checkDropZone(gesture);
		this.props.clearNewIcon();
	}

	_checkDropZone(gesture) {
		this.props.layoutInfo.dropZones.forEach((zone, index) => {
			var ymin = zone.ymin + this.props.layoutInfo.toolbar.yStart;
			var ymax = zone.ymax + this.props.layoutInfo.toolbar.yStart;
			if (
					(gesture.moveX > zone.xmin && gesture.moveX < zone.xmax) && 
					(gesture.moveY > ymin && gesture.moveY < ymax)
				) {
				if (index === 4) this.props.clearNewIcon()
				else this.props.updateToolbarIcon(this.props.icon.info.id, index)
			}
		});
	}

	styleDraggableContainer() {
		return {
			position: 'absolute',
			top: this.props.icon.top,
			left: this.props.icon.left,
			zIndex: 5
		}
	}

	styleImage() {
		return {
			height: this.props.layoutInfo.icon.height,
			width: this.props.layoutInfo.icon.height,
			alignSelf: 'center',
		}
	}

	render() {
		console.log("Moving draggable icon to new location");
		return (
			<View
				style={this.styleDraggableContainer()}
				ref={(container) => {
					this.container = container;
				}}	>
				<Icon
					icon={this.props.icon.info}
					style={this.styleImage()}
					shadow={true}
					animatedStyle={this.state.pan.getLayout()}
					panHandlers={this.panResponder.panHandlers} />
				
			</View>
		)
	}
}

SearchIcon.propTypes = {
	icon: React.PropTypes.object.isRequired,
	layoutInfo: React.PropTypes.object.isRequired,
	updateToolbarIcon: React.PropTypes.func.isRequired,
	clearNewIcon: React.PropTypes.func.isRequired,
}
