import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Department from "./Department";
import { DepartmentDetails } from "./DepartmentDetails";
import "../../../pages/UserInterface/UserInterface.css";

const AvailableDepartment = () => {
  const responsive = {
    0: { items: 1 },
    900: { items: 2 },
    1400: { items: 3 },
  };

  const items = DepartmentDetails.slice(0, 5).map((item) => (
    <Department department={item} />
  ));

  return (
    <div className="userinterface-departmentslide">
      <h2 style={{ color: "#025587", paddingBottom: "5%" }}>
        Available Department
      </h2>
      <div>
        <AliceCarousel
          items={items}
          autoPlay
          disableButtonsControls
          responsive={responsive}
          infinite
          autoPlayInterval={3000}
        />
      </div>
    </div>
  );
};

export default AvailableDepartment;
