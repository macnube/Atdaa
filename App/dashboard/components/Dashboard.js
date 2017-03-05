import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import Main from './Main'
import NavBar from './NavBar'
import ConfirmModal from './ConfirmModal'

import toolbar from '../../toolbar'

const { ToolbarContainer } = toolbar

const Dashboard = (props) => {
  const { layoutInfo, selectedTab, modal } = props.dashboard
  const { setSelectedTab, closeModal } = props
  console.log('rerendering Dashboard with modal', modal)
  return (
    <View style={styles.container}>
      <NavBar
        layoutInfo={layoutInfo}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isVisible={props.navVisible}
        handleLogout={props.handleLogout} />
      <Main cardId={props.cardId} selectedTab={selectedTab} placeInfo={props.placeInfo} />
      <ToolbarContainer />
      <ConfirmModal
        visible={modal.visible}
        text={modal.text}
        onYes={modal.onYes}
        yesText={modal.yesText}
        uri={modal.uri}
        close={closeModal}
      />
    </View>
  )
}

export default Dashboard

Dashboard.propTypes = {
  dashboard: React.PropTypes.object.isRequired,
  updateToolbarIcon: React.PropTypes.func.isRequired,
  setSelectedTab: React.PropTypes.func.isRequired,
  navVisible: React.PropTypes.bool,
  newIcon: React.PropTypes.object,
  clearNewIcon: React.PropTypes.func.isRequired
}

Dashboard.defaultProps = {
  navVisible: true,
  newIcon: null
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
