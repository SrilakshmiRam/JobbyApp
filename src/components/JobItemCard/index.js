import {FaToolbox} from 'react-icons/fa'

import {IoLocation} from 'react-icons/io5'
import {GoStar} from 'react-icons/go'
import './index.css'

const JobItemCard = props => {
  const {cardDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = cardDetails
  return (
    <li className="card-item">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="card-description-heading">Description</h1>
      <p className="card-description">{jobDescription}</p>
      <div className="jobcard-location-container">
        <div className="location-container">
          <IoLocation className="icon" />
          <p className="location">{location}</p>
        </div>
        <div className="Internship-container-item">
          <FaToolbox className="icon" />
          <p className="employement-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default JobItemCard
