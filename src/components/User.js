import React from 'react'
import PropTypes from 'prop-types'

export class User extends React.Component {
  renderTemplate = () => {
    const { name, error, isFetching, isAuthenticated } = this.props

    if (error) {
      return <p>Во время запроса произошла ошибка, обновите страницу</p>
    }

    if (isFetching) {
      return <p>Загружаю...</p>
    }

    if (isAuthenticated) {
      return (
        <div>
          <p>Привет, {name}!</p>
          <button className="btn" onClick={this.props.handleLogout}>
            Выйти
          </button>
        </div>
      )
    } else {
      return (
        <button className="btn" onClick={this.props.handleLogin}>
          Войти
        </button>
      )
    }
  }
  render() {
    return <div className="ib user">{this.renderTemplate()}</div>
  }
}

User.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
}
