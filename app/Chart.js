import { h, render, Component } from 'preact';
import ChartJS from 'chart.js'

import Constants from './Constants'
import * as Utils from './Utils'

const objectPath = require('object-path')

class Chart extends Component {
  _initChart() {
    const profile = this.props.profile

    const dates = Utils.getDateRangeForPeriod(this.props.period)
    const dateFrom = dates.from.getTime()
    const dateTo = dates.to.getTime()

    let timestamps = []

    Object.keys(this.props.results).forEach(timestamp => {
      const timestampMillis = timestamp * 1000

      if ((timestampMillis >= dateFrom) && (timestampMillis <= dateTo)) {
        timestamps.push(timestamp)
      }
    })

    let datasets = []

    this.props.metrics.forEach(metricPath => {
      let metric = objectPath.get(Constants.metrics, metricPath)

      const values = timestamps.map(timestamp => {
        let value = objectPath.get(this.props.results[timestamp], metricPath)

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
        pointHoverRadius: 5,
        pointHitRadius: 10,
        pointRadius: 5
      })
    })

    let lineChart = ChartJS.controllers.line.prototype.draw

    ChartJS.helpers.extend(ChartJS.controllers.line.prototype, {
      draw: function() {
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

    const target = document.getElementById(`chart${this.props.id}`);
    const chart = new ChartJS(target, {
      type: 'line',
      data: {
        labels,
        datasets,
        budgets: this.props.budgets
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                unit: 'month'
              },
              min: labels[0],
              max: labels[labels.length - 1]
              // min: dates.from.getTime(),
              // max: dates.to.getTime()
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
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

              return date.toISOString()
            }
          }
        }
      }
    })
  }

  componentDidMount() {
    this._initChart()
  }

  componentDidUpdate() {
    this._initChart()
  }

  render() {
    const placeholderClass = (Object.keys(this.props.results) < 2) ? ' c-Chart--placeholder' : ''

    return (
      <div className={`c-Chart${placeholderClass}`}>
        <canvas id={`chart${this.props.id}`} width="400" height="250"></canvas>
      </div>
    )
  }
}

export default Chart
