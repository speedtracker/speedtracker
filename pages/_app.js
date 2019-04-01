import App, {Container} from 'next/app'
import React from 'react'
import addReduxStore from '../lib/add-redux-store'
import {redirectToSignIn} from '../lib/redirect'
import {Provider} from 'react-redux'
import {loadAccessToken} from '../store'
import {withRouter} from 'next/router'

class SpeedTrackerApp extends App {
  static async getInitialProps ({Component, ctx}) {
    const {reduxStore, req} = ctx
    const {dispatch, getState} = reduxStore
    const {requiresAuthentication} = Component

    let pageProps = {}

    if (!req) return {pageProps}

    // Let's try to find an `accessToken` cookie in the request.
    const cookieString = req.headers.cookie || ''
    const cookies = cookieString.split(';').reduce((cookies, cookie) => {
      const parts = cookie.split('=')
      const name = parts[0].trim()
      const value = parts[1]

      cookies[name] = value

      return cookies
    }, {})
    const redirectIfNeeded = () => {
      if (requiresAuthentication) {
        redirectToSignIn({res: ctx.res, status: 301})
      }
    }

    if (!cookies.accessToken) {
      redirectIfNeeded()

      return {pageProps}
    }

    try {
      await loadAccessToken(cookies.accessToken)(dispatch)

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ctx})
      }

      if (Component.getInitialData) {
        await Component.getInitialData(dispatch, getState)
      }
    } catch (error) {
      redirectIfNeeded()
    }
  }

  render () {
    const {Component, pageProps, reduxStore, router} = this.props

    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} router={router}/>
        </Provider>
      </Container>
    )
  }
}

export default addReduxStore(withRouter(SpeedTrackerApp))