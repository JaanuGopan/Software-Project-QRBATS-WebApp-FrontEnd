import { FaFacebook, FaGooglePlus, FaLinkedin } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import Navigator from '../../components/layout/UserInterfaceCom/Navigator';
import HomePageFirstContainerImageSlide from './HomePageFirstContainerImageSlide';
import './UserInterface.css';

const LandingPage = () => {
  return (
    <div className="userinterface-mainContainer">
      <Navigator />
      <div className="home-page-first-container">
        <div className="home-page-first-container-content-container">
          <h4
            style={{
              color: '#305599',
              marginBottom: '5px',
            }}
          >
            Welcome to SkyTicker
          </h4>
          <p className="home-page-first-container-content">
            QR-CODE BASED ATTENDANCE TRACKING SYSTEM USING GPS LOCATION
          </p>
          <p className="home-page-first-container-content-description">
            Our QR-Code Based Attendance Tracking System for university students leverages GPS
            location to streamline attendance management. Lecturers can effortlessly create and
            oversee lectures and events, while students mark attendance by scanning a QR code with a
            mobile app. GPS verification ensures accurate logging, making the process efficient and
            reliable.
          </p>
        </div>
        <div className="home-page-first-container-image">
          <HomePageFirstContainerImageSlide />
        </div>
      </div>
      <div className="userinterface-container">
        <div className="userinterface-container1">
          <div className="column">
            <div className="row align-items-center">
              <div className="col-auto pe-0">
                <img
                  style={{ width: '80px', padding: '10px' }}
                  src="https://skyticker-mobile.vercel.app/static/media/logo.0046c89c41a6f76706e0.png"
                  alt="SkyTicker Mobile"
                />
              </div>
              <div className="col-auto pe-0">
                <h2
                  style={{
                    color: '#305599',
                    textAlign: 'center',
                    marginBottom: '1px',
                  }}
                >
                  SkyTicker Mobile
                </h2>
              </div>
            </div>

            <p style={{ textAlign: 'justify', margin: '0px' }}>
              Download the SkyTicker mobile app for students to enhance seamless attendance
              tracking. Scan QR codes to mark your attendance quickly and accurately, ensuring you
              never miss a class or event. Stay organized and up to date with SkyTicker!
            </p>

            <div className="row align-items-center">
              <div className="col-auto cursor-pointer">
                <a
                  className="text-decoration-underline"
                  href="https://skyticker-mobile.vercel.app/"
                >
                  Download SkyTicker Mobile App
                </a>
              </div>
            </div>
          </div>
          <div id="contact-us" className="column">
            <div className="row align-items-center">
              <div className="col-auto pe-0">
                <h2
                  style={{
                    color: '#305599',
                    textAlign: 'center',
                    marginBottom: '0px',
                  }}
                >
                  CONTACT US
                </h2>
              </div>
            </div>
            <p
              style={{
                textAlign: 'justify',
                margin: '0px',
                padding: '0% 0% 1% 0%',
              }}
            >
              Faculty of Engineering, University of Ruhuna
            </p>
            <p
              style={{
                textAlign: 'justify',
                margin: '0px',
                padding: '0% 0% 1% 0%',
              }}
            >
              Phone: +94 123 456 789
            </p>
            <p
              style={{
                textAlign: 'justify',
                margin: '0px',
                padding: '0% 0% 5% 0%',
              }}
            >
              Email:{' '}
              <a target="_blank" href="">
                skyticker.uor@gmail.com
              </a>
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <a
                target="_blank"
                style={{ padding: '2%', fontSize: '150%' }}
                href="https://www.facebook.com/EfacUOR/"
              >
                <FaFacebook />
              </a>
              <a
                target="_blank"
                style={{ padding: '2%', fontSize: '150%' }}
                href="https://www.linkedin.com/company/faculty-of-engineering-university-of-ruhuna/"
              >
                <FaLinkedin />
              </a>
              <a
                target="_blank"
                style={{ padding: '2%', fontSize: '150%' }}
                href="https://www.eng.ruh.ac.lk/"
              >
                <FaGooglePlus />
              </a>
              <a
                target="_blank"
                style={{ padding: '2%', fontSize: '150%' }}
                href="https://www.bing.com/maps?osid=1a12c0e8-d599-4d27-9360-eb8f26cecd56&cp=6.074426~80.189124&lvl=15.3&pi=0&imgid=b20374fa-c57a-4e52-81de-eebb1b5e2041&v=2&sV=2&form=S00027"
              >
                <FaMapLocationDot />
              </a>
              <a
                target="_blank"
                style={{ padding: '2%', fontSize: '150%' }}
                href="https://www.youtube.com/@refmedia"
              >
                <IoLogoYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
