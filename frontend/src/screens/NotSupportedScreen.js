import React from 'react'
import './styles/NotSupported.css'

const NotSupportedScreen = ({ device }) => {
  return (
    <div className='not-supported'>
      <div className='not-supported-text'>
        {device === 'small' ? (
          <>
            <h1>
              Split<span>Share</span>
            </h1>
            <h4 style={{ margin: '1rem' }}>
              I'm afraid, this device is too small. I need more room.
            </h4>
          </>
        ) : (
          <>
            <h1>
              Split<span>Share</span>
            </h1>

            <p>This site is built for mobile devices.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default NotSupportedScreen
