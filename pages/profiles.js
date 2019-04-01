import {callRemoteAPI} from '../store'
import {connect} from 'react-redux'
import Button from '../components/button'
import InfoPanel from '../components/infoPanel'
import Layout from '../components/layout'
import Link from 'next/link'
import SimpleLink from '../components/simpleLink'
import SplitPanel from '../components/splitPanel'

class ProfilesPage extends React.Component {
  static async getInitialData (dispatch, getState) {
    const {user} = getState()
    const {account} = user.data || {}

    return callRemoteAPI({
      contentKey: ProfilesPage.contentKey,
      endpoint: `/1.0/speedtracker/profiles`
    })(dispatch, getState)
  }

  componentDidMount () {
    const {dispatch, state} = this.props
    const {apiContentKey} = state

    // If we have just mounted the component on the server, we must get the
    // initial data.
    if (apiContentKey !== ProfilesPage.contentKey) {
      ProfilesPage.getInitialData(dispatch, () => state)
    }
  }

  render () {
    const {state} = this.props
    const {apiContentKey, apiData, user} = state

    if (!apiData || apiContentKey !== ProfilesPage.contentKey) {
      return null
    }

    return (
      <Layout title="Profiles">
        <SplitPanel>
          <div>
            <ul className="profiles">
              {apiData.map(profile => (
                <li className="profile" key={profile._id}>
                  <SimpleLink
                    as={`/profile/${profile._id}`}
                    href={`/profile?id=${profile._id}`}
                    size="large"
                  >{profile.name}</SimpleLink>
                </li>
              ))}
            </ul>
            
            <Button
              accent={true}
              link="/profile/new"
            >Create new</Button>
          </div>
          
          <InfoPanel>
            <p>A profile is a pre-defined set of parameters for a test. It includes the URL of the page to be tested, as well as the location of the WebPageTest used.</p>
          </InfoPanel>
        </SplitPanel>

        <style jsx>{`
          .profiles {
            margin-bottom: 40px;
          }

          .profile {
            margin-bottom: 15px;
          }
        `}</style>
      </Layout>
    )
  }
}

ProfilesPage.contentKey = 'ProfilesPage'
ProfilesPage.requiresAuthentication = true

export default connect(state => ({state}))(ProfilesPage)