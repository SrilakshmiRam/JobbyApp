import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const jwtToken = Cookies.get('jwt_token')
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-container">
      <Header />
      <h1 className="main-heading">Find The Job That Fits Your Life</h1>
      <p className="text-para">
        Millions of people are searching for jobs,salary information, company
        reviews.Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="findJobBtn" type="button" onClick={onClickFindJobs}>
          Find Jobs
        </button>
      </Link>
    </div>
  )
}
export default Home
