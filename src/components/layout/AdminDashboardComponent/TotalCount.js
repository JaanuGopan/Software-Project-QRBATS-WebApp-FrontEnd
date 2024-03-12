import React from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";
import { FaUsers } from "react-icons/fa";

const TotalCount = () => {
  return (
    <div className="inform">
      <div className="inform1">
        <p
          style={{
            color: "white",
            fontSize: "large",
            fontWeight: "bold",
            padding: "5%",
          }}
        >
          20
        </p>
        <FaUsers style={{ color: "white", padding: "2%", fontSize: "250%" }} />
      </div>
      <p
        style={{
          color: "white",
          fontSize: "large",
          fontWeight: "bold",
          padding: "5%",
        }}
      >
        Total Staff
      </p>
    </div>
  );
};

export default TotalCount;
