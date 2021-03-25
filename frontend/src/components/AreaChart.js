import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector, useDispatch } from 'react-redux'
import NoData from './NoData'
import { listAllTransactions } from '../actions/transactionActions'

import './styles/Chart.css'

const AreaChart = ({ expenseId, successCreate }) => {
  const dispatch = useDispatch()

  const expenseAllTransactions = useSelector(
    state => state.expenseAllTransactions
  )
  const { transactions } = expenseAllTransactions

  useEffect(() => {
    if (successCreate) {
      dispatch(listAllTransactions(expenseId))
    }
  }, [successCreate, dispatch, expenseId])

  const expenses = []
  const expensesName = []

  transactions && transactions.map(t => expenses.push(t.totalAmount))
  transactions && transactions.map(t => expensesName.push(t.description))

  const state = {
    series: [
      {
        name: 'Expenses',
        data: expenses
      }
    ],
    options: {
      chart: {
        id: 'chart2',
        type: 'area',
        height: 230,
        foreColor: '#ccc',
        toolbar: {
          autoSelected: 'pan',
          show: false
        }
      },
      colors: ['#00BAEC'],
      stroke: {
        width: 3
      },
      grid: {
        borderColor: '#555',
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0
        }
      },
      markers: {
        size: 5,
        colors: ['#000524'],
        strokeColor: '#00BAEC',
        strokeWidth: 3
      },
      tooltip: {
        theme: 'dark'
      },
      yaxis: {
        min: 0,
        tickAmount: 4
      },
      xaxis: {
        type: 'string',
        categories: expensesName,
        labels: {
          rotate: -90,
          style: {
            fontSize: '10px'
          }
        },
        tooltip: {
          enabled: false
        }
      }
    }
  }

  return (
    <div className='card chart-container'>
      <h2 className='sub-heading'>Expense chart</h2>

      {transactions && transactions.length === 0 ? (
        <NoData message={'Kindly add transactions'} />
      ) : (
        <div id='wrapper'>
          <div id='chart-area'>
            <ReactApexChart options={state.options} series={state.series} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AreaChart
