import React from 'React'

import {
  View,
  StyleSheet,
  ListView
} from 'react-native'

import IconSearchRow from './IconSearchRow'
import IconSearchHeader from './IconSearchHeader'
import IconTagSearchRow from './IconTagSearchRow'
import IconTagSearchHeader from './IconTagSearchHeader'

const IconSearch = (props) => {
  const { dataSource, layoutInfo, handleShowTags, handleBackToMap,
    handleNewIcon, scrollEnabled, categoryIcon } = props
  console.log('Props into IconSearch', props)

  const renderRow = (data) => {
    if (categoryIcon) {
      return (
        <IconTagSearchRow
          layoutInfo={layoutInfo}
          icon={data}
          handleNewIcon={handleNewIcon}
          handleUpdateToolbar={props.handleUpdateToolbar} />
      )
    } else {
      return (
        <IconSearchRow
          layoutInfo={layoutInfo}
          icon={data}
          handleNewIcon={handleNewIcon}
          handleShowTags={handleShowTags}
          handleUpdateToolbar={props.handleUpdateToolbar}
        />
      )
    }
  }

  const renderHeader = () => {
    if (categoryIcon) {
      return (
        <IconTagSearchHeader
          layoutInfo={layoutInfo}
          icon={categoryIcon}
          onBack={props.handleBackToCategory} />
      )
    } else {
      return (
        <IconSearchHeader 
          layoutInfo={layoutInfo}
          onBack={props.handleBackToMap} />
        )
    }
  }

  return (
    <View style={styles.iconSearch}>
      <ListView
        style={{flex: 1, marginBottom: layoutInfo.toolbar.height}}
        contentContainerStyle={styles.contentContainer}
        dataSource={dataSource}
        renderRow={renderRow}
        renderHeader={renderHeader}
        scrollEnabled={scrollEnabled}
        enableEmptySections={true} />
    </View>     
  )
}

export default IconSearch

IconSearch.propTypes = {
  dataSource: React.PropTypes.object.isRequired,
  categoryIcon: React.PropTypes.object,
  layoutInfo: React.PropTypes.object.isRequired,
  handleShowTags: React.PropTypes.func.isRequired,
  handleBackToMap: React.PropTypes.func.isRequired,
  handleNewIcon: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
  iconSearch: {
    flex: 1,
    backgroundColor: 'rgb(250,250,250)',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconRow: {
    margin: 5,
    marginBottom: 10,
    width: 100,
    height: 80,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sectionHeader: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 30,
  },
  textClosed: {
    color: 'white',
    fontSize: 15
  },
  textOpen: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15
  }
})