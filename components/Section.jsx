import Chart from './Chart.jsx'
import Constants from './../lib/Constants'
import Info from './Info.jsx'
import React from 'react'
import styled from 'styled-components'

const Title = styled.h3`
  background-color: #E8E8E8;
  border-radius: 10px;
  color: #EA8C55;
  font-family: 'Roboto Condensed', 'Helvetica Neue', Arial, Helvetica, Geneva, sans-serif;
  font-size: 29px;
  margin-bottom: 27px;
  padding: 10px 20px;  
`

const Wrapper = styled.div`
  & + & {
    margin-top: 80px;
  }  
`

class Section extends React.Component {
  render () {
    const {
      children,
      title
    } = this.props

    return (
      <Wrapper>
        <Title>{title}</Title>

        {children}
      </Wrapper>
    )
  }
}

export default Section
