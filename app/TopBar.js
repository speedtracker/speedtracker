import React from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars

import Logo from './Logo'
import LogoTitle from './LogoTitle'

class TopBar extends React.Component {
  _onPeriodChange (event) {
    this.props.onPeriodChange(event.target.value)
  }

  _onProfileChange (event) {
    this.props.onProfileChange(event.target.value)
  }

  render () {
    return (
      <div className='c-TopBar'>
        <div className='c-TopBar__inner'>
          <a href='https://speedtracker.org'>
            <Logo width={40} />
            <LogoTitle width={140} />
          </a>
          <div className='c-TopBar__nav'>
            <p>
              Viewing
              <select className='c-TopBar__select'
                value={this.props.profile.slug}
                onChange={this._onProfileChange.bind(this)}>
                {this.props.profiles.map(profile => {
                  return (
                    <option key={profile.slug} value={profile.slug}>{profile.name}</option>
                  )
                })}
              </select> in the last
              <select className='c-TopBar__select'
                value={this.props.period}
                onChange={this._onPeriodChange.bind(this)}>
                <option value='day'>day</option>
                <option value='week'>week</option>
                <option value='month'>month</option>
                <option value='year'>year</option>
              </select>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default TopBar
