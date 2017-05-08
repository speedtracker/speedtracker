import React from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars

import ChartJS from 'chart.js'

import Constants from './Constants'
import * as Utils from './Utils'

const objectPath = require('object-path')

class Chart extends React.Component {
  _initChart () {
    const dates = Utils.getDateRangeForPeriod(this.props.period)
    const dateFrom = dates.from.getTime()
    const dateTo = dates.to.getTime()
    const results = this.props.results

    let timestamps = Utils.getTimestampsByInterval(results, dateFrom, dateTo)

    let datasets = []

    this.props.metrics.forEach(metricPath => {
      let metric = objectPath.get(Constants.metrics, metricPath)

      const values = timestamps.map(timestamp => {
        let value = objectPath.get(results[timestamp], metricPath)

        if (typeof metric.transform === 'function') {
          value = metric.transform(value)
        }

        return value
      })

      datasets.push({
        backgroundColor: Utils.getColor(metric.color, 0.5),
        borderColor: Utils.getColor(metric.color, 1),
        borderWidth: 1,
        data: values,
        label: metric.name,
        lineTension: 0.6,
        pointHoverRadius: 10,
        pointHitRadius: 10,
        pointRadius: 5
      })
    })

    let lineChart = ChartJS.controllers.line.prototype.draw

    ChartJS.helpers.extend(ChartJS.controllers.line.prototype, {
      draw: function () {
        lineChart.apply(this, arguments)

        const chart = this.chart
        let ctx = chart.chart.ctx

        const lineStart = chart.scales['x-axis-0'].left
        const lineEnd = lineStart + chart.scales['x-axis-0'].width

        chart.config.data.budgets.forEach(budget => {
          const metric = objectPath.get(Constants.metrics, budget.metric)
          let value = budget.max || budget.min

          if (value) {
            if (typeof metric.transform === 'function') {
              value = metric.transform(value)
            }

            const yValue = chart.scales['y-axis-0'].getPixelForValue(value)

            ctx.save()
            ctx.beginPath()
            ctx.moveTo(lineStart, yValue)
            ctx.strokeStyle = '#ff0000'
            ctx.lineTo(lineEnd, yValue)
            ctx.stroke()

            ctx.restore()
          }
        })
      }
    })

    const labels = timestamps.map(timestamp => timestamp * 1000)
    const target = document.getElementById(`chart${this.props.id}`)

    /* eslint-disable no-new */
    new ChartJS(target, {
      type: 'line',
      data: {
        labels,
        datasets,
        budgets: this.props.budgets
      },
      options: {
        onClick: this.props.onClick,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                unit: 'month'
              },
              min: labels[0],
              max: labels[labels.length - 1]
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: this.props.maxValue
            },
            scaleLabel: {
              display: (this.props.yLabel !== undefined),
              labelString: this.props.yLabel || ''
            }
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'label',
          callbacks: {
            title: function (tooltipItems, data) {
              const date = new Date(tooltipItems[0].xLabel)
              const year = date.getFullYear()
              const month = date.getMonth() + 1
              const day = date.getDate()
              const hours = date.getHours()
              const minutes = date.getMinutes()
              const seconds = date.getSeconds()

              return `${day}/${month}/${year} @ ${hours}:${minutes}:${seconds}`
            }
          },
          position: 'nearest'
        }
      }
    })
    /* eslint-enable no-new */
  }

  componentDidMount () {
    this._initChart()
  }

  componentDidUpdate () {
    this._initChart()
  }

  render () {
    const placeholderClass = (Object.keys(this.props.results) < 2) ? ' c-Chart--placeholder' : ''

    return (
      <div className={`c-Chart${placeholderClass}`}>
        <canvas id={`chart${this.props.id}`} width='400' height='250' />

        {this.props.footNote &&
          <p className='c-Chart__footer'>{this.props.footNote}</p>
        }
      </div>
    )
  }
}

export default Chart
