import React, { Component } from 'React'
import { connect } from 'react-redux'

import { ListView } from 'react-native'
import dashboard from '../../dashboard'
import toolbar from '../../toolbar'
import { setNewIcon } from '../actions'
import { compareToolbars, getAllCategories, getIconById, getTagsByCategoryId, getCategoryIdByTagId } from '../../utils/helpers'
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

  componentWillReceiveProps (nextProps) {
    var data
    console.log('NextProps are', nextProps)
    var toolbarsEqual = compareToolbars(this.props.toolbar, nextProps.toolbar)
    if (!this.state.categoryIcon || (nextProps.iconSelected.id === 'empty' || nextProps.iconSelected.type === 'note')) {
      console.log('setting categoryIcon to null')
      data = this._getData(nextProps.toolbar)
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        categoryIcon: null
      })
    } else if (!toolbarsEqual && nextProps.iconSelected.id !== 'empty') {
      console.log('toolbars are not equal!!!')
      console.log('value of categoryIcon', this.state.categoryIcon)
      data = this._getTagData([this.state.categoryIcon,
        ...getTagsByCategoryId(this.state.categoryIcon.id)], nextProps.toolbar)
      this.setState({
        dataSource: this.ds.cloneWithRows(data)
      })
    }
  }

  handleBackToCategory () {
    var iconData = this._getData(this.props.toolbar, null)
    this.setState({
      dataSource: this.ds.cloneWithRows(iconData),
      categoryIcon: null
    })
  }

  handleShowTags (icon) {
    console.log('category icon is:', icon)
    var categoryIcon = {
      ...icon,
      imageURI: icon.imageURI.split('_')[0]
    }
    console.log('categoryIcon is:', categoryIcon)
    var newData = this._getTagData([categoryIcon, ...getTagsByCategoryId(icon.id)], this.props.toolbar)
    console.log('NewData from handleShowTags', newData)
    this.setState({
      dataSource: this.ds.cloneWithRows(newData),
      categoryIcon: categoryIcon
    })
  }

  handleNewIcon (icon, e) {
    icon = {
      ...icon,
      imageURI: icon.imageURI.split('_')[0]
    }
    var newIcon = {
      info: icon,
      left: e.nativeEvent.pageX,
      top: e.nativeEvent.pageY
    }
    this.props.setNewIcon(newIcon)
  }

  handleUpdateToolbar (icon) {
    console.log('iconSelected', this.props.iconSelected.priority)
    this.props.updateToolbarIcon(icon.id, this.props.toolbar, this.props.iconSelected.priority)
  }

  _getData (toolbar) {
    var categories = getAllCategories()
    var filterCategories = toolbar.map((filter) => getCategoryIdByTagId(filter.id))
    console.log('categories are: ', categories)
    console.log('filterCategories are: ', filterCategories)
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
    console.log('toolbar from getTagData', toolbar)
    var toolbarIds = toolbar.map((toolbarIcon) => toolbarIcon.id)
    const color = data[0].iconColor
    return data.map((icon, index) => {
      console.log('icon from data in getTagData', icon)
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
    console.log('Rerendering IconSearchContainer with props', this.props)
    return (
      <IconSearch
        dataSource={this.state.dataSource}
        categoryIcon={this.state.categoryIcon}
        layoutInfo={this.props.layoutInfo}
        scrollEnabled={this.state.scrollEnabled}
        handleNewIcon={this.handleNewIcon.bind(this)}
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
    setNewIcon (icon) {
      dispatch(setNewIcon(icon))
    },
    setSelectedTab (tab) {
      dispatch(dashboard.actions.setSelectedTab(tab))
    },
    updateToolbarIcon (icon, bar, index) {
      dispatch(toolbar.actions.updateToolbarIcon(icon, bar, index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconSearchContainer)