import React from 'react'
import { render } from 'react-dom'

import Constants from './Constants'
import Dashboard from './Dashboard'
import Footer from './Footer'
import Loader from './Loader'
import TopBar from './TopBar'
import * as Utils from './Utils'

const objectPath = require('object-path')
const parseUrl = require('query-string').parse

require('es6-promise').polyfill()

class App extends React.Component {
  constructor (props) {
    super(props)

    let activeProfile = window.PROFILES.find(profile => profile.active)

    let urlParameters = parseUrl(window.location.search)
    let period = Constants.periods.indexOf(urlParameters.period) > -1 ? urlParameters.period : 'week'

    this.state = {
      loading: true,
      period: period,
      profile: activeProfile,
      profiles: window.PROFILES,
      results: null,
      tests: window.TESTS
    }

    this.baseUrl = window.BASE_URL || ''
  }

  _fetchData (dateFrom, dateTo) {
    let monthFrom = (dateFrom.getFullYear() * 100) + dateFrom.getMonth() + 1
    let monthTo = (dateTo.getFullYear() * 100) + dateTo.getMonth() + 1

    let testsForRange = this.state.tests.filter(test => {
      return (test >= monthFrom) && (test <= monthTo)
    })

    const queue = testsForRange.map(test => {
      const year = test.toString().slice(0, 4)
      const month = test.toString().slice(4, 6)

      const path = `${this.baseUrl}/results/${this.state.profile.slug}/${year}/${month}.json`

      return window.fetch(path).then(response => {
        return response.json()
      })
    })

    this.setState({
      loading: true
    })

    Promise.all(queue).then(resultChunks => {
      let results = {}

      resultChunks.forEach(chunk => {
        Utils.traverseObject(chunk._r, (obj, path) => {
          obj.forEach((item, index) => {
            let ts = chunk._ts[index]

            objectPath.set(results, `${ts}.${path.join('.')}`, item)
          })
        })
      })

      this.setState({
        loading: false,
        results
      })
    })
  }

  _changePeriod (newPeriod) {
    this.setState({
      period: newPeriod
    })

    window.history.pushState(null, null, `?period=${newPeriod}`)
  }

  _changeProfile (newProfile) {
    this.setState({
      loading: true
    })

    window.history.pushState(null, null, `${this.baseUrl}/${newProfile}/?period=${this.state.period}`)

    window.fetch(`${this.baseUrl}/profiles.json`).then(response => {
      return response.json()
    }).then(profiles => {
      const profile = profiles.find(profile => profile.slug === newProfile)

      this.setState({
        loading: false,
        profile: profile,
        tests: profile.tests
      })
    })
  }

  componentDidMount () {
    const dateRange = Utils.getDateRangeForPeriod(this.state.period)

    this._fetchData(dateRange.from, dateRange.to)
  }

  componentDidUpdate (oldProps, oldState) {
    if ((oldState.period !== this.state.period) || (oldState.profile !== this.state.profile)) {
      const dateRange = Utils.getDateRangeForPeriod(this.state.period)

      this._fetchData(dateRange.from, dateRange.to)
    }
  }

  render () {
    return (
      <div>
        <TopBar {...this.state}
          onPeriodChange={this._changePeriod.bind(this)}
          onProfileChange={this._changeProfile.bind(this)} />

        {this.state.loading ? <Loader /> : <Dashboard {...this.state} />}

        <Footer />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
