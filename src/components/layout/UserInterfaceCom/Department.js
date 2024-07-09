import React from "react";

const Department = ({ department }) => {
  return (
    <a href={department.link} target="_blank">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        className="cursor-pointer rounded-lg"
      >
        <div style={{ alignItems: "center" }}>
          <img
            style={{
              height: "15rem",
              width: "15rem",
              border: "3px solid #0063A0",
              borderRadius: "20px 20px 0px 0px",
              objectFit: "fill",
            }}
            src={department.imageUrl}
            alt=""
          />
        </div>
        <div
          style={{
            height: "6rem",
            width: "15rem",
            background: "#0077C0",
            marginTop: "-5vh",
            border: "3px solid #0063A0",
            borderRadius: "0px 0px 20px 20px",
          }}
          className="p-3"
        >
          <h3
            style={{ textAlign: "center", color: "white", fontSize: "1.5rem" }}
          >
            {department.title}
          </h3>
        </div>
      </div>
    </a>
  );
};

export default Department;
