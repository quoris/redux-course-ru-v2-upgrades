import React from 'react'
import { connect } from 'react-redux'
import { Page } from '../components/Page'
import { GET_PHOTOS_REQUEST } from '../constants/Photos'
import { getLastYears } from '../util/date'

const LAST_5_YEARS = 5

class PageContainer extends React.Component {
  constructor(props) {
    super(props)

    this.years = getLastYears(LAST_5_YEARS)
  }

  render() {
    const { page, isAuthenticated, getPhotos } = this.props
    return (
      <Page
        year={page.year}
        photos={page.photos}
        isFetching={page.isFetching}
        isAuthenticated={isAuthenticated}
        getPhotos={getPhotos}
        error={page.error}
        years={this.years}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    page: store.page,
    isAuthenticated: store.user.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: year => dispatch({ type: GET_PHOTOS_REQUEST, payload: year }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer)
