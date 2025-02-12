import React, { useState, useEffect } from 'react';
import './StaffA.css';
import NormalButton from '../../components/layout/AdminDashboardComponent/NormalButton';
import { MdCreateNewFolder } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import CreateStaff from './CreateStaff';
import UpdateStaff from './UpdateStaff';
import StaffTable from '../../components/layout/AdminDashboardComponent/StaffTable';
import DeleteStaffService from '../../api/services/DeleteStaffService';
import { toast, ToastContainer } from 'react-toastify';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import AdminService from '../../api/services/AdminService';

const StaffDashboard = () => {
  const [staffCreatePopUpWindow, setStaffCreatePopUpWindow] = useState(false);
  const [staffUpdatePopUpWindow, setStaffUpdatePopUpWindow] = useState(false);
  const [search, setSearch] = useState('');
  const [staffsList, setStaffsList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    // Fetch the list of staffs from the API
    handleReloadStaffList();
  }, []);

  const handleEventClick = (staffs) => {
    setSelectedStaff(staffs);
    // Do whatever you want with the selected event data
    console.log('Selected Staffs:', staffs);
  };

  const [showDeletePopUpWindow, setShowDeletePopUpWindow] = useState(false);

  const [processingDeleteStaff, setProcessingDeleteStaff] = useState(false);

  const handleDelete = async () => {
    if (!selectedStaff) {
      toast.error('Please select a staff to delete');
      return;
    }
    try {
      setProcessingDeleteStaff(true);
      const response = await DeleteStaffService.deleteStaff(selectedStaff.userId);
      if (response.status === 200) {
        toast.success('Staff Deleted Successfully');
        setSelectedStaff(null);
        handleReloadStaffList();
      } else if (response.status === 400) {
        toast.error(response.data);
      }
    } catch (error) {
      console.log('error ' + error);
      toast.error('Error In Staff Deletion. ');
    } finally {
      setProcessingDeleteStaff(false);
      setShowDeletePopUpWindow(false);
    }
  };

  const handleReloadStaffList = async () => {
    AdminService.fetchStaffs()
      .then((staffs) => {
        setStaffsList(staffs);
      })
      .catch((error) => {
        console.error('Error fetching staffs:', error);
      });
  };

  return (
    <div className="staff-Dash">
      <ToastContainer />
      <div className="staff-SearchEvent">
        <p className="staff-mainHead">Staff Details</p>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: '150px',
            padding: '3px 40px',
            border: '0.5px solid black',
            borderRadius: '5px',
            textAlign: 'center',
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="staff-EventList">
        <StaffTable
          search={search}
          handleUpdateStaff={() => setStaffUpdatePopUpWindow(true)}
          onStaffClick={handleEventClick}
          staffsList={staffsList}
        />
        <div className="staff-List-Buttons">
          <NormalButton
            handleClick={() => setStaffCreatePopUpWindow(true)}
            title={'Create'}
            titlewithiconicon={<MdCreateNewFolder className="staff-buttonIcon" />}
          />
          <NormalButton
            title={'Delete'}
            handleClick={() => {
              if (selectedStaff == null) {
                toast.error('Please Select Staff. ');
              } else {
                setShowDeletePopUpWindow(true);
              }
            }}
            titlewithiconicon={<RiDeleteBin5Fill className="staff-buttonIcon" />}
          />
        </div>
      </div>
      {staffCreatePopUpWindow && (
        <div className="staff-Create-Event-Dashboard">
          <CreateStaff
            handleCloseCreateStaffWindow={() => setStaffCreatePopUpWindow(false)}
            reloadStaffList={handleReloadStaffList}
          />
        </div>
      )}
      {staffUpdatePopUpWindow && (
        <div
          handleClick={() => setStaffCreatePopUpWindow(false)}
          className="staff-Create-Event-Dashboard"
        >
          <UpdateStaff
            handleCloseUpdateStaffWindow={() => setStaffUpdatePopUpWindow(false)}
            selectedStaff={selectedStaff}
            handleReloadStaffList={handleReloadStaffList}
          />
        </div>
      )}
      {showDeletePopUpWindow && selectedStaff && (
        <div className="student-creation-delete-popup-window">
          <WarningPopup
            handleOk={handleDelete}
            handleCloseWarningWindow={() => setShowDeletePopUpWindow(false)}
            buttonText={'Delete'}
            titleText={'Are you sure you want to delete this staff?'}
            processing={processingDeleteStaff}
          />
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
