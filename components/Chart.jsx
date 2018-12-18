import * as Utils from './../lib/Utils'
import {render} from 'react-dom' // eslint-disable-line no-unused-vars
import ChartJS from 'chart.js'
import Constants from './../lib/Constants'
import React from 'react'
import styled from 'styled-components'

const ChartWrapper = styled.div`
  position: relative;
`
const PlaceholderChartWrapper = styled(ChartWrapper)`
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: ' ';
    background-color: rgba(255, 255, 255, 0.8);
  }

  &:after {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    text-align: center;
    content: 'We need some more tests results to draw a chart.'
  }  
`
const ChartFooter = styled.p`
  text-align: center;
  font-size: 13px;
  opacity: 0.5;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;

  a {
    text-decoration: underline;
  }  
`

class Chart extends React.Component {
  _initChart () {
    const {
      budgets,
      id,
      maxValue,
      metrics,
      onClick,
      state,
      yLabel
    } = this.props
    const {
      period,
      results
    } = state
    const datasets = metrics.map(key => {
      const metric = Constants.metrics[key]
      const values = results.map(result => {
        let value = result[key]

        if (typeof metric.transform === 'function') {
          value = metric.transform(value)
        }

        return value
      })

      return {
        backgroundColor: Utils.getColor(metric.color, 0.5),
        borderColor: Utils.getColor(metric.color, 1),
        borderWidth: 1,
        data: values,
        label: metric.name,
        lineTension: 0.6,
        pointHoverRadius: 10,
        pointHitRadius: 10,
        pointRadius: 5
      }
    })
    const lineChart = ChartJS.controllers.line.prototype.draw

    ChartJS.helpers.extend(ChartJS.controllers.line.prototype, {
      draw: function () {
        lineChart.apply(this, arguments)

        const chart = this.chart
        const ctx = chart.chart.ctx
        const lineStart = chart.scales['x-axis-0'].left
        const lineEnd = lineStart + chart.scales['x-axis-0'].width

        chart.config.data.budgets.forEach(budget => {
          let metric = Constants.metrics[budget.metric]
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

    const labels = results.map(result => result.timestamp * 1000)
    const target = document.getElementById(`chart${id}`)

    /* eslint-disable no-new */
    new ChartJS(target, {
      type: 'line',
      data: {
        labels,
        datasets,
        budgets: budgets
      },
      options: {
        onClick: onClick,
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
              max: maxValue
            },
            scaleLabel: {
              display: (yLabel !== undefined),
              labelString: yLabel || ''
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
    const {footNote, id, state} = this.props
    const {results} = state
    const Wrapper = (Object.keys(results) < 2)
      ? PlaceholderChartWrapper
      : ChartWrapper

    return (
      <Wrapper>
        <canvas id={`chart${id}`} width='400' height='250' />

        {footNote &&
          <ChartFooter>{footNote}</ChartFooter>
        }
      </Wrapper>
    )
  }
}

export default Chart
