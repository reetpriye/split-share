import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

import './styles/Alerts.css'

const Alerts = () => {
  const alertContext = useContext(AlertContext)
  const { alerts } = alertContext

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <p className='m-0'>
          <i className='fas fa-info-circle' /> {`  ${alert.msg}`}
        </p>
      </div>
    ))
  )
}

export default Alerts
