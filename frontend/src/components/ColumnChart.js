import React from 'react'
import ReactApexChart from 'react-apexcharts'

import './styles/Chart.css'

const ColumnChart = () => {
  const state = {
    series: [
      {
        name: 'Shares',
        data: [4.0, 124.0, -56.0, -76.0, 94.0]
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
        categories: ['Ashish', 'Raj', 'Manish', 'Ankit', 'Reet'],
        labels: {
          rotate: -90
        }
      }
    }
  }

  return (
    <div className='chart-container'>
      <h2 className='sub-heading'>Members Share</h2>
      <div id='wrapper'>
        <div id='chart-area'>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type='bar'
          />
        </div>
      </div>
    </div>
  )
}

export default ColumnChart
