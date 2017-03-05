import { Dimensions } from 'react-native'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const iphone5 = {
	toolbar: {
		height: 100,
		paddingTop: 10, 
		paddingLabel: 8
		iconSpacing: 14,
		locateMePadding: 10,
	},
	toolbarIcon: {
		height: 50
	},
	mapNavBar: {
		height: 58,
		atdaaWidth: 51,
		paddingHorizontal: 17,
	},
	filterSearch: {
		navBarPadding: 22,
	},
	filterIcon: {
		height: 70,
		horizontalSpacing: 24,
		verticalSpacing: 20,
		paddingLabel: 8,
	},
	POICard: {
		height: 95,
		width: 270,
		paddingTop: 10,
		margin: 10,
	}
}