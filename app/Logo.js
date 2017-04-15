import React from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars

class Logo extends React.Component {
  render () {
    return (
      <svg className={`c-Logo${this.props.animate ? ' c-Logo--animate' : ''}`}
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        version='1.1'
        x='0px'
        y='0px'
        viewBox='0 0 100 100'
        enableBackground='new 0 0 100 100'
        xmlSpace='preserve'
        width={this.props.width}
        height={this.props.width}>
        <g className='c-Logo__stripes'>
          <path d='M83.128,89h11.927c0,0-6.393-33.396-11.004-43.636C79.418,35.075,58.616,8,58.616,8h-7.918 c3.998,5,24.598,32.53,26.306,43.37C78.248,59.273,81.437,79,83.128,89z'
            className='c-Logo__stripe c-Logo__stripe--5' />
          <path d='M37.132,8h-7.951c2.902,5,17.882,32.53,19.589,43.37C50.015,59.273,46.709,79,44.754,89h17.498 c-0.051-10-0.316-29.727-1.562-37.63C58.983,40.53,40.683,13,37.132,8z'
            className='c-Logo__stripe c-Logo__stripe--3' />
          <path d='M47.561,8h-7.292c3.553,5,21.852,32.53,23.56,43.37C65.072,59.273,65.338,79,65.389,89H79.99 c-1.69-10-4.88-29.727-6.124-37.63C72.159,40.53,51.56,13,47.561,8z'
            className='c-Logo__stripe c-Logo__stripe--4' />
          <path d='M30.889,49.489C29.332,39.609,17.606,16,13.491,8H6.285c0,0,12.949,30.661,12.722,41.489C18.787,59.941,5.055,89,5.055,89 h17.401C25.613,80,32.215,57.906,30.889,49.489z'
            className='c-Logo__stripe c-Logo__stripe--1' />
          <path d='M45.633,51.37C43.925,40.53,28.946,13,26.043,8h-9.415c4.115,8,15.842,31.609,17.398,41.489 C35.352,57.906,28.75,80,25.593,89h16.024C43.57,79,46.878,59.273,45.633,51.37z'
            className='c-Logo__stripe c-Logo__stripe--2' />
        </g>
      </svg>
    )
  }
}

export default Logo
