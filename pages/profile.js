import {callRemoteAPI} from '../store'
import {connect} from 'react-redux'
import {getFieldErrors} from './../lib/api'
import Button from '../components/button'
import Dropdown from '../components/dropdown'
import InfoPanel from '../components/infoPanel'
import Label from '../components/label'
import Layout from '../components/layout'
import Router from 'next/router'
import SplitPanel from '../components/splitPanel'
import TextInput from '../components/textInput'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.getStateFromApiData()
  }

  componentDidMount () {
    const {dispatch, router, state} = this.props
    const {id} = router.query
    const {apiContentKey} = state

    if (id === 'new') {
      return
    }

    if (apiContentKey !== ProfilePage.contentKey) {
      dispatch(
        callRemoteAPI({
          contentKey: ProfilePage.contentKey,
          endpoint: `/1.0/speedtracker/profiles/${id}`
        })
      )
    }
  }

  componentDidUpdate (oldProps) {
    const {state: oldState} = oldProps
    const {router, state} = this.props

    // If we have just received the initial data, we must update the component
    // state.
    if (oldState.apiDataTs !== state.apiDataTs) {
      this.setState(
        this.getStateFromApiData(state.apiData)
      )
    }

    if (!oldState.apiData && state.apiData && router.query.id === 'new') {
      const profileId = state.apiData[0]._id
      const newUrl = `/profile/${profileId}`

      Router.replace(newUrl, newUrl, {shallow: true})
    }
  }

  getStateFromApiData (data) {
    if (!data || !data.length) {
      return {
        name: '',
        location: '',
        url: ''
      }
    }

    return {
      name: data[0].name,
      location: data[0].location || '',
      url: data[0].url
    }
  }

  handleFormChange (field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  handleFormSubmit (event) {
    const {dispatch, router} = this.props
    const {id} = router.query
    const {location, name, url} = this.state
    const endpoint = id === 'new'
      ? '/1.0/speedtracker/profiles'
      : `/1.0/speedtracker/profiles/${id}`
    const method = id === 'new'
      ? 'post'
      : 'put'

    dispatch(
      callRemoteAPI({
        contentKey: ProfilePage.contentKey,
        data: {
          location,
          name,
          url
        },
        endpoint,
        method
      })
    )

    event.preventDefault()
  }  
  
  render () {
    const {router, state} = this.props
    const {id: profileId} = router.query
    const {apiContentKey, apiData, apiError} = state
    const {location, name, url} = this.state
    const isNewProfile = profileId === 'new'
    const isLoading = !isNewProfile &&
      (!apiData || apiContentKey !== ProfilePage.contentKey)
    const profileName = isNewProfile
      ? 'New profile'
      : apiData && apiData[0].name

    if (!isNewProfile && apiError && apiError.status === 404) {
      return (
        <Layout title="Profile not found">
          <p>Oops, we could not find that profile!</p>
        </Layout>
      )      
    }

    const fieldErrors = getFieldErrors(apiError)

    return (
      <Layout title={profileName}>
        <SplitPanel>
          {!isLoading && (
            <form onSubmit={this.handleFormSubmit.bind(this)}>
              <Label
                error={fieldErrors.name}
                space={true}
                text="Name"
              >
                <TextInput
                  onChange={this.handleFormChange.bind(this, 'name')}
                  placeholder="mysite.com homepage"
                  value={name}
                />
              </Label>
              
              <Label text="URL" space={true}>
                <TextInput
                  onChange={this.handleFormChange.bind(this, 'url')}
                  placeholder="https://example.com"
                  value={url}
                />
              </Label>

              <Label text="location" space={true}>
                <Dropdown
                  defaultOption="Default"
                  onChange={this.handleFormChange.bind(this, 'location')}
                  options={{
                    'Dulles_MotoG4': 'Dulles, VA (Dulles_MotoG4)',
                    'Dulles_MotoG': 'Dulles, VA (Dulles_MotoG)',
                    'Dulles': 'Dulles, VA',
                    'Dulles_Edge': 'Dulles, VA (Dulles_Edge)',
                    'Dulles_IE11': 'Dulles, VA (Dulles_IE11)',
                    'Dulles_Thinkpad': 'Dulles, VA (Thinkpad T430)',
                    'ec2-us-east-1': 'Virginia USA - EC2',
                    'ec2-us-west-1': 'California, USA - EC2',
                    'ec2-sa-east-1': 'Sao Paulo, Brazil - EC2',
                    'ec2-eu-west-1': 'Ireland - EC2',
                    'London_EC2': 'London, UK - EC2',
                    'ec2-eu-central-1': 'Frankfurt, Germany - EC2',
                    'ap-south-1': 'Mumbai, India - EC2',
                    'ec2-ap-southeast-1':	'Singapore - EC2',
                    'ec2-ap-northeast-2':	'Seoul, Korea - EC2',
                    'ec2-ap-northeast-1':	'Tokyo, Japan - EC2',
                    'ec2-ap-southeast-2':	'Sydney, Australia - EC2'
                  }}
                  value={location}
                />
              </Label>

              <Button accent={true} type="submit">Save</Button>
            </form>
          )}

          <InfoPanel>
            <p>A profile is a pre-defined set of parameters for a test. It includes the URL of the page to be tested, as well as the location of the WebPageTest used.</p>
          </InfoPanel>
        </SplitPanel>
      </Layout>
    )
  }
}

ProfilePage.contentKey = 'ProfilePage'
ProfilePage.requiresAuthentication = true

export default connect(state => ({state}))(ProfilePage)