import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../constants/User'

const initialState = {
  name: localStorage.getItem('userName'),
  error: null,
  isFetching: false,
  isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')),
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case LOGIN_SUCCESS:
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('userName', action.payload)

      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        name: action.payload,
      }

    case LOGIN_FAIL:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.payload.message,
      }

    case LOGOUT:
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userName')

      return {
        ...state,
        name: '',
        isAuthenticated: false,
      }

    default:
      return state
  }
}
