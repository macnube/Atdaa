import React from 'React'
import IconSearchNavBar from './IconSearchNavBar'

const IconSearchHeader = ({ layoutInfo, onBack }) => {
  return (
    <IconSearchNavBar
      width={layoutInfo.toolbar.width}
      handlePress={onBack} />
  )
}

IconSearchHeader.propTypes = {
  layoutInfo: React.PropTypes.object.isRequired,
  onBack: React.PropTypes.func.isRequired
}

export default IconSearchHeader
