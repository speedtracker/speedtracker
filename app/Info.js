import React from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars

class Info extends React.Component {
  static get defaultProps () {
    return {
      position: 'up'
    }
  }

  render () {
    return (
      <span className='c-Info'
        data-balloon={this.props.text}
        data-balloon-pos={this.props.position}
        data-balloon-length='medium'>
        <svg xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'>
          <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z' />
        </svg>
      </span>
    )
  }
}

export default Info
