import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './styles/Button.css'

const Button = props => {
  const { text, path } = props

  return (
    <Link className='btn-link' to={path}>
      <button className='btn'>{text}</button>
    </Link>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default Button
