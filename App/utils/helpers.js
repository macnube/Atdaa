import {
  Dimensions
} from 'react-native'
import _ from 'lodash'

import Icons from '../resources/Icons'
import IconTags from '../resources/IconTags'

// Icon and IconTag helpers

export const getAllIcons = () => {
  var result = []
  for (var key in Icons) {
    result.push(Icons[key])
  }
  return result
}

export const getIconById = (id) => {
  return Icons[id]
}

export const getTagIdsByCategoryId = (categoryId) => {
  return IconTags[categoryId]
}

export const getTagsByCategoryId = (categoryId) => {
  return getTagIdsByCategoryId(categoryId).map((tagId) => {
    return getIconById(tagId)
  }).sort((a, b) => {
    if (a.name < b.name) return -1
    else return 1
  })
}

export const getCategoryIdByTagId = (tagId) => {
  for (var key in IconTags) {
    if (IconTags[key].indexOf(tagId) > -1) return key
    else if (key === tagId) return tagId
  }
}

export const getTagColor = (tagId) => {
  var categoryId = getCategoryIdByTagId(tagId)
  return getIconById(categoryId).iconColor
}

export const getAllCategories = () => {
  return getAllIcons()
    .filter(icon => (icon.type === 'category' || icon.type === 'note'))
    .sort((a, b) => {
      if (a.name < b.name) return -1
      else return 1
    })
}

const getPlaceCategoryTagCount = (placeTags) => {
  return placeTags.reduce((acc, tagId) => {
    var category = getCategoryIdByTagId(tagId)
    console.log('accumulator value', acc)
    if (category in acc) {
      acc[category] = acc[category].concat([tagId])
    } else {
      acc[category] = [tagId]
    }
    return acc
  }, {})
}

export const getCategoryTagCountArray = (placeTags) => {
  const categoryTagCount = getPlaceCategoryTagCount(placeTags)
  var result = []
  for (var key in categoryTagCount) {
    result.push({category: key, tags: categoryTagCount[key]})
  }
  return result
}

export const getPrimaryIcon = (placeTags) => {
  return getIconById(getCategoryTagCountArray(placeTags).reduce((acc, obj) => {
    if (obj.tags.length > acc.tags.length) {
      return obj
    } else return acc
  }).category)
}

// Place helpers

export const getLatestPlaces = (first, second) => {
  if (first.lastUpdated > second.lastUpdated) {
    return first
  } else return second
}

export const filterPlacesByType = (places) => {
  var typesFilter = [
    'art_gallery',
    'bakery',
    'bar',
    'meal_delivery',
    'meal_takeaway',
    'bowling_alley',
    'movie_theater',
    'cafe',
    'night_club',
    'museum',
    'casino',
    'restaurant',
    'food'
  ]
  return places.filter((place) => {
    return place.types.some((type) => {
      return typesFilter.indexOf(type) > -1
    })
  })
}

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1)  // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return Math.round(d * 10) / 10
}

function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

export const placeTagsInCategory = (placeTags, categoryId) => {
  const categoryTags = getTagIdsByCategoryId(categoryId)
  return categoryTags.some((categoryTag) => {
    return placeTags.indexOf(categoryTag) > -1
  })
}

const getPlaceScore = (place, filters) => {
  return filters.reduce((acc, filter) => {
    if (filter.type === 'category') {
      if (placeTagsInCategory(place.tags, filter.id)) return acc + 1
      else return acc
    } else if (place.tags.indexOf(filter.id) > -1) {
      return acc + 1
    } else return acc
  }, 0)
}

const isOnMap = (place, region, scale) => {
  const inLat = (Math.abs(place.latlng.latitude) > Math.abs(region.latitude) - region.latitudeDelta * scale / 2) &&
    (Math.abs(place.latlng.latitude) < Math.abs(region.latitude) + region.latitudeDelta * scale / 2)
  const inLng = (Math.abs(place.latlng.longitude) > Math.abs(region.longitude) - region.longitudeDelta * scale / 2) &&
    (Math.abs(place.latlng.longitude) < Math.abs(region.longitude) + region.longitudeDelta * scale / 2)
  return inLat && inLng
}

const showOnMap = (place, region, filters, scale) => {
  if (region.longitudeDelta > 0.025) {
    return (isOnMap(place, region, scale) && getPlaceScore(place, filters) > 0)
  } else {
    return isOnMap(place, region, scale)
  }
}

export const getMapPlaces = (places, filters, region, scale = 1) => {
  const placeIds = places.ids.filter((placeId) => {
    const place = places.placeById[placeId]
    return showOnMap(place, region, filters, scale)
  })
  const mapPlaces = placeIds.reduce((acc, id) => {
    var place = places.placeById[id]
    acc[id] = {
      ...place,
      score: getPlaceScore(place, filters),
      mapIcon: getMapIcon(place, filters)
    }
    return acc
  }, {})
  return {
    ids: placeIds,
    placeById: mapPlaces
  }
}

export const getMapIcon = (place, filters) => {
  var tags = place.tags
  for (let i = 0; i < 4; i++) {
    var filter = filters[i]
    if (filter.type === 'tag' || filter.type === 'note') {
      if (tags.indexOf(filter.id) > -1) {
        return {
          ...filter,
          iconColor: getTagColor(filter.id)
        }
      }
    } else if (filter.type === 'category') {
      if (placeTagsInCategory(tags, filter.id)) {
        return filter
      }
    }
  }
  return ''
}

export const placeOpen = (placeInfo) => {
  if (placeInfo.open.weekday && Array.isArray(placeInfo.open.weekday)) {
    var normalHours = /\d+:\d+\s\w*\s*\W\s\d+:\d+\s\w*/
    var splitHours = /\d+:\d+\s\w*\s*\W\s\d+:\d+\s\w*,/g // To find split times
    var d = new Date()
    var today = (d.getDay() - 1) === -1 ? 6 : d.getDay() - 1
    console.log('Today from placeOpen', today)
    var hours = placeInfo.open.weekday[today].split('y: ')[1]
    if (hours === 'Closed') return 'Closed'
    else if (hours === 'Open 24 hours') return 'Open Now'
    else if (splitHours.test(hours)) {
      hours = hours.split(', ')
      console.log('split opening hours!', hours)
      for (var i = 0; i < hours.length; i++) {
        var open = isOpen(hours[i], d.getHours())
        if (open === 'Open Now') break
      }
      return open
    } else if (normalHours.test(hours)) {
      return isOpen(hours, d.getHours())
    } else {
      return 'Unknown'
    }
  } else {
    return 'Unknown'
  }
}

const isOpen = (hours, current) => {
  var openingHour = toMilitaryTime(hours.split(' – ')[0])
  var closingHour = toMilitaryTime(hours.split(' – ')[1])
  closingHour = closingHour < openingHour ? closingHour + 24 : closingHour
  if ((current >= openingHour) && (current < closingHour)) {
    console.log('Current time is', current)
    return 'Open Now'
  } else return 'Closed'
}

const toMilitaryTime = (hour) => {
  var time = hour.split(' ')[0]
  var period = hour.split(' ')[1]
  var newHour = time.split(':')[0]
  if (period === 'PM' && newHour !== '12') {
    return Number(newHour) + 12
  } else if (period === 'AM' && newHour === '12') {
    return Number(newHour) + 12
  } else return Number(newHour)
}

export const cleanType = (type) => {
  if (type.search('_') > -1) {
    type = type.split('_')
    return type.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
  }
  return type
}

