import React, { Component } from 'React'
import { connect } from 'react-redux'

import { ListView, Keyboard } from 'react-native'

import dashboard from '../../dashboard'
import login from '../../login'
import { addPlace, editPlaceCategory, clearPlaceCategory, deletePlace } from '../actions'
import ManageTags from './ManageTags'
import api from '../../utils/api'
import * as helpers from '../../utils/helpers'

class ManageTagsContainer extends Component {

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    var iconData = this._getData(this.props.placeInfo.tags)
    this._data = []
    this.state = {
      dataSource: this.ds.cloneWithRows(iconData),
      categoryIcon: this.props.myPlaces.editPlaceCategory,
      scrollEnabled: true,
      selectedTags: [...this.props.placeInfo.tags],
      categoryNotes: this.props.placeInfo.categoryNotes || {},
      notes: '',
      noteHeight: 0,
      keyboard: false
    }
  }

  componentWillMount () {
    console.log('ManageTagsContainer mounted')
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    if (this.props.myPlaces.editPlaceCategory) {
      this.handleShowTags(this.props.myPlaces.editPlaceCategory)
    }
  }

  componentWillUnmount () {
    console.log('ManageTagsContainer unmounted')
    this.props.clearPlaceCategory()
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow (e) {
    this.setState({
      keyboard: true
    })
  }

  keyboardDidHide (e) {
    this.setState({
      keyboard: false
    })
  }

  handleDeletePlace () {
    const currentTime = new Date().getTime() / 1000
    api.updateMyPlaces(this.props.userId, this.props.myPlaces, this.props.placeInfo, currentTime, true)
    this.props.deletePlace(this.props.placeInfo.place_id, currentTime)
  }

  handleAddPlace () {
    console.log('handleAddPlace from ManageTagsContainer, place: ', this.props.placeInfo.name)
    if (this.state.selectedTags.length > 0) {
      const newPlace = {
        ...this.props.placeInfo,
        isNew: false,
        primaryIcon: helpers.getPrimaryIcon(this.state.selectedTags),
        tags: this.state.selectedTags,
        categoryNotes: this.state.categoryNotes
      }
      const currentTime = new Date().getTime() / 1000
      api.updateMyPlaces(this.props.userId, this.props.myPlaces, newPlace, currentTime)
      this.props.addPlace(newPlace, currentTime)
    } else {
      this.handleDeletePlace()
    }
  }

  handleNotesChange (text) {
    this.setState({
      notes: text
    })
  }

  handleNoteSizeChange (height) {
    this.setState({
      noteHeight: height
    })
  }

  handleSaveNotes () {
    console.log('handleSaveNotes from ManageTagsContainer')
    var newCategoryNotes = {...this.state.categoryNotes, [this.state.categoryIcon.id]: this.state.notes}
    var newSelectedTags = [...this.state.selectedTags]
    if (!(this.state.categoryIcon.id in this.state.categoryNotes) && this.state.notes !== '') {
      newSelectedTags.push(this.state.categoryIcon.id)
    } else if (this.state.categoryIcon.id in this.state.categoryNotes && this.state.notes === '') {
      delete newCategoryNotes[this.state.categoryIcon.id]
      var index = newSelectedTags.indexOf(this.state.categoryIcon.id)
      newSelectedTags = [...newSelectedTags.slice(0, index), ...newSelectedTags.slice(index + 1)]
    }
    var iconData = this._getData(newSelectedTags)
    this.setState({
      dataSource: this.ds.cloneWithRows(iconData),
      selectedTags: newSelectedTags,
      categoryIcon: null,
      categoryNotes: newCategoryNotes
    })
  }

  handleBackToCategory () {
    console.log('handleBackToCategory from ManageTagsContainer')
    var iconData = this._getData(this.state.selectedTags)
    this.setState({
      dataSource: this.ds.cloneWithRows(iconData),
      categoryIcon: null
    })
  }

  handleAddRemoveTag (tag) {
    console.log('handleAddRemoveTag from ManageTagsContainer', tag)
    var selectedTags = this.state.selectedTags
    const index = selectedTags.indexOf(tag.id)
    if (index === -1) {
      selectedTags = [...selectedTags, tag.id]
    } else {
      selectedTags = [...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)]
    }
    this.setState({
      selectedTags: selectedTags,
      dataSource: this.ds.cloneWithRows(this._setSelectedTags(this._data, this.state.categoryIcon, selectedTags))
    })
  }

  handleShowTags (category) {
    console.log('handleShowTags from ManageTagsContainer with category icon as:', category)
    if (category.type === 'note') {
      var notes = ''
      if (category.id in this.state.categoryNotes) {
        notes = this.state.categoryNotes[category.id]
      }
      this.setState({
        categoryIcon: category,
        notes: notes
      })
    } else {
      this._data = this._setSelectedTags(helpers.getTagsByCategoryId(category.id),
      category, this.state.selectedTags)
      console.log('NewData from handleShowTags', this._data)
      this.setState({
        dataSource: this.ds.cloneWithRows(this._data),
        categoryIcon: category
      })
    }
  }

  _setSelectedTags (tagData, categoryIcon, selectedTags) {
    return tagData.map((tag) => {
      if (selectedTags.indexOf(tag.id) > -1) {
        return {...tag, iconColor: categoryIcon.iconColor, selected: true}
      } else return {...tag, iconColor: categoryIcon.iconColor, selected: false}
    })
  }

  _getData (tags) {
    var categories = helpers.getAllCategories()
    var placeCategories = tags.map((tag) => helpers.getCategoryIdByTagId(tag))
    return categories.map((category) => {
      if (placeCategories.indexOf(category.id) > -1) {
        return category
      } else {
        return {
          ...category,
          imageURI: category.imageURI + '_inactive'
        }
      }
    })
  }

  render () {
    console.log('Rerendering ManageTagsContainer with props', this.props)
    return (
      <ManageTags
        dataSource={this.state.dataSource}
        placeInfo={this.props.placeInfo}
        categoryIcon={this.state.categoryIcon}
        layoutInfo={this.props.layoutInfo}
        scrollEnabled={this.state.scrollEnabled}
        handleShowTags={this.handleShowTags.bind(this)}
        handleAddRemoveTag={this.handleAddRemoveTag.bind(this)}
        handleAddPlace={this.handleAddPlace.bind(this)}
        handleBackToCategory={this.handleBackToCategory.bind(this)}
        handleBackToPlaceInfo={() => this.props.setSelectedTab('placeInfo')}
        handleBackToMap={() => this.props.setSelectedTab('map')}
        handleNotesChange={this.handleNotesChange.bind(this)}
        handleNoteSizeChange={this.handleNoteSizeChange.bind(this)}
        handleSaveNotes={this.handleSaveNotes.bind(this)}
        selectedTags={this.state.selectedTags}
        notes={this.state.notes}
        noteHeight={this.state.noteHeight}
        keyboard={this.state.keyboard} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard),
    placeInfo: state.placeInfo,
    myPlaces: state.myPlaces,
    userId: login.selectors.getUserId(state.user)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlace (place, currentTime) {
      dispatch(addPlace(place, currentTime))
    },
    deletePlace (placeId, currentTime) {
      dispatch(deletePlace(placeId, currentTime))
    },
    setSelectedTab (tab) {
      dispatch(dashboard.actions.setSelectedTab(tab))
    },
    editPlaceCategory (category) {
      dispatch(editPlaceCategory(category))
    },
    clearPlaceCategory () {
      dispatch(clearPlaceCategory())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTagsContainer)
