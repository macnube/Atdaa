import React, { Component } from 'React'
import { connect } from 'react-redux'

import { ListView } from 'react-native'
import dashboard from '../../dashboard'
import toolbar from '../../toolbar'
import { compareToolbars, getAllCategories, getIconById, getTagsByCategoryId, getCategoryIdByTagId, isInToolbar } from '../../utils/helpers'
import IconSearch from './IconSearch'

class IconSearchContainer extends Component {

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    var data, categoryIcon, categoryId
    if (this.props.iconSelected.id === 'empty' || this.props.iconSelected.type === 'note') {
      data = this._getData(this.props.toolbar)
      categoryIcon = null
    } else {
      categoryId = getCategoryIdByTagId(this.props.iconSelected.id)
      categoryIcon = getIconById(categoryId)
      data = this._getTagData([categoryIcon, ...getTagsByCategoryId(categoryIcon.id)], this.props.toolbar)
    }
    this.state = {
      dataSource: this.ds.cloneWithRows(data),
      categoryIcon: categoryIcon,
      scrollEnabled: true
    }
  }

  componentWillMount () {
    console.log('IconSearchContainer will mount')
  }

  componentWillUnmount () {
    console.log('IconSearchContainer will unmount')
  }

  componentWillReceiveProps (nextProps) {
    var data
    var toolbarsEqual = compareToolbars(this.props.toolbar, nextProps.toolbar)
    if (nextProps.iconSelected.id === 'empty' || nextProps.iconSelected.type === 'note') {
      console.log('here')
      data = this._getData(nextProps.toolbar)
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        categoryIcon: null
      })
    } else if (nextProps.iconSelected.id !== 'empty') {
      var categoryId = getCategoryIdByTagId(nextProps.iconSelected.id)
      var categoryIcon = getIconById(categoryId)
      data = this._getTagData([categoryIcon, ...getTagsByCategoryId(categoryIcon.id)], nextProps.toolbar)
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        categoryIcon: categoryIcon
      })
    }
  }

  handleBackToCategory () {
    console.log('Moving back to category view of IconSearch')
    var iconData = this._getData(this.props.toolbar, null)
    this.setState({
      dataSource: this.ds.cloneWithRows(iconData),
      categoryIcon: null
    })
  }

  handleShowTags (icon) {
    console.log('Showing tags of category: ', icon.id)
    var categoryIcon = {
      ...icon,
      imageURI: icon.imageURI.split('_')[0]
    }
    var newData = this._getTagData([categoryIcon, ...getTagsByCategoryId(icon.id)], this.props.toolbar)
    this.setState({
      dataSource: this.ds.cloneWithRows(newData),
      categoryIcon: categoryIcon
    })
  }

  handleUpdateToolbar (icon) {
    console.log('Updating toolbar with icon', icon.id)
    if (!isInToolbar(icon, this.props.toolbar)) {
      this.props.updateToolbarIcon(icon.id, this.props.toolbar, this.props.iconSelected.priority)
    }
  }

  _getData (toolbar) {
    console.log('Getting toolbar _getData from IconSearchContainer')
    var categories = getAllCategories()
    var filterCategories = toolbar.map((filter) => getCategoryIdByTagId(filter.id))
    return categories.map((category) => {
      if (filterCategories.indexOf(category.id) > -1) {
        return category
      } else {
        return {
          ...category,
          imageURI: category.imageURI + '_inactive'
        }
      }
    })
  }

  _getTagData (data, toolbar) {
    console.log('getting toolbar _getTagData from IconSearchContainer')
    var toolbarIds = toolbar.map((toolbarIcon) => toolbarIcon.id)
    const color = data[0].iconColor
    return data.map((icon, index) => {
      var selected = false
      if (toolbarIds.indexOf(icon.id) > -1) {
        selected = true
      }
      return {
        ...icon,
        selected: selected,
        index: index,
        iconColor: color
      }
    })
  }

  render () {
    console.log('Rendering IconSearch')
    return (
      <IconSearch
        dataSource={this.state.dataSource}
        categoryIcon={this.state.categoryIcon}
        layoutInfo={this.props.layoutInfo}
        scrollEnabled={this.state.scrollEnabled}
        handleShowTags={this.handleShowTags.bind(this)}
        handleBackToCategory={this.handleBackToCategory.bind(this)}
        handleBackToMap={() => this.props.setSelectedTab('map')}
        handleUpdateToolbar={this.handleUpdateToolbar.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard),
    toolbar: toolbar.selectors.getFilters(state.toolbar),
    iconSelected: state.toolbar.iconSelected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTab (tab) {
      dispatch(dashboard.actions.setSelectedTab(tab))
    },
    updateToolbarIcon (icon, bar, index) {
      dispatch(toolbar.actions.updateToolbarIcon(icon, bar, index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconSearchContainer)
