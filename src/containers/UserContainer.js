import React from 'react'
import { connect } from 'react-redux'
import { User } from '../components/User'
import { LOGIN_REQUEST, LOGOUT } from '../constants/User'
import { getPhotos } from '../actions/PageActions'
//import { getCurrentYear } from '../util/date'

class UserContainer extends React.Component {
  // handleLogin = () => {
  //   const { handleLogin, getPhotos } = this.props
  //   const successCallback = () => {
  //     const year = getCurrentYear()
  //     getPhotos(year)
  //   }

  //   handleLogin(successCallback)
  // }
  handleLogin = () => {
    this.props.handleLogin()
  }

  handleLogout = () => {
    this.props.handleLogout()
  }

  render() {
    const { user } = this.props
    return (
      <User
        name={user.name}
        error={user.error}
        isFetching={user.isFetching}
        isAuthenticated={user.isAuthenticated}
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: () => dispatch({ type: LOGIN_REQUEST }),
    handleLogout: () => dispatch({ type: LOGOUT }),
    getPhotos: year => dispatch(getPhotos(year)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)
