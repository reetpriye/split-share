import NoData from '../components/NoData'
import { useSelector } from 'react-redux'
import ReactApexChart from 'react-apexcharts'

import './styles/Chart.css'

const ColumnChart = () => {
  const currExpense = useSelector(state => state.currExpense)
  const expenseAllTransactions = useSelector(
    state => state.expenseAllTransactions
  )
  const { expenseData } = currExpense
  const { transactions } = expenseAllTransactions

  const membersShare = []
  const membersName = []

  expenseData && expenseData.membersData.map(m => membersShare.push(m.amount))
  expenseData && expenseData.membersData.map(m => membersName.push(m.name))

  const state = {
    series: [
      {
        name: 'Shares',
        data: membersShare
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#ccc',
        toolbar: {
          autoSelected: 'pan',
          show: false
        }
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -100,
                to: -46,
                color: '#F15B46'
              },
              {
                from: -45,
                to: 0,
                color: '#FEB019'
              }
            ]
          },
          columnWidth: '80%'
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        borderColor: '#888'
      },
      yaxis: {
        labels: {
          formatter: function (y) {
            return y.toFixed(2)
          }
        }
      },
      xaxis: {
        type: 'string',
        categories: membersName,
        labels: {
          rotate: -90,
          style: {
            fontSize: '10px'
          }
        }
      }
    }
  }

  return (
    <div className='card chart-container'>
      <h2 className='sub-heading'>Members Share</h2>
      {transactions && transactions.length === 0 ? (
        <NoData message={'Kindly add transactions'} />
      ) : (
        <div id='wrapper'>
          <div id='chart-area'>
            <ReactApexChart
              options={state.options}
              series={state.series}
              type='bar'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ColumnChart
