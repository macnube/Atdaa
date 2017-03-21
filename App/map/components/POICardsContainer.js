import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LayoutAnimation } from 'react-native'
import { getDistanceFromLatLonInKm, placeOpen } from '../../utils/helpers'
import placeSearch from '../../placeSearch'
import toolbar from '../../toolbar'
import POICards from './POICards'
import POICard from './POICard'
import SinglePOICard from './SinglePOICard'

class POICardsContainer extends Component {
  constructor (props) {
    super(props)
    this._matchingPlaces = this.props.matchingPlaces
    this._totalCardWidth = this.props.smallScreen ? 295 : 310 // Update this if the card width ever changes, here and in POICards & POICard
    this.state = {
      cardIndex: this._matchingPlaces.ids.indexOf(this.props.cardId),
      matched: this._isMatched(this.props.matchingPlaces.ids, this.props.cardId)
    }
  }

  componentWillMount () {
    console.log('POICardsContainer will mount')
  }

  componentWillUnmount () {
    console.log('POICardsContainer will unmount')
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.matched === false && this.state.matched === false) return true
    if (nextState.cardIndex === this.state.cardIndex) {
      console.log('Not updating POICardsContainer')
      return false
    } else return true
  }

  componentWillReceiveProps (nextProps, nextState) {
    this.setState({
      cardIndex: this._matchingPlaces.ids.indexOf(nextProps.cardId),
      matched: this._isMatched(this._matchingPlaces.ids, nextProps.cardId)
    })
  }

  _onCardScrollEnd (event) {
    var nextCardId
    var currentOffset = this.state.cardIndex * this._totalCardWidth
    var nextOffset = event.nativeEvent.contentOffset.x
    const matchingPlacesIds = this._matchingPlaces.ids
    if (currentOffset > nextOffset && this.state.cardIndex !== 0) {
      nextCardId = matchingPlacesIds[this.state.cardIndex - 1]
    } else if (currentOffset < nextOffset && this.state.cardIndex !== matchingPlacesIds.length - 1) {
      nextCardId = matchingPlacesIds[this.state.cardIndex + 1]
    } else {
      nextCardId = matchingPlacesIds[this.state.cardIndex]
    }
    this.props.moveMapToPlace(this._matchingPlaces.placeById[nextCardId])
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.props.setCardId(nextCardId)
  }

  _isMatched (matchingPlacesIds, cardId) {
    return matchingPlacesIds.indexOf(cardId) > -1
  }

  _getCard (cardId, index) {
    const { userLocation, setPlaceInfo, myPlaces } = this.props
    const placeInfo = myPlaces.placeById[cardId]
    const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude,
        placeInfo.latlng.latitude, placeInfo.latlng.longitude)
    return (
      <POICard
        key={index}
        distance={distance}
        match={index > -1}
        open={placeOpen(placeInfo)}
        placeInfo={placeInfo}
        setPlaceInfo={setPlaceInfo}
        smallScreen={this.props.smallScreen} />
    )
  }

  _getSingleCard (POICardId) {
    return (
      <SinglePOICard>
        {this._getCard(POICardId, -1)}
      </SinglePOICard>
    )
  }

  _getCardInfo (cardId, index) {
    const { userLocation } = this.props
    const placeInfo = this._matchingPlaces.placeById[cardId]
    const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude,
        placeInfo.latlng.latitude, placeInfo.latlng.longitude)
    const open = placeOpen(placeInfo)
    return {
      placeInfo: placeInfo,
      distance: distance,
      open: open
    }
  }

  _getCardsInfo () {
    return this._matchingPlaces.ids.map((id, index) => {
      return this._getCardInfo(id, index)
    })
  }

  render () {
    if (this.state.matched) {
      return (
        <POICards
          cardsInfo={this._getCardsInfo()}
          setPlaceInfo={this.props.setPlaceInfo}
          cardIndex={this.state.cardIndex}
          onScrollEnd={this._onCardScrollEnd.bind(this)}
          filters={this.props.filters}
          smallScreen={this.props.smallScreen} />
      )
    } else {
      return this._getSingleCard(this.props.cardId)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    myPlaces: state.myPlaces,
    filters: toolbar.selectors.getFilters(state.toolbar)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaceInfo (place) {
      dispatch(placeSearch.actions.setPlaceInfo(place))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(POICardsContainer)
