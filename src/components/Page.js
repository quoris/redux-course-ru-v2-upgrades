import React from 'react'
import PropTypes from 'prop-types'
import PhotoManager from './PhotoManager'

export class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isNeedGetPhotosAfterAuth: true }
  }
  onBtnClick = e => {
    const { isAuthenticated, getPhotos } = this.props

    if (isAuthenticated) {
      const year = +e.currentTarget.innerText
      localStorage.setItem('selectedYear', year)
      getPhotos(+localStorage.getItem('selectedYear'))
    }
  }

  renderButtons = () => {
    const { years } = this.props

    return years.map((item, index) => {
      return (
        <button key={index} className="btn" onClick={this.onBtnClick}>
          {item}
        </button>
      )
    })
  }

  renderTemplate = () => {
    const { photos, isFetching, isAuthenticated, error } = this.props

    if (isAuthenticated) {
      if (error) {
        return <p className="error">Во время загрузки фото произошла ошибка</p>
      }

      if (isFetching) {
        return <p>Загрузка...</p>
      } else {
        if (photos.length === 0) {
          return <p>У Вас нет фотографий за указанный год</p>
        } else {
          return <PhotoManager photos={photos} />
        }
      }
    }
  }

  render() {
    const { year, photos } = this.props
    return (
      <div className="ib page">
        <p>{this.renderButtons()}</p>
        <h3>
          {year} год [{photos.length}]
        </h3>
        {this.renderTemplate()}
      </div>
    )
  }

  componentDidUpdate() {
    const { year, getPhotos } = this.props
    if (this.state.isNeedGetPhotosAfterAuth) {
      localStorage.setItem('selectedYear', year)
      getPhotos(+localStorage.getItem('selectedYear'))
      this.setState({ isNeedGetPhotosAfterAuth: false })
    }
  }

  componentDidMount() {
    const { year, getPhotos, isAuthenticated } = this.props
    if (isAuthenticated) {
      getPhotos(
        localStorage.getItem('selectedYear')
          ? +localStorage.getItem('selectedYear')
          : year
      )
    }
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  years: PropTypes.array.isRequired,
}
