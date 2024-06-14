import React from "react";
import Navigator from "../../components/layout/UserInterfaceCom/Navigator";
import "./UserInterface.css";
import AvailableDepartment from "../../components/layout/UserInterfaceCom/AvailableDepartment";
import Calender from "../../components/layout/UserInterfaceCom/Calender";
import { FaStar, FaMapLocationDot } from "react-icons/fa6";
import { FaFacebook, FaGooglePlus, FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const UserInterface = () => {
  return (
    <div className="userinterface-mainContainer">
      <Navigator />
      <div className="userinterface-backgroundimage">
        <div className="welcomewin">
          <p style={{ color: "white", fontWeight: "bolder", fontSize: "2rem" }}>
            WELCOME TO SKYTICKER
          </p>
          <p className="paragraphStyle">
            QR BASED ATTENDANCE TRACKING SYSTEM USING GPS LOCATION
          </p>
        </div>
      </div>
      <div className="userinterface-container">
        <div className="userinterface-row">
          <AvailableDepartment />
        </div>
        <div className="userinterface-row1">
          <Calender />
        </div>
      </div>
      <div className="userinterface-users">
        <h2 style={{ color: "white", textAlign: "center" }}>USERS</h2>
        <h5 style={{ color: "#FFFFFF", textAlign: "center" }}>
          The Website Useful for
        </h5>
        <div
          style={{
            display: "flex",
            color: "yellow",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "20%",
            paddingRight: "20%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FaStar />
            <h2 style={{ marginLeft: "1rem" }}>Staff</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FaStar />
            <h2 style={{ marginLeft: "1rem" }}>Admin</h2>
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
            Attendance management system keeps track of daily attendance,
            working hours, breaks, login, and logout time. It prevents staff's
            time theft. An attendance management system integrates all
            attendance devices such as smart cards, biometric, and facial
            recognition devices in real-time.
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
        <div className="column">
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
            Phone :- +94 76 650 1380
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
              leodash@gmail.com
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
  );
};

export default UserInterface;