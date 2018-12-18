import React from 'react'
import { render } from 'react-dom'

import Constants from './../lib/Constants'
import Dashboard from './Dashboard.jsx'
import Footer from './Footer.jsx'
import Loader from './Loader.jsx'
import TopBar from './TopBar.jsx'
import * as Utils from './../lib/Utils'

const parseUrl = require('query-string').parse

require('es6-promise').polyfill()

class App extends React.Component {
  constructor (props) {
    super(props)

    let urlParameters = parseUrl(window.location.search)
    let profiles = window.PROFILES
    let activeProfile = profiles.find((profile, index) => {
      return urlParameters.profile === profile.slug
    }) || profiles[0]
    let period = Constants.periods.indexOf(urlParameters.period) > -1
      ? urlParameters.period
      : 'week'

    this.state = {
      activeProfile,
      loading: true,
      period: period,
      profiles: profiles,
      results: null
    }

    this.baseUrl = window.BASE_URL || ''
  }

  _fetchData (dateFrom, dateTo) {
    const {activeProfile} = this.state
    const from = Math.floor(dateFrom.getTime() / 1000)
    const to = Math.floor(dateTo.getTime() / 1000)

    this.setState({
      loading: true
    })

    let url = `/.netlify/functions/get?page=${activeProfile.slug}&from=${from}&to=${to}`

    window.fetch(url).then(response => {
      return response.json()
    }).then(results => {
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
        activeProfile: profile,
        loading: false
      })
    })
  }

  componentDidMount () {
    const {period} = this.state
    const dateRange = Utils.getDateRangeForPeriod(this.state.period)

    this._fetchData(dateRange.from, dateRange.to)
  }

  componentDidUpdate (oldProps, oldState) {
    const {period, profile} = this.state

    if ((oldState.period !== period) || (oldState.profile !== profile)) {
      const dateRange = Utils.getDateRangeForPeriod(period)

      this._fetchData(dateRange.from, dateRange.to)
    }
  }

  render () {
    const {loading} = this.state

    return (
      <div>
        <TopBar
          onPeriodChange={this._changePeriod.bind(this)}
          onProfileChange={this._changeProfile.bind(this)}
          state={this.state}
        />

        {loading
          ? <Loader />
          : <Dashboard state={this.state}/>
        }

        <Footer />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
