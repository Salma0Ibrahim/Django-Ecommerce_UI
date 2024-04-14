import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer2 text-muted">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div
              className="company-title"
              style={{
                textAlign: 'left',
                marginTop: '-20px',
                marginBottom: '10px',
              }}
            >
              <span>electric</span>
              <br />
              products
            </div>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="col-lg-3">
            <h5 className="fw-bold mb-4">Useful Links</h5>
            <ul className="list-unstyled mb-0 footer-links">
              <li>
                <a href="#" className="text-reset">
                  Shop All
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Electric Products
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 footerform">
            <h5 className="fw-bold mb-4">send your Feedbacks</h5>
            <input
              type="text"
              className="form-control"
              placeholder="enter your feedback..."
            />
            <button>Add Feedback</button>
          </div>
          <div className="col-lg-2 text-center text-lg-start mb-4 mb-lg-0">
            <h5 className="fw-bold mb-4">contact us</h5>
            <p>Communicate with us to get the best offers.</p>
            <div className="social-icons">
              <button>
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button>
                <FontAwesomeIcon icon={faTwitter} />
              </button>
              <button>
                <FontAwesomeIcon icon={faInstagram} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="mb-0">
          New York, NY 10012, US | info@example.com | +01 234 567 88
        </p>
      </div>
      <div className="text-center mt-3">
        <p className="mb-0">© {new Date().getFullYear()} Electric Products</p>
      </div>
    </footer>
  );
};

export default Footer;
