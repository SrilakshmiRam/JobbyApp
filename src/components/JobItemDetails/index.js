import {Link} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import {FaToolbox, FaExternalLinkAlt} from 'react-icons/fa'

import {IoLocation} from 'react-icons/io5'

import {GoStar} from 'react-icons/go'

import Header from '../Header'
import SkillItem from '../SkillItem'
import JobItemCard from '../JobItemCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsData: {},
    similarJobs: [],
    skillsList: [],
    lifeAtCompanyDetails: {},
  }

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        jobDescription: data.job_details.job_description,
        title: data.job_details.title,
        rating: data.job_details.rating,
        companyLogoUrl: data.job_details.company_logo_url,
        packagePerAnnum: data.job_details.package_per_annum,
        companyWebsiteUrl: data.job_details.company_website_url,
        location: data.job_details.location,
        employmentType: data.job_details.employment_type,
      }

      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        jobDescription: eachItem.job_description,
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        title: eachItem.title,
        location: eachItem.location,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsData: updatedData,
        skillsList: updatedData.skills,
        lifeAtCompanyDetails: updatedData.lifeAtCompany,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {jobsData, similarJobs, skillsList, lifeAtCompanyDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      employmentType,
      title,
      location,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobsData
    const {description, imageUrl} = lifeAtCompanyDetails
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="job-item-container">
        <Header />
        <div className="item">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-image"
            />
            <div className="rating-job-container">
              <p className="title">{title}</p>
              <div className="rating-number-container">
                <GoStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="responsive-container">
              <div className="location-container">
                <IoLocation className="icon" />
                <p className="location">{location}</p>
              </div>
              <div className="Internship-container-item">
                <FaToolbox className="icon" />
                <p className="employement-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="separation" />
          <div className="description-visitlink-container">
            <h1 className="description-heading">Description</h1>
            <div>
              <a href={companyWebsiteUrl} className="visit">
                Visit
              </a>
              <FaExternalLinkAlt />
            </div>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skillsList.map(eachSkill => (
              <SkillItem skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="LAC-heading">Life at Company</h1>
          <div className="LACDetails-container">
            <p className="lac-description">{description}</p>
            <img src={imageUrl} alt="life at company" className="image-lac" />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="jobcards-list">
          {similarJobs.map(eachCardItem => (
            <JobItemCard cardDetails={eachCardItem} key={eachCardItem.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default JobItemDetails
