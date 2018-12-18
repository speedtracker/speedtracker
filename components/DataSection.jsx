import {render} from 'react-dom' // eslint-disable-line no-unused-vars
import Chart from './Chart.jsx'
import Constants from './../lib/Constants'
import Info from './Info.jsx'
import React from 'react'
import styled from 'styled-components'

const Indicator = styled.dl`
  display: inline-block;
  line-height: 1.4;
  margin: 10px 0 0 30px;
`

const IndicatorKey = styled.dt`
  font-family: 'Roboto Condensed', 'Helvetica Neue', Arial, Helvetica, Geneva, sans-serif;
  font-size: 16px;
  margin-bottom: -7px;  
`

const IndicatorValue = styled.dd`
  color: ${props => props.success === 'success' ? '#7CAE7A' : (
    props.success === 'danger' ? 'red' : '#000000'
  )}
  font-family: Helvetica, Arial, sans-serif;
  font-size: 27px;
  font-weight: bold;
  margin: 0;
`

const Indicators = styled.div`
  margin-bottom: 27px;
  margin: -10px 0 20px -30px;
  padding: 0 10px;
`

export default class DataSection extends React.Component {
  render () {
    const {
      id,
      maxValue,
      metrics,
      onClick,
      state,
      yLabel
    } = this.props
    const {
      activeProfile,
      results
    } = state
    const budgets = (activeProfile.budgets || []).filter(budget => {
      return metrics.indexOf(budget.metric) !== -1
    })

    return (
      <div>
        <Indicators>
          {metrics.map((key, index) => {
            let metric = Constants.metrics[key]
            let value = results.slice(-1)[0][key]

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

            const info = metric.description
              ? <Info text={metric.description} />
              : null
            const displayValue = value !== null
              ? value
              : '—'

            return (
              <Indicator key={index}>
                <IndicatorKey>{metric.name}{info}</IndicatorKey>
                <IndicatorValue>{displayValue}</IndicatorValue>
              </Indicator>
            )
          })}

          {budgets.map((budget, index) => {
            const metric = Constants.metrics[budget.metric]
            const value = results.slice(-1)[0][budget.metric]

            let budgetValue = budget.max || budget.min || 0
            let successState = (
              budget.max && (value > budgetValue) ||
              budget.min && (value < budgetValue)
            ) ? 'danger' : 'success'

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
              <Indicator key={index}>
                <IndicatorKey>{metric.name} budget</IndicatorKey>
                <IndicatorValue
                  success={successState}
                >{budgetValue}</IndicatorValue>
              </Indicator>
            )
          })}
        </Indicators>

        <Chart 
          id={id}
          budgets={budgets}
          maxValue={maxValue}
          metrics={metrics}
          onClick={onClick}
          state={state}
          yLabel={yLabel}
        />
      </div>
    )
  }
}
