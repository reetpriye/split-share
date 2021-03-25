import React, { Fragment } from 'react'
import AreaChart from '../components/AreaChart'
import ColumnChart from '../components/ColumnChart'

const AnalyticsScreen = ({ match }) => {
  return (
    <Fragment>
      <h1 className='heading'>Analytics</h1>
      <AreaChart expenseId={match.params.id} />
      <ColumnChart />
    </Fragment>
  )
}

export default AnalyticsScreen
