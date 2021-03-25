import React from 'react'
import notFound from '../assets/not-found.svg'

import './styles/NotFound.css'

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <img style={{ width: '80%' }} src={notFound} alt={'Not Found'} />
    </div>
  )
}

export default NotFound
