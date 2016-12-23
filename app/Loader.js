import { h, render, Component } from 'preact'

import Logo from './Logo'

class Loader extends Component {
  render() {
    return (
      <div className="c-Loader">
        <div className="c-Loader__content">
          <Logo animate={true} width={80} />
        </div>
      </div>
    )
  }
}

export default Loader
