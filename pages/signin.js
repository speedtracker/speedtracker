import {connect} from 'react-redux'
import {redirectTo} from '../lib/redirect'
import InfoPanel from '../components/infoPanel'
import Layout from '../components/layout'
import SignInForm from '../components/signInForm'
import SplitPanel from '../components/splitPanel'

class SignInPage extends React.Component {
  render () {
    const {state} = this.props

    if (state.user) {
      redirectTo('/profiles')

      return null
    }

    return (
      <Layout title="Sign in">
        <SplitPanel>
          <SignInForm />

          <InfoPanel>
            <p>Hello, this is a test.</p>
          </InfoPanel>          
        </SplitPanel>
      </Layout>
    )
  }
}

SignInPage.contentKey = 'SignInPage'

export default connect(state => ({state}))(SignInPage)