import {callRemoteAPI} from '../store'
import {connect} from 'react-redux'
import Button from '../components/button'
import Dropdown from '../components/dropdown'
import Header from '../components/header'
import InfoPanel from '../components/infoPanel'
import Layout from '../components/layout'
import Label from '../components/label'
import SplitPanel from '../components/splitPanel'
import TextInput from '../components/textInput'

class AccountPage extends React.Component {
  static async getInitialData (dispatch, getState) {
    const {user} = getState()
    const {account} = user.data || {}

    return callRemoteAPI({
      contentKey: AccountPage.contentKey,
      endpoint: `/1.0/speedtracker/accounts/${account}`
    })(dispatch, getState)
  }

  constructor (props) {
    super(props)

    const {state} = props || {}

    this.state = this.getStateFromApiData(state.apiData)
  }

  componentDidMount () {
    const {dispatch, state} = this.props
    const {apiContentKey} = state

    // If we have just mounted the component on the server, we must get the
    // initial data.
    if (apiContentKey !== AccountPage.contentKey) {
      AccountPage.getInitialData(dispatch, () => state)
    }
  }

  componentDidUpdate (oldProps) {
    const {state: oldState} = oldProps
    const {state} = this.props

    if (oldState.apiDataTs !== state.apiDataTs) {
      this.setState(
        this.getStateFromApiData(state.apiData)
      )
    }
  }

  getStateFromApiData (data) {
    if (!data || !data.length) {
      return {
        email: '',
        wptKey: ''
      }
    }

    return {
      email: data[0].email,
      wptKey: data[0].wptKey
    }
  }

  handleFormChange (field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  handleFormSubmit (event) {
    const {dispatch, state} = this.props
    const {user} = state
    const {account} = user.data || {}
    const {email, wptKey} = this.state

    dispatch(
      callRemoteAPI({
        contentKey: AccountPage.contentKey,
        data: {
          email,
          wptKey
        },
        endpoint: `/1.0/speedtracker/accounts/${account}`,
        method: 'put'
      })
    )

    event.preventDefault()
  }

  handleSignOut () {
    const {dispatch} = this.props

    dispatch(
      signOut()
    )
  }

  render () {
    const {state} = this.props
    const {apiContentKey, apiData, user} = state
    const {email, wptKey} = this.state

    if (!apiData || apiContentKey !== AccountPage.contentKey) {
      return null
    }

    return (
      <Layout title="Account settings">
        <SplitPanel>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <Label text="Email address" space={true}>
              <TextInput
                onChange={this.handleFormChange.bind(this, 'email')}
                value={email}
              />
            </Label>

            <Label text="WebPageTest API key" space={true}>
              <TextInput
                onChange={this.handleFormChange.bind(this, 'wptKey')}
                value={wptKey}
              />
            </Label>

            <Button accent={true} type="submit">Save</Button>
          </form>

          <InfoPanel>
            <p>To request your WebPageTest API key, click <a href="https://www.webpagetest.org/getkey.php">here</a>. SpeedTracker will use your API key to request tests on your behalf.</p>
          </InfoPanel>          
        </SplitPanel>
      </Layout>
    )
  }
}

AccountPage.contentKey = 'AccountPage'
AccountPage.requiresAuthentication = true

export default connect(state => ({state}))(AccountPage)