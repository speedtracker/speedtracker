import {connect} from 'react-redux'
import {signOut} from '../store'
import Layout from '../components/layout'

class Index extends React.Component {
  handleSignOut () {
    const {dispatch} = this.props

    dispatch(
      signOut()
    )
  }

  render () {
    const {accessToken, user} = this.props

    return (
      <Layout home={true}>
      </Layout>      
    )
  }
}

export default connect(state => ({
  accessToken: state.accessToken,
  user: state.user
}))(Index)