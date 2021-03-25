import React from 'react'
import ReactApexChart from 'react-apexcharts'

import './styles/Chart.css'

const LineChart = () => {
  const generateDayWiseTimeSeries = (baseval, count, yrange) => {
    let i = 0
    let series = []
    while (i < count) {
      let x = baseval
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

      series.push([x, y])
      baseval += 86400000
      i++
    }
    return series
  }

  const data = generateDayWiseTimeSeries(
    new Date('22 Apr 2017').getTime(),
    17,
    {
      min: 30,
      max: 90
    }
  )

  const state = {
    series: [
      {
        data: data
      }
    ],
    xaxis: {
      type: 'datetime'
    },
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
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        min: 0,
        tickAmount: 4
      }
    }
  }

  return (
    <div className='card chart-container'>
      <h2 className='sub-heading'>Expense chart</h2>
      <div id='wrapper'>
        <div id='chart-area'>
          <ReactApexChart options={state.options} series={state.series} />
        </div>
      </div>
    </div>
  )
}

export default LineChart
