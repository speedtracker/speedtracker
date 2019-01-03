import * as Utils from './../lib/Utils'
import Chart from './Chart.jsx'
import Constants from './../lib/Constants'
import Info from './Info.jsx'
import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
  display: inline-block;
  
  & + & {
    margin-left: 10px;
  } 
`
const ProgressIndicator = styled.p`
  font-family: 'Roboto Condensed', 'Helvetica Neue', Arial, Helvetica, Geneva, sans-serif;
  text-align: center;
`
const Image = styled.img`
  border: 1px solid #E8E8E8;
  width: 270px;
`
const Wrapper = styled.div`
  overflow: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
`

export default class Filmstrip extends React.Component {
  render () {
    const {
      frames,
      testId,
      wptUrl
    } = this.props

    return (
      <Wrapper>
        {frames.map((frame, index) => {
          const progress = `${frame._t / 1000}s`

          return (
            <Item key={index}>
              <ProgressIndicator>{progress} ({frame._vc}%)</ProgressIndicator>
              <Image src={Utils.getVideoFrameURL(wptUrl, testId, frame)}/>
            </Item>
          )
        })}
      </Wrapper>
    )
  }
}
