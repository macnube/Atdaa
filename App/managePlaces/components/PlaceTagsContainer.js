import React, { Component } from 'react'

import { getCategoryTagCountArray } from '../../utils/helpers'

import PlaceTags from './PlaceTags'

class PlaceTagsContainer extends Component {
  constructor (props) {
    super(props)
    console.log('Props from PlaceTagsContainer', props)
    const data = getCategoryTagCountArray(this.props.place.tags)
    this.state = {
      placeCategories: data
    }
  }

  render () {
    return (
      <PlaceTags
        placeCategories={this.state.placeCategories}
        categoryNotes={this.props.place.categoryNotes}
        handleEditCategory={this.props.handleEditCategory} />
    )
  }
}

PlaceTagsContainer.propTypes = {
  place: React.PropTypes.object.isRequired
}

export default PlaceTagsContainer
