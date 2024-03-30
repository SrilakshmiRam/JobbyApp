import {GoStar} from 'react-icons/go'

import {FaToolbox} from 'react-icons/fa'

import {IoLocation} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    title,
    rating,
    packagePerAnnum,
    location,
    employmentType,
  } = jobDetails

  return (
    <li className="jobdetails-container">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="company-logo-image"
        />
        <div className="rating-job-container">
          <h1 className="title">{title}</h1>
          <div className="rating-number-container">
            <GoStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-salary-container">
        <div className="location-container">
          <IoLocation className="icon" />
          <p className="location">{location}</p>
        </div>
        <div className="Internship-container-item">
          <FaToolbox className="icon" />
          <p className="employement-type">{employmentType}</p>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
      <hr className="separation" />
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
    </li>
  )
}

export default JobItem
