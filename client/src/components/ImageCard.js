import React from 'react'
import PropTypes from 'prop-types'

const ImageCard = props => {
  return (<img
    className="card"
    max-height="500"
    src={props.imageSource}
  />)
}

ImageCard.propTypes ={
  imageSource:PropTypes.string
}

export default ImageCard