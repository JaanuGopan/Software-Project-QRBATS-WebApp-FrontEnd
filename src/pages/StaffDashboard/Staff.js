import React, { Component } from "react";
import { RiUserLine } from "react-icons/ri";
import "./Staff.css"; // You can define your CSS styles in this file
import { FaUsers, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffData: [
        { id: 1, label: "Lecturer", count: 5 },
        { id: 2, label: "Normal Staff", count: 7 },
        { id: 3, label: "Admin", count: 3 },
      ],
    };
  }

  render() {
    return (
      <div className="staff-container">
        <h2>Staff</h2>

        <div className="cards">
          {this.state.staffData.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{ backgroundColor: "#0e7ac8" }}
            >
              <div className="top">
                <div className="icon">
                  <FaUsers />
                </div>
                <div className="bottom">{item.count}</div>
              </div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="table">
          <div className="heading">Normal Staff Details</div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Password</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data, you should replace this with your actual staff data */}
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>johndoe</td>
                <td>****</td>
                <td>
                  <FaEdit />
                </td>
              </tr>
              {/* Add more rows as needed */}
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>johndoe</td>
                <td>****</td>
                <td>
                  <FaEdit />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button className="create-button">
              <FaPlus /> Create Lecturer Account
            </button>
            <button className="delete-button">
              <FaTrashAlt /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Staff;
