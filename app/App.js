import { h, render, Component } from 'preact'
import objectPath from 'object-path'
import { parse } from 'query-string'
import 'es6-promise/auto'

import Constants from './Constants'
import Dashboard from './Dashboard'
import Footer from './Footer'
import Loader from './Loader'
import TopBar from './TopBar'
import * as Utils from './Utils'

class App extends Component {
  constructor(props) {
    super(props)

    const activeProfile = window.PROFILES.find(profile => profile.active)
    const urlParameters = parse(window.location.search)
    const period = Constants.periods.indexOf(urlParameters.period) > -1 ? urlParameters.period : 'week'

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

  _fetchData(dateFrom, dateTo) {
    const monthFrom = (dateFrom.getFullYear() * 100) + dateFrom.getMonth() + 1
    const monthTo = (dateTo.getFullYear() * 100) + dateTo.getMonth() + 1

    const testsForRange = this.state.tests.filter(test => {
      return (test >= monthFrom) && (test <= monthTo)
    })

    const queue = testsForRange.map(test => {
      const year = test.toString().slice(0, 4)
      const month = test.toString().slice(4, 6)
      const path = `${this.baseUrl}/results/${this.state.profile.slug}/${year}/${month}.json`

      return fetch(path).then(response => response.json())
    })

    this.setState({ loading: true })

    Promise.all(queue).then(resultChunks => {
      let results = {}

      resultChunks.forEach(chunk => {
        Utils.traverseObject(chunk._r, (obj, path) => {
          obj.forEach((item, index) => {
            const ts = chunk._ts[index]
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

  _changePeriod(newPeriod) {
    this.setState({ period: newPeriod })
    window.history.pushState(null, null, `?period=${newPeriod}`)
  }

  _changeProfile(newProfile) {
    this.setState({ loading: true })

    window.history.pushState(null, null, `${this.baseUrl}/${newProfile}/?period=${this.state.period}`)

    fetch(`${this.baseUrl}/profiles.json`).then(response => {
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

  componentDidMount() {
    const dateRange = Utils.getDateRangeForPeriod(this.state.period)
    this._fetchData(dateRange.from, dateRange.to)
  }

  componentDidUpdate(oldProps, oldState) {
    if ((oldState.period !== this.state.period) || (oldState.profile !== this.state.profile)) {
      const dateRange = Utils.getDateRangeForPeriod(this.state.period)
      this._fetchData(dateRange.from, dateRange.to)
    }
  }

  render() {
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
