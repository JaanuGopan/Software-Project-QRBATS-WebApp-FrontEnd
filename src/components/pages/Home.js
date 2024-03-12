import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../layout/navigationbar/Navbar";

function HomePage() {
  return (
    <div className="container">
      <Navbar />

      <main>
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">WELCOME TO SKY TICKER</h1>
            <p className="col-md-8 fs-4">
              QR BASED ATTENDANCE TRACKING SYSTEM USING GPS LOCATION
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
