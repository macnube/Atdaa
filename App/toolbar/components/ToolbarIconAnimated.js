import React, { Component } from 'react'

import {
	View,
	PanResponder,
	Animated,
	TouchableWithoutFeedback,
	Image,

} from 'react-native'

var PropTypes = React.PropTypes;

import { inDropZone } from '../../utils/helpers'
import Icon from '../../shared/Icon'


class ToolbarIconAnimated extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pan: new Animated.ValueXY(),
		};
		this.inTrash = false;
		this.startTime = 0;
		this.endTime = 0;
		this.trashToggled = false;
		this._containerStyles = {};
		this.container = (null : ?{ setNativeProps(props: Object): void });
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => {
				if (this.props.icon.id === 'empty') {
					this.props.handleSelect(this.props.icon.priority)
					return false
				} else {
					this.startTime = Date.now();
					this._iconInfo = this._getIconInfo();
					this._trashZone = this._iconInfo.dropZones[4]
					this._containerStyles.style.zIndex = 100;
					this._updateNativeStyles();
					return true;
				}
			},
			onPanResponderMove: this._handlePanResponderMove.bind(this),
			onPanResponderRelease: this._handlePanResponderEnd.bind(this)
					
			});

		this._containerStyles = {
			style: {
				zIndex: 5
			}
		}
	}

	_updateNativeStyles() {
    this.container && this.container.setNativeProps(this._containerStyles);
  }

	_checkDropZone(gesture) {
		var icon = this._getIconInfo();
		icon.dropZones.forEach((zone, index) => {
			if (inDropZone(gesture, zone, this.props.layoutInfo, index)) {
				this.props.onDrop(icon, index);
			} else {
				this.snapBack()
			}
		});
	}

	_handlePanResponderMove(e, gesture) {
		this.moveTime = Date.now();
		var delay = this.moveTime - this.startTime > 800
		if (!this.trashToggled && delay) {	
			this.props.toggleTrash();
			this.trashToggled = true;
		}
		if (inDropZone(gesture, this._trashZone, this.props.layoutInfo, 4)) {
			if (!this.inTrash) {
				Animated.spring(
					this.state.pan,
					{toValue: {x: this._trashZone.xmin - this._iconInfo.left, y: 0}}
				).start();
			}
			this.inTrash = true;
		} 
		else {
			this.inTrash = false;
			return Animated.event([null,{
				dx : this.state.pan.x,
				dy : this.state.pan.y
			}])(e, gesture)
		}
	}

	_handlePanResponderEnd(e, gesture) {
		this.endTime = Date.now();
		if (this.endTime - this.startTime < 800) {
			this.snapBack()
			this.props.handleSelect(this.props.icon.priority)
			if (this.trashToggled) {
				this.props.toggleTrash();
				this.trashToggled = false;
			}
		} else {
			if (this.trashToggled) {
				this.props.toggleTrash();
				this.trashToggled = false;
			}
			this._checkDropZone(gesture);
			this._containerStyles.style.zIndex = 5;
			this._updateNativeStyles();
		}
	}

	snapBack() {
		Animated.spring(
       this.state.pan,         // Auto-multiplexed
       {toValue: {x: 0, y: 0}} // Back to zero
     ).start();
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
			<View 
				style={this.styleDraggableContainer()}
				ref={(container) => {
					this.container = container;
				}}>
					<Icon
						icon={this.props.icon}
						shadow={this.props.shadow}
						selected={this.props.selected}
						style={this.styleImage()}
						animatedStyle={this.state.pan.getLayout()}
						panHandlers={this.panResponder.panHandlers} />
			</View>
			
		)
	}
}

export default ToolbarIconAnimated;

