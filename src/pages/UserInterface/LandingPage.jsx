import React from "react";
import Navigator from "../../components/layout/UserInterfaceCom/Navigator";
import "./UserInterface.css";
import AvailableDepartment from "../../components/layout/UserInterfaceCom/AvailableDepartment";
import { FaStar, FaMapLocationDot, FaUsers, FaUser } from "react-icons/fa6";
import { FaFacebook, FaGooglePlus, FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import HomePageFirstContainerImageSlide from "./HomePageFirstContainerImageSlide";

const LandingPage = () => {
  return (
    <div className="userinterface-mainContainer">
      <Navigator />
      <div className="home-page-first-container">
        <div className="home-page-first-container-content-container">
          <h4>Welcome to SkyTicker</h4>
          <p className="home-page-first-container-content">
            QR-CODE BASED ATTENDANCE TRACKING SYSTEM USING GPS LOCATION
          </p>
          <p className="home-page-first-container-content-description">
            Our QR-Code Based Attendance Tracking System for university students
            leverages GPS location to streamline attendance management.
            Administrators can effortlessly create and oversee lectures and
            events, while students mark attendance by scanning a QR code with a
            mobile app. GPS verification ensures accurate logging, making the
            process efficient and reliable.
          </p>
        </div>
        <div className="home-page-first-container-image">
          <HomePageFirstContainerImageSlide />
        </div>
      </div>
      <div className="userinterface-container">
        <div className="userinterface-row">
          <AvailableDepartment />
        </div>
        <div className="userinterface-users">
          <h2 style={{ color: "white", textAlign: "center" }}>USERS</h2>
          <h5 style={{ color: "#FFFFFF", textAlign: "center" }}>
            The Website Useful For
          </h5>
          <div
            style={{
              display: "flex",
              color: "yellow",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: "nowrap",
                alignItems: "center",
              }}
            >
              <FaUsers size={20} />
              <h4 style={{ paddingLeft: "5px" }}>Lecture</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: "nowrap",
                alignItems: "center",
              }}
            >
              <FaUser size={20} />
              <h5 style={{ paddingLeft: "5px" }}>Admin</h5>
            </div>
          </div>
        </div>
        <div className="userinterface-container1">
          <div className="column">
            <h2
              style={{
                color: "#305599",
                textAlign: "center",
                marginBottom: "1px",
              }}
            >
              SKYTICKER
            </h2>
            <p style={{ textAlign: "justify", margin: "0px" }}>
              Our QR-Code Based Attendance Tracking System for university
              students leverages GPS location to streamline attendance
              management. Administrators can effortlessly create and oversee
              lectures and events, while students mark attendance by scanning a
              QR code with a mobile app. GPS verification ensures accurate
              logging, making the process efficient and reliable.
            </p>
          </div>
          <div className="column">
            <h2
              style={{
                color: "#305599",
                textAlign: "center",
                marginBottom: "1px",
              }}
            >
              INFO
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <a
                target="_blank"
                style={{ padding: "0% 0% 1% 0%" }}
                href="https://www.ruh.ac.lk/"
              >
                University of Ruhuna
              </a>
              <a target="_blank" href="https://www.eng.ruh.ac.lk">
                Faculty of Engineering
              </a>
            </div>
          </div>
          <div id="contact-us" className="column">
            <h2
              style={{
                color: "#305599",
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              CONTACT US
            </h2>
            <p
              style={{
                textAlign: "justify",
                margin: "0px",
                padding: "0% 0% 1% 0%",
              }}
            >
              Faculty of Engineering, University of Ruhuna
            </p>
            <p
              style={{
                textAlign: "justify",
                margin: "0px",
                padding: "0% 0% 1% 0%",
              }}
            >
              Phone :- +94 75 416 4532
            </p>
            <p
              style={{
                textAlign: "justify",
                margin: "0px",
                padding: "0% 0% 5% 0%",
              }}
            >
              Mail :-{" "}
              <a target="_blank" href="">
                skyticker.uor@gmail.com
              </a>
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <a
                target="_blank"
                style={{ padding: "2%", fontSize: "150%" }}
                href="https://www.facebook.com/EfacUOR/"
              >
                <FaFacebook />
              </a>
              <a
                target="_blank"
                style={{ padding: "2%", fontSize: "150%" }}
                href="https://www.linkedin.com/company/faculty-of-engineering-university-of-ruhuna/"
              >
                <FaLinkedin />
              </a>
              <a
                target="_blank"
                style={{ padding: "2%", fontSize: "150%" }}
                href="https://www.eng.ruh.ac.lk/"
              >
                <FaGooglePlus />
              </a>
              <a
                target="_blank"
                style={{ padding: "2%", fontSize: "150%" }}
                href="https://www.bing.com/maps?osid=1a12c0e8-d599-4d27-9360-eb8f26cecd56&cp=6.074426~80.189124&lvl=15.3&pi=0&imgid=b20374fa-c57a-4e52-81de-eebb1b5e2041&v=2&sV=2&form=S00027"
              >
                <FaMapLocationDot />
              </a>
              <a
                target="_blank"
                style={{ padding: "2%", fontSize: "150%" }}
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
