import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './aboutUs.css';
import {
  faHome,
  faLock,
  faMessage,
  faPaperPlane,
  faPhone,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import cat1 from '../../assets/img/cat1.jpg';

const AboutUs = () => {
  return (
    <div className="container">
      <div className="aboutdiv1">
        <hr />
        <h6>about us</h6>
        <div className="aboutchilddiv">
          <h2>
            If you’re looking for a brand new electric scooter, you’re in the
            right place
          </h2>
        </div>
        <div style={{ padding: '10px 70px' }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
        </div>
      </div>

      <div className="aboutbox">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <img
              className="img-fluid"
              src={cat1}
              height="100"
              width="100"
              alt=""
            />
          </div>
          <div className="col-md-4 aboutbox2">
            <h1>Don't miss out our special offers</h1>
            <p>
              lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem
              ispum{' '}
            </p>
            <button>shop now</button>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>

      <div className="aboutdiv1">
        <hr />
        <h3 style={{ fontWeight: 'bolder' }}>Contact Us</h3>
        <div className="aboutchilddiv2">
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et labore.
          </h4>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4 aboutdiv2">
              <div className="abouticon">
                <FontAwesomeIcon icon={faHome} />
              </div>
              <h5>Buttonwood, California.</h5>
              <p>Rosemead, CA 91770</p>
            </div>
            <div className="col-md-4 aboutdiv2">
              <div className="abouticon">
                <FontAwesomeIcon icon={faMessage} />
              </div>
              <h5>support@colorlib.com</h5>
              <p>Send us your query anytime!</p>
            </div>
            <div className="col-md-4 aboutdiv2">
              <div className="abouticon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h5>+1 253 565 2365</h5>
              <p>Mon to Fri 9am to 6pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
