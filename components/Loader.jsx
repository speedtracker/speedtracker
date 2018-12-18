import {render} from 'react-dom' // eslint-disable-line no-unused-vars
import Logo from './Logo.jsx'
import React from 'react'
import styled from 'styled-components'

const InnerWrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #EA8C55;
  text-align: center;
`

export default class Loader extends React.Component {
  render () {
    return (
      <Wrapper>
        <InnerWrapper>
          <Logo animate width={80} />
        </InnerWrapper>
      </Wrapper>
    )
  }
}
