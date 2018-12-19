import {render} from 'react-dom' // eslint-disable-line no-unused-vars
import Logo from './Logo.jsx'
import LogoTitle from './LogoTitle.jsx'
import React from 'react'
import styled from 'styled-components'

const Dropdown = styled.select`
  -webkit-appearance: none;
  background-color: #EA8C55;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTUgNmgxMGwtNSA5LTUtOXoiPjwvcGF0aD48L3N2Zz4=);
  background-origin: border-box;
  background-position: right -5px center;
  background-repeat: no-repeat;
  background-size: 20px;
  border: 0;
  border-bottom: 2px solid white;
  border-radius: 0;
  color: inherit;
  font: inherit;
  margin: 0 6px;
  outline: 0;
  padding-right: 20px;

  &:focus {
    border-bottom-color: rgba(white, 0.5);
  }
`
const InnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
  padding: 6px;
`
const LogoWrapper = styled.a`
  color: white;
`
const Nav = styled.div`
  font-size: 18px;
`
const Wrapper = styled.div`
  background-color: #EA8C55;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.45);
  color: white;
  font-family: 'Roboto Condensed', 'Helvetica Neue', Arial, Helvetica, Geneva, sans-serif;
  margin-bottom: 40px;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`

class TopBar extends React.Component {
  _onPeriodChange (event) {
    this.props.onPeriodChange(event.target.value)
  }

  _onProfileChange (event) {
    this.props.onProfileChange(event.target.value)
  }

  render () {
    const {
      onPeriodChange,
      onProfileChange,
      state
    } = this.props
    const {
      activeProfile,
      period,
      profiles
    } = state

    return (
      <Wrapper>
        <InnerWrapper>
          <LogoWrapper href='https://speedtracker.org'>
            <Logo width={40} />
            <LogoTitle width={140} />
          </LogoWrapper>

          <Nav>
            Viewing

            <Dropdown
              onChange={e => onProfileChange(e.target.value)}
              value={activeProfile && activeProfile.slug}
            >
              {profiles.map(profile => (
                <option key={profile.slug} value={profile.slug}>
                  {profile.name}
                </option>
              ))}
            </Dropdown> in the last

            <Dropdown
              onChange={e => onPeriodChange(e.target.value)}
              value={period}
            >
              <option value='day'>day</option>
              <option value='week'>week</option>
              <option value='month'>month</option>
              <option value='year'>year</option>
            </Dropdown>
          </Nav>
        </InnerWrapper>
      </Wrapper>
    )
  }
}

export default TopBar
