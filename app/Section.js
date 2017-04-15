import React from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars

import Chart from './Chart'
import Info from './Info'
import Constants from './Constants'

const objectPath = require('object-path')

class Section extends React.Component {
  render () {
    let budgets = (this.props.profile.budgets || []).filter(budget => (this.props.metrics.indexOf(budget.metric) !== -1))

    return (
      <div className='c-Section'>
        <h3 className='c-Section__title'>{this.props.title}</h3>

        <div className='c-Section__indicators'>
          {this.props.metrics.map((metricPath, index) => {
            let metric = objectPath.get(Constants.metrics, metricPath)
            let value = objectPath.get(this.props.lastResult, metricPath)

            if (typeof value !== 'undefined') {
              if (typeof metric.transform === 'function') {
                value = metric.transform(value)
              }

              if (metric.unit) {
                value += metric.unit
              }
            } else {
              value = '—'
            }

            const info = metric.description ? <Info text={metric.description} /> : null
            const displayValue = value !== null ? value : '—'

            return (
              <dl key={index} className='c-Indicator'>
                <dt className='c-Indicator__key'>{metric.name}{info}</dt>
                <dd className='c-Indicator__value'>{displayValue}</dd>
              </dl>
            )
          })}

          {budgets.map((budget, index) => {
            const metric = objectPath.get(Constants.metrics, budget.metric)
            const value = objectPath.get(this.props.lastResult, budget.metric)

            let budgetValue = budget.max || budget.min || 0
            let statusClass = ' c-Indicator--success'

            if ((budget.max && (value > budgetValue)) ||
               (budget.min && (value < budgetValue))) {
              statusClass = ' c-Indicator--danger'
            }

            if (typeof metric.transform === 'function') {
              budgetValue = metric.transform(budgetValue)
            }

            if (typeof budgetValue !== 'undefined') {
              if (metric.unit) {
                budgetValue += metric.unit
              }
            } else {
              budgetValue = '—'
            }

            return (
              <dl key={index} className={`c-Indicator${statusClass}`}>
                <dt className='c-Indicator__key'>{metric.name} budget</dt>
                <dd className='c-Indicator__value'>{budgetValue}</dd>
              </dl>
            )
          })}
        </div>

        <Chart {...this.props} id={this.props.id}
          budgets={budgets}
          metrics={this.props.metrics}
          yLabel={this.props.yLabel} />
      </div>
    )
  }
}

export default Section
