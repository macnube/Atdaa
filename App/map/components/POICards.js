import React, { Component } from 'react'

import {
  ListView,
  Dimensions,
  StyleSheet
} from 'react-native'

import { placeTagsInCategory, getCategoryIdByTagId } from '../../utils/helpers'

import POICard from './POICard'

class POICards extends Component {

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this._totalCardWidth = 310
    this.state = {
      dataSource: this.ds.cloneWithRows(props.cardsInfo)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.cardIndex === this.props.cardIndex) {
      return false
    } else {
      console.log('nextProps are from POICards', nextProps)
      console.log('nextState are from POICards', nextState)
      return true
    }
  }

  componentDidMount () {
    if (this.props.cardIndex) {
      var xOffset = this.props.cardIndex * this._totalCardWidth // Needs to be updated whenever Card Width changes,
      this.refs['cards'].scrollTo({x: xOffset, y: 0, animated: true})
      this._offset = xOffset
    }
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('Test')
    if (prevProps.cardIndex === this.props.cardIndex) {
      console.log('Card has not changed')
    } else {
      var xOffset = this.props.cardIndex * this._totalCardWidth
      this.refs['cards'].scrollTo({x: xOffset, y: 0, animated: true})
    }
  }

  _getCardIcons (placeInfo, filters) {
    const tags = placeInfo.tags
    return filters.reduce((acc, filter) => {
      console.log('value of acc is', acc)
      if (filter.priority === 0) return acc
      else if (filter.id === placeInfo.mapIcon.id) return acc
      else if ((filter.type === 'tag' || filter.type === 'note') && tags.indexOf(filter.id) > -1) {
        var categoryId = getCategoryIdByTagId(filter.id)
        console.log('CategoryID is: ', categoryId)
        console.log('fitler is ', filter)
        console.log('acc is ', acc)
        if (acc.every((icon) => getCategoryIdByTagId(icon.id) !== categoryId)) {
          return acc.concat([filter])
        } else return acc
      } else if (filter.type === 'category' && placeTagsInCategory(tags, filter.id)) {
        if (acc.every((icon) => getCategoryIdByTagId(icon.id) !== filter.id)) {
          return acc.concat([filter])
        } else return acc
      } else {
        return acc
      }
    }, [])
  }

  renderRow (cardInfo) {
    console.log('rendering row with cardInfo', cardInfo)
    return (
      <POICard
        distance={cardInfo.distance}
        match={true}
        cardIcons={this._getCardIcons(cardInfo.placeInfo, this.props.filters)} 
        open={cardInfo.open}
        placeInfo={cardInfo.placeInfo}
        setPlaceInfo={this.props.setPlaceInfo} />
    )
  }

  render () {
    const width = Dimensions.get('window').width
    const cardWidth = 300
    const cardMargin = 5
    const totalWidth = cardWidth + cardMargin * 2
    const padding = (width - cardWidth) / 2 - cardMargin
    return (
      <ListView
        ref='cards'
        onScrollEndDrag={(event) => this.props.onScrollEnd(event)}
        contentContainerStyle={{paddingHorizontal: padding}}
        style={styles.container}
        snapToInterval={cardWidth + cardMargin * 2}
        snapToAlignment='start'
        horizontal={true}
        decelerationRate={'fast'}
        directionLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 110,
    width: Dimensions.get('window').width,
    zIndex: 10,
    marginTop: 7
  }
})

export default POICards
