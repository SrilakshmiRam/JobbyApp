import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
    apiJobStatus: apiStatusConstants.initial,
    employementType: '',
    salary: '',
    searchInput: '',
    jobsList: [],
    checkBoxesList: [],
    noJobsStatus: false,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobDetails = async () => {
    const {searchInput, checkBoxesList, salary} = this.state
    const type = checkBoxesList.join(',')

    const jwtToken = Cookies.get('jwt_token')

    this.setState({
      apiJobStatus: apiStatusConstants.inProgress,
    })

    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${salary}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        jobDescription: eachItem.job_description,
        rating: eachItem.rating,
        title: eachItem.title,
        packagePerAnnum: eachItem.package_per_annum,
        companyLogoUrl: eachItem.company_logo_url,
      }))

      this.setState({
        jobsList: updatedData,
        apiJobStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiJobStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeEmploymentType = event => {
    const {checkBoxesList} = this.state
    if (checkBoxesList.includes(event.target.id)) {
      const updatedList = checkBoxesList.filter(
        each => each !== event.target.id,
      )
      this.setState(
        {
          checkBoxesList: updatedList,
        },
        this.getJobDetails,
      )
    } else {
      this.setState(
        prevState => ({
          checkBoxesList: [...prevState.checkBoxesList, event.target.id],
        }),
        this.getJobDetails,
      )
    }
  }

  onChangeSalary = event => {
    this.setState(
      {
        salary: event.target.id,
      },
      this.getJobDetails,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderProfileSuccessView = () => {
    const {profileDetails, searchInput} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-search-container">
        <div className="search-container1">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-btn"
            onClick={this.onClickSearchBtn}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-heading">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  onClickSearchBtn = () => {
    this.getJobDetails()
  }

  renderProfileFailureView = () => (
    <div className="failure-container">
      <button type="button" onClick={this.onClickRetry} className="RetryBtn">
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderJobsDetailsFailureView = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="RetryBtn"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsLoaderView = () => (
    <div className="jobdetails-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobsList, searchInput} = this.state
    const fileteredList = jobsList.filter(each =>
      each.title.toLowerCase().includes(searchInput),
    )
    const fileteredListLength = fileteredList.length

    return (
      <>
        {fileteredListLength > 0 ? (
          <ul className="jobs-list">
            {fileteredList.map(eachItem => (
              <JobItem jobDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          <div className="noJobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              className="nojobs-image"
              alt="no jobs"
            />
            <h1 className="noJobs-heading">No Jobs Found</h1>
            <p className="text">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderJobsList = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderJobsDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsLoaderView()
      default:
        return null
    }
  }

  render() {
    const {employementType, salary, searchInput, jobsList} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="job-container">
          <div className="employee-details-container">
            <div className="container-profile-details">
              {this.renderProfileDetailsView()}
            </div>
            <hr className="hr-rule" />
            <h1 className="employement-heading">Type Of Employement</h1>
            <ul className="employment-types-list">
              {employmentTypesList.map(eachItem => (
                <li className="employetypes-container" key={eachItem.id}>
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    id={eachItem.employmentTypeId}
                    value={employementType}
                    onChange={this.onChangeEmploymentType}
                  />
                  <label
                    htmlFor={eachItem.employmentTypeId}
                    className="label-input"
                  >
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="hr-rule" />
            <ul className="employment-types-list">
              {salaryRangesList.map(eachItem => (
                <li className="employetypes-container" key={eachItem.id}>
                  <input
                    type="radio"
                    className="radio-input"
                    name="radio"
                    id={eachItem.salaryRangeId}
                    value={salary}
                    onChange={this.onChangeSalary}
                  />
                  <label
                    htmlFor={eachItem.salaryRangeId}
                    className="label-input"
                  >
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-details-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-btn"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
