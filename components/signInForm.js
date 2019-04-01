import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from '../store'
import Button from '../components/button'
import Label from '../components/label'
import TextInput from '../components/textInput'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      username: ''
    }
  }

  handleFormChange (field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  handleFormSubmit (event) {
    const {dispatch} = this.props
    const {username, password} = this.state

    dispatch(
      signIn({username, password})
    )

    event.preventDefault()
  }
  
  render () {
    const {password, username} = this.state

    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <Label
          space={true}
          text="Username"
        >
          <TextInput
            onChange={this.handleFormChange.bind(this, 'username')}
            value={username}
          />
        </Label>

        <Label
          space={true}
          text="Password"
        >
          <TextInput
            onChange={this.handleFormChange.bind(this, 'password')}
            type="password"
            value={password}
          />
        </Label>

        <Button accent={true} type="submit">Sign in</Button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  const {user} = state

  return {user}
}

export default connect(mapStateToProps)(Header)