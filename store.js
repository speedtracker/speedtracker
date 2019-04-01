import axios from 'axios'
import * as Constants from './lib/constants'
import Cookies from 'js-cookie'
import {createStore, applyMiddleware} from 'redux'
import {redirectToSignIn, redirectTo} from './lib/redirect'
import thunkMiddleware from 'redux-thunk'

// Action types.
export const actionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SET_API_DATA: 'SET_API_DATA',
  SET_API_STATUS: 'SET_API_STATUS'
}

// Initial store state.
const initialState = {
  accessToken: null,
  apiContentKey: null,
  apiError: null,
  apiData: null,
  apiDataTs: 0,
  apiStatus: Constants.STATUS_IDLE,
  user: null
}

/**
 * Makes a request to the API and returns the response.
 * `accessToken` will be used for authentication if supplied, otherwise
 * the request will be unauthenticated. If `data` is supplied, it will be
 * send as the request body. If `dispatch` is supplied, a 401 will be caught
 * and the `signOut` function will be dispatched automatically.
 *
 * @param {String}   accessToken
 * @param {Object}   data
 * @param {Function} dispatch
 * @param {String}   endpoint
 * @param {String}   method
 */
const makeApiCall = ({
  accessToken,
  data,
  dispatch,
  handle401 = true,
  endpoint,
  method = 'get'
}) => {
  const url = `http://localhost:3095${endpoint}`

  let headers = {
    'content-type': 'application/json'
  }

  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`
  }

  setApiStatus(Constants.STATUS_LOADING)(dispatch)

  return axios({
    data,
    headers,
    method,
    url
  }).then(response => {
    if (response.status === 200) {
      setApiStatus(Constants.STATUS_OK)(dispatch)

      return response.data
    }

    return Promise.reject(response)
  }).catch(({response}) => {
    if (handle401 && response.status === 401) {
      setApiStatus(Constants.STATUS_OK)(dispatch)

      return signOut()(dispatch)  
    }

    setApiStatus(Constants.STATUS_ERROR, {
      error: response
    })(dispatch)

    return Promise.reject(response)
  })
}

/**
 * Initialises the Redux store.
 *
 * @param {Object} initialState 
 */
export function initializeStore (initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  )
}

export const callRemoteAPI = ({
  contentKey,
  data,
  handle401 = true,
  method = 'get',
  endpoint
}) => (dispatch, getState) => {
  const {accessToken} = getState()

  return makeApiCall({
    accessToken,
    data,
    dispatch,
    endpoint,
    handle401,
    method
  }).then(({metadata, results}) => {
    setApiData({
      contentKey,
      data: results,
      metadata
    })(dispatch)
    setApiStatus(Constants.STATUS_OK)(dispatch)
  })
}

/**
 * Action: checks any stored token cookie and validates the token against API.
 * If it's valid, it signs the user in. If not, it signs the user out, removing
 * the cookie.
 */
export const loadAccessToken = accessToken => dispatch => {
  return makeApiCall({
    accessToken,
    dispatch,
    endpoint: '/api/client'
  }).then(data => {
    return dispatch({
      accessToken,
      type: actionTypes.SIGN_IN,
      user: data.results[0]
    })    
  })
}

export const setApiData = ({contentKey, data, metadata}) => dispatch => {
  dispatch({
    contentKey,
    data,
    metadata,
    type: actionTypes.SET_API_DATA
  })
}

export const setApiStatus = (status, {error} = {}) => dispatch => {
  if (error) {
    console.error(error)
  }

  dispatch({
    error,
    status,
    type: actionTypes.SET_API_STATUS
  })
}

/**
 * Action: signs a user in and creates a token cookie.
 * 
 * @param {String} username
 * @param {String} password
 */
export const signIn = ({username, password}) => dispatch => {
  const data = {
    clientId: username,
    secret: password
  }

  return makeApiCall({
    data,
    dispatch,
    endpoint: '/token',
    method: 'post'
  }).then(data => {
    Cookies.set('accessToken', data.accessToken)

    return makeApiCall({
      accessToken: data.accessToken,
      dispatch,
      endpoint: '/api/client',
      method: 'get'
    }).then(({results}) => {
      dispatch({
        accessToken: data.accessToken,
        type: actionTypes.SIGN_IN,
        user: results[0]
      })
    })
  })
}

/**
 * Action: signs a user out and removes the token cookie.
 */
export const signOut = () => dispatch => {
  Cookies.remove('accessToken')

  dispatch({
    type: actionTypes.SIGN_OUT
  })

  redirectToSignIn()
}

/**
 * Store reducer.
 *
 * @param {Object} state
 * @param {String} action 
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_API_DATA:
      return Object.assign({}, state, {
        apiContentKey: action.contentKey,
        apiData: action.data,
        apiDataTs: Date.now(),
        apiMetadata: action.metadata
      })

    case actionTypes.SET_API_STATUS:
      return Object.assign({}, state, {
        apiError: action.error || null,
        apiStatus: action.status
      })

    case actionTypes.SIGN_IN:
      return Object.assign({}, state, {
        accessToken: action.accessToken || state.accessToken,
        user: action.user
      })

    case actionTypes.SIGN_OUT:
      return Object.assign({}, state, {
        accessToken: null,
        user: null
      })

    default:
      return state
  }
}