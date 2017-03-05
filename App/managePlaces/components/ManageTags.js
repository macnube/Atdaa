import React from 'React'

import {
  View,
  StyleSheet,
  ListView
} from 'react-native'

import RowCategory from './manageTagsResources/RowCategory'
import HeaderCategory from './manageTagsResources/HeaderCategory'
import RowTags from './manageTagsResources/RowTags'
import HeaderTags from './manageTagsResources/HeaderTags'
import ManageTagsFooter from './manageTagsResources/ManageTagsFooter'
import ManageCategoryNote from './manageTagsResources/ManageCategoryNote'

const ManageTags = (props) => {
  const { dataSource, layoutInfo, handleShowTags, placeInfo,
    handleBackToMap, scrollEnabled, categoryIcon, selectedTags } = props
  console.log('Props into ManageTags', props)
  var main
  const renderRow = (data) => {
    if (categoryIcon) {
      return (
        <RowTags
          layoutInfo={layoutInfo}
          icon={data}
          handleAddRemoveTag={props.handleAddRemoveTag} />
      )
    } else {
      return (
        <RowCategory
          layoutInfo={layoutInfo}
          icon={data}
          handleShowTags={handleShowTags} />
      )
    }
  }

  const renderHeader = () => {
    if (categoryIcon) {
      return (
        <HeaderTags
          layoutInfo={layoutInfo}
          icon={categoryIcon}
          placeInfo={placeInfo}
          onBack={props.handleBackToCategory} />
      )
    } else {
      return (
        <HeaderCategory
          categoryIcon={categoryIcon}
          layoutInfo={layoutInfo}
          placeInfo={placeInfo}
          onBack={props.handleAddPlace} />
        )
    }
  }

  const list = (
    <ListView
      contentContainerStyle={styles.contentContainer}
      dataSource={dataSource}
      renderRow={renderRow}
      renderHeader={renderHeader}
      scrollEnabled={scrollEnabled}
      enableEmptySections={true} />
  )
  const notes = (
    <ManageCategoryNote
      layoutInfo={layoutInfo}
      icon={categoryIcon}
      onBack={props.handleBackToCategory}
      placeInfo={placeInfo}
      handleEditNotes={props.handleEditNotes}
      handleNotesChange={props.handleNotesChange}
      handleSaveNotes={props.handleSaveNotes}
      notes={props.notes}
      editNotes={props.editNotes} />
  )
  if (categoryIcon) {
    main = categoryIcon.type === 'note' ? notes : list
  } else {
    main = list
  }
  console.log('categoryIcon is:', categoryIcon)
  return (
    <View style={styles.iconSearch}>
      {main}
      <ManageTagsFooter 
        selectedTags={selectedTags}
        categoryIcon={categoryIcon}
        handleAddPlace={props.handleAddPlace}
        handleBackToCategory={props.handleBackToCategory}
        handleBackToPlaceInfo={props.handleBackToPlaceInfo}/>
    </View>     
  )
}

export default ManageTags;

var styles = StyleSheet.create({
  iconSearch: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "rgb(250,250,250)",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconRow: {
    margin: 5,
    marginBottom: 10,
    width: 100,
    height: 80,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  sectionHeader: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 30,
  },
  textClosed: {
    color: "white",
    fontSize: 15
  },
  textOpen: {
    alignSelf: "center",
    color: "white",
    fontSize: 15
  }
})