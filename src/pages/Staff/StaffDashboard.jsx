import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AdminService from '../../api/services/AdminService';
import DeleteStaffService from '../../api/services/DeleteStaffService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import NormalButton from '../../components/buttons/NormalButton';
import StaffTable from '../../components/layout/AdminDashboardComponent/staff-table';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import CreateStaff from './CreateStaff';
import './StaffA.css';
import UpdateStaff from './UpdateStaff';

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
      console.error('error ' + error);
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
    <div className="row">
      <div className="col">
        <div className="row my-2 align-items-center justify-content-between">
          <div className="col-auto ms-4 fs-3 fw-bold">Staff Details</div>
          <div className="col-auto">
            <div className="row align-items-center">
              <div className="col-auto">
                <NormalButton
                  title={'Create Staff'}
                  handleClick={() => setStaffCreatePopUpWindow(true)}
                  icon={<FaPlus className="buttonIcon" />}
                />
              </div>
              <div className="col-auto">
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
            </div>
          </div>
        </div>
        <AppContentCard>
          <StaffTable
            search={search}
            handleUpdateStaff={() => setStaffUpdatePopUpWindow(true)}
            handleDeleteStaff={() => setShowDeletePopUpWindow(true)}
            onStaffClick={handleEventClick}
            staffsList={staffsList}
          />
        </AppContentCard>
        {staffCreatePopUpWindow && (
          <div className="staff-Create-Event-Dashboard">
            <CreateStaff
              handleCloseCreateStaffWindow={() => setStaffCreatePopUpWindow(false)}
              reloadStaffList={handleReloadStaffList}
            />
          </div>
        )}
        {staffUpdatePopUpWindow && (
          <div className="staff-Create-Event-Dashboard">
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
    </div>
  );
};

export default StaffDashboard;