export const formatPlaceDetails = (details, myPlaces) => {
  console.log('Details coming back from formatPlaceDetails', details)
  var openText, weekday
  if (details.opening_hours) {
    openText = details.opening_hours.open_now
    ? 'Open Now'
    : 'Closed'
    weekday = details.opening_hours.weekday_text
  } else {
    openText = 'Unknown'
    weekday = 'Unknown'
  }
  console.log('Types from formatPlaceDetails are: ', details.types)
  var type = cleanType(details.types[0])
  const isNew = myPlaces.ids.indexOf(details.place_id) === -1
  const tags = isNew ? [] : myPlaces.placeById[details.place_id].tags
  const categoryNotes = isNew ? {} : (myPlaces.placeById[details.place_id].categoryNotes || {})
  const primaryIcon = isNew ? {imageURI: 'plusIcon'} : myPlaces.placeById[details.place_id].primaryIcon

  type = type[0].toUpperCase() + type.slice(1)
  return {
    name: details.name,
    isNew: isNew,
    tags: tags,
    categoryNotes: categoryNotes,
    primaryIcon: primaryIcon,
    phone: details.international_phone_number,
    type: type,
    latlng: {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    },
    address: details.formatted_address,
    photos: details.photos,
    photoURI: null,
    place_id: details.place_id,
    open: {
      open_now: openText,
      weekday: weekday
    }
  }
}

export const inDropZone = (gesture, zone, layoutInfo, index) => {
  var xmin, xmax, ymin, ymax
  if (index === 4) {
    xmin = zone.xmin - layoutInfo.icon.spacing * 0.8
    xmax = zone.xmax + layoutInfo.icon.spacing * 0.8
    ymin = zone.ymin + layoutInfo.toolbar.yStart - layoutInfo.icon.spacing * 0.8
    ymax = zone.ymax + layoutInfo.toolbar.yStart + layoutInfo.icon.spacing * 0.8
  } else {
    xmin = zone.xmin
    xmax = zone.xmax
    ymin = zone.ymin + layoutInfo.toolbar.yStart
    ymax = zone.ymax + layoutInfo.toolbar.yStart
  }
  return (gesture.moveX > xmin && gesture.moveX < xmax) &&
          (gesture.moveY > ymin && gesture.moveY < ymax)
}

export const getLayout = () => {
  const height = Dimensions.get('window').height
  const smallScreen = height <= 570
  const width = Dimensions.get('window').width
  const isVertical = height > width
  const toolPaddingTop = 15
  const toolHorizontalPadding = 30
  const toolbarLength = 5
  const iconPercent = 0.125
  const modifier = isVertical ? 0.2 : 0.2
  const iconHeight = 0.16 * width
  const toolHeight = iconHeight * 2
  const borderWidth = 2
  const iconSpacing = (width - toolbarLength * iconHeight) / toolbarLength
  var dropZones = []
  for (var i = 0; i < toolbarLength; i++) {
    var x = iconSpacing / 2 + i * (iconHeight + iconSpacing)
    dropZones.push({
      xmin: x,
      xmax: x + iconHeight,
      ymin: toolPaddingTop,
      ymax: iconHeight + toolPaddingTop
    })
  }
  console.log('Dropzones are', dropZones)
  return {
    isVertical: isVertical,
    toolbar: {
      height: toolHeight,
      width: width,
      yStart: height - toolHeight,
      paddingTop: toolPaddingTop
    },
    navbar: {
      height: toolHeight * 0.6
    },
    iconContainer: {
      height: iconHeight,
      borderWidth: borderWidth
    },
    icon: {
      height: iconHeight,
      spacing: iconSpacing,
      yStart: toolPaddingTop
    },
    searchIcon: {
      height: iconHeight * 1.2
    },
    dropZones: dropZones,
    smallScreen: smallScreen
  }
}

export const compareToolbars = (toolA, toolB) => {
  return _.isEqual(toolA, toolB)
}

export const compareRegions = (regionA, regionB) => {
  return _.isEqual(regionA, regionB)
}

export const sortToolbar = (toolbar) => {
  return toolbar.sort((a, b) => {
    if (a.priority < b.priority) {
      return -1
    } else {
      return 1
    }
  })
}

export const isInToolbar = (icon, toolbar) => {
  var ids = toolbar.map((curr) => {
    return curr.id
  })
  return ids.indexOf(icon.id) > -1
}
