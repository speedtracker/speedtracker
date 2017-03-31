import { h, render, Component } from 'preact'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'precharts'
import objectPath from 'object-path'

import Constants from './Constants'
import * as Utils from './Utils'

class Chart extends Component {
  _fetchData(metrics = this.props.metrics) {
    let data = []
    const results = this.props.results
    const period = this.props.period

    const dates = Utils.getDateRangeForPeriod(period)
    const dateFrom = dates.from.getTime()
    const dateTo = dates.to.getTime()

    Object.keys(results).forEach(timestamp => {
      const timestampMillis = timestamp * 1000

      if ((timestampMillis >= dateFrom) && (timestampMillis <= dateTo)) {
        const result = results[timestamp]
        let obj = { name: new Date(timestampMillis).toISOString() }
        metrics.forEach(metricPath => {
          const metric = objectPath.get(Constants.metrics, metricPath)
          let value = objectPath.get(result, metricPath)
          value = typeof metric.transform === 'function' ? metric.transform(value) : value

          obj[metricPath] = parseFloat(value)
        })
        data.push(obj)
      }
    })

    this.setState({
      data,
      metrics
    })
  }

  _handleLegendClick(data, index, e) {
    const dataKey = data.dataKey
    const allMetrics = this.props.metrics
    const activeMetrics = this.state.metrics
    const disable = activeMetrics.indexOf(dataKey) !== -1
    const disableClassName = 'c-Chart__legend--disable'

    // Ignore click, because zero metrics are not allowed
    if (activeMetrics.length === 1 && disable) return

    // Determine wrapper for styling
    let wrapperEl = e.target
    while (wrapperEl.nodeName !== 'LI') wrapperEl = wrapperEl.parentNode

    let metrics = []
    if (disable) {
      // Disable metric
      wrapperEl.classList.add(disableClassName)
      metrics = activeMetrics.filter(metric => metric !== dataKey)
    } else {
      // Enable metric
      wrapperEl.classList.remove(disableClassName)
      metrics = allMetrics.filter(metric => metric === dataKey || activeMetrics.indexOf(metric) !== -1)
    }

    // Fetch data with restricted metrics
    this._fetchData(metrics)
  }

  _getTicks(data, period) {
    let ticks = []

    data.forEach(data => {
      const nextDate = new Date(data.name)

      const found = ticks.some(tick => {
        const tickDate = new Date(tick)
        let tickDateStr = `${tickDate.getFullYear()}-${tickDate.getMonth()}`
        let nextDateStr = `${nextDate.getFullYear()}-${nextDate.getMonth()}`

        // if year then "each month" else "each day"
        if (period !== 'year') {
          tickDateStr += `-${tickDate.getDate()}`
          nextDateStr += `-${nextDate.getDate()}`
        }

        return tickDateStr === nextDateStr
      })

      if (!found) ticks.push(nextDate.toISOString())
    })

    return ticks
  }

  componentDidMount() {
    this._fetchData()
  }

  render() {
    const data = this.state.data || []
    const hasData = data.length > 0
    const placeholderClass = hasData ? '' : ' c-Chart--placeholder'
    const ticks = this._getTicks(data, this.props.period)
    const interval = ticks.length > 14 ? 2 : 0

    const CustomizedVerticalLabel = ({ x, y, width, height, text }) => {
      x = (-height / 2) - (width / 2) - 7
      return (
        <text x={x} y={y} transform="rotate(-90)" textAnchor="middle" fontSize={12}>
          {text}
        </text>
      )
    }

    const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" transform="rotate(-35)">
            {new Date(payload.value).toDateString()}
          </text>
        </g>
      )
    }

    return (
      <div className={`c-Chart${placeholderClass}`}>
        {hasData &&
          <ResponsiveContainer aspect={4.0/2.5}>
            <AreaChart data={data} margin={{ left: 15, right: 10 }}>
              <XAxis dataKey="name" height={75} tick={<CustomizedAxisTick />} ticks={ticks} interval={interval} />
              <YAxis label={<CustomizedVerticalLabel text={this.props.yLabel} />} tickCount={7} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip separator=": " labelStyle={{fontWeight: 700}} />
              <Legend verticalAlign="top" height={36} onClick={this._handleLegendClick.bind(this)} />
              <defs>
                {this.props.metrics.map(key => {
                  const metric = objectPath.get(Constants.metrics, key)
                  const stopColor = Utils.getColor(metric.color)
                  return (
                    <linearGradient id={key} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={stopColor} stopOpacity={.3} />
                      <stop offset="95%" stopColor={stopColor} stopOpacity={0} />
                    </linearGradient>
                  )
                })}
              </defs>
              {this.props.metrics.map(key => {
                const metric = objectPath.get(Constants.metrics, key)
                return <Area type="monotone"
                             legendType="square"
                             dataKey={key}
                             name={metric.name}
                             unit={metric.unit}
                             stroke={Utils.getColor(metric.color)}
                             fill={`url(#${key})`}
                             fillOpacity={1}
                             dot />
              })}
              {this.props.budgets.map(key => {
                const metric = objectPath.get(Constants.metrics, key.metric)
                return <ReferenceLine y={metric.transform(key.max || key.min)}
                                      stroke="#ff0000"
                                      strokeDasharray="3 3"
                                      isFront />
              })}
            </AreaChart>
          </ResponsiveContainer>
        }
      </div>
    )
  }
}

export default Chart
