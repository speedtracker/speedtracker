import {connect} from 'react-redux'
import {signOut} from '../store'

class SignOutPage extends React.Component {
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(
      signOut()
    )
  }

  render () {
    return <p>Signed out successfully.</p>
  }
}

export default connect(state => ({state}))(SignOutPage)