import React, { Component } from 'react';

import {
	View,
	PanResponder,
	TouchableWithoutFeedback,
	Image,

} from 'react-native'

var PropTypes = React.PropTypes;

import * as Animatable from 'react-native-animatable';
import { inDropZone } from '../../Utils/helpers'
import Icon from '../../shared/Icon';


class ToolbarIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pan: {},
		};
		this.startTime = 0;
		this.endTime = 0;
		this.trashToggled = false;
		this._containerStyles = {};
		this.container = (null : ?{ setNativeProps(props: Object): void });
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => {
				this.startTime = Date.now();
				return true;
			},
			onPanResponderMove: this._handlePanResponderMove.bind(this),
			onPanResponderRelease: this._handlePanResponderEnd.bind(this)
					
			});

		this._containerStyles = {
			style: {
				position: 'absolute',
				top: this._top,
				left: this._left,
				zIndex: 5
			}
		}
	}

	componentDidMount() {
		this._updateNativeStyles();
	}

	_updateNativeStyles() {
    this.container && this.container.setNativeProps(this._containerStyles);
  }

	_checkDropZone(gesture) {
		var icon = this._getIconInfo();
		icon.dropZones.forEach((zone, index) => {
			if (inDropZone(gesture, zone, this.props.layoutInfo, index)) {
				console.log("DROPZONE");
				this.props.onDrop(icon, index);
			}
		});
	}

	_handlePanResponderMove(e, gesture) {	
		if (!this.trashToggled) {
			this.props.toggleTrash();
			this.trashToggled = true;
		}
		this._containerStyles.style.zIndex = 100;
		var icon = this._getIconInfo();
		this._containerStyles.style.left = icon.left + gesture.dx;
		this._containerStyles.style.top = icon.top + gesture.dy;
		this._updateNativeStyles();
	}

	_handlePanResponderEnd(e, gesture) {
		this.endTime = Date.now();
		if (this.endTime - this.startTime < 300) {
			console.log("Time Duration", this.endTime - this.startTime)
			this.props.handleSelect(this.props.icon.priority)
			this._resetContainerStyles();
		} else {
			if (this.trashToggled) {
				this.props.toggleTrash();
				this.trashToggled = false;
			}
			this._resetContainerStyles();
			this._checkDropZone(gesture);
			this._containerStyles.style.zIndex = 5;
			this._updateNativeStyles();
		}
		
	}

	_resetContainerStyles() {
		var icon = this._getIconInfo();
		this._containerStyles.style.left = icon.left;
		this._containerStyles.style.top = icon.top;
		this._updateNativeStyles();
	}

	_getIconInfo() {
		var priority = this.props.icon.priority;
		var dropZones = this.props.layoutInfo.dropZones;
		return {
			priority: priority,
			dropZones: dropZones,
			left: dropZones[priority].xmin,
			top: dropZones[priority].ymin
		}
	}

	styleDraggableContainer() {
		var icon = this._getIconInfo();
		return {
			position: 'absolute',
			top: icon.top,
			left: icon.left,
			zIndex: 5
		}
	}

	styleImage() {
		return {
			height: this.props.layoutInfo.icon.height,
			width: this.props.layoutInfo.icon.height,
			alignSelf: 'center'
		}
	}

	render() {
		return (
			<Animatable.View 
				style={this.styleDraggableContainer()}
				ref={(container) => {
					this.container = container;
				}}>
					<Icon
						icon={this.props.icon}
						shadow={this.props.shadow}
						selected={this.props.selected}
						style={this.styleImage()}
						panHandlers={this.panResponder.panHandlers} />
			</Animatable.View>
			
		)
	}
}

export default ToolbarIcon;

