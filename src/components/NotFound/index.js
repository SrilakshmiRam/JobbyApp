import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="notfound-image"
      alt="not found"
    />
    <h1 className="notfound-heading">Page Not Found</h1>
    <p className="notfound-text">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
