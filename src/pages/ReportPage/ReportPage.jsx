import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { BiSolidPrinter } from 'react-icons/bi';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import AttendanceService from '../../api/services/AttendanceService';
import LectureService from '../../api/services/LectureService';
import ModuleService from '../../api/services/ModuleService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import NormalButton from '../../components/buttons/NormalButton';
import { AuthContext } from '../../config/AuthProvider';
import LectureReportTable from './LectureReportTable';
import LectureStudentsAttendanceTable from './LectureStudentsAttendanceTable';
import LectureWithDateReportTable from './LectureWithDateReportTable';
import ModuleReportTable from './module-report-table';
import OverallReportTable from './OverallReportTable';
import './ReportPage.css';

const ReportPage = () => {
  const { user } = useContext(AuthContext);
  const { userId } = user || {};
  const [showModuleReportWindow, setShowModuleReportWindow] = useState(true);
  const [showOverallReportWindow, setShowOverallReportWindow] = useState(false);
  const [showLectureReportWindow, setShowLectureReportWindow] = useState(false);
  const [showLectureStudentAttendanceReportWindow, setShowLectureStudentAttendanceReportWindow] =
    useState(false);
  const [showLectureWithDateWindow, setShowLectureWithDateWindow] = useState(false);

  const [selectedModuleReport, setSelectedModuleReport] = useState(null);
  const [moduleReportList, setModuleReportList] = useState([]);
  const [searchModuleReport, setSearchModuleReport] = useState('');
  const [searchLecturesReport, setSearchLecturesReport] = useState('');
  const [searchStudentReport, setSearchStudentReport] = useState('');
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);
  const [lecturesReportList, setLecturesReportList] = useState([]);
  const [lectureStudentAttendanceList, setLectureStudentAttendanceList] = useState([]);
  const [searchLectureStudentAttendance, setSearchLectureStudentAttendance] = useState('');
  const [studentAttendanceDetails, setStudentAttendanceDetails] = useState([]);

  useEffect(() => {
    handleReloadModuleReportList();
  }, []);

  const handleModuleReportClick = (e) => {
    setSelectedModuleReport(e);
  };

  const handleReloadModuleReportList = async () => {
    try {
      const modulesList = await ModuleService.getModulesByUserId(userId);
      setModuleReportList(modulesList);
    } catch (error) {
      console.error('Error reloading module report list:', error);
    }
  };

  const handleLoadLectureReport = async (moduleCode) => {
    try {
      const response = await LectureService.getAllLecturesByModuleCode(moduleCode);
      if (response) {
        setLecturesReportList(response);
        setShowModuleReportWindow(false);
        setShowLectureReportWindow(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadStudentAttendanceReport = async (lectureId, date) => {
    try {
      const response = await AttendanceService.getAllAttendanceByLectureIdAndDate(lectureId, date);
      if (response.status === 200) {
        setLectureStudentAttendanceList(response.data);
        setShowLectureStudentAttendanceReportWindow(true);
        setShowLectureReportWindow(false);
        setShowModuleReportWindow(false);
        setShowOverallReportWindow(false);
        setShowLectureWithDateWindow(false);
      } else {
        console.error('Error fetching attendance:', response);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const [loadingDownloadReport, setLoadingDownloadReport] = useState(false);

  const handleDownloadReport = async (lectureId, date) => {
    try {
      setLoadingDownloadReport(true);
      const response = await AttendanceService.downloadLectureAttendanceByLectureIdAndDate(
        lectureId,
        date
      );
      if (response.status === 200) {
        const data = response.data;
        const blob = new Blob([data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `lecture_${selectedLectureWithDate.lectureModuleCode}_attendance_${date}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error in downloading the report.');
      }
    } catch (error) {
      toast.error('An error occurred while downloading the report.');
    } finally {
      setLoadingDownloadReport(false);
    }
  };

  const [moduleId, setModuleId] = useState(null);

  const handleOpenOverallReportWindow = async (moduleId) => {
    setStudentAttendanceDetails([]);
    setModuleId(moduleId); // new
    await getAllStudentsAttendanceReport(moduleId);
  };

  const getAllStudentsAttendanceReport = async (moduleId) => {
    try {
      const response = await AttendanceService.getStudentsAttendanceDetails(moduleId);
      if (response.status === 200) {
        setStudentAttendanceDetails(response.data);
        setShowLectureStudentAttendanceReportWindow(false);
        setShowLectureReportWindow(false);
        setShowModuleReportWindow(false);
        setShowOverallReportWindow(true);
        setShowLectureWithDateWindow(false);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error in getting overall report.');
      }
    } catch (error) {
      toast.error('Error in getting overall report.');
    }
  };

  const [lectureWithDateList, setLectureWithDateList] = useState([]);
  const [searchLectureWithDate, setSearchLectureWithDate] = useState('');
  const [selectedLectureWithDate, setSelectedLectureWithDate] = useState(null);

  const handleLoadLectureWithDateList = async (lectureId) => {
    try {
      setLectureWithDateList([]);
      const response = await LectureService.getAllLectureWithDateByLectureId(lectureId);
      if (response.status === 200) {
        setLectureWithDateList(response.data);
        setShowLectureStudentAttendanceReportWindow(false);
        setShowLectureReportWindow(false);
        setShowModuleReportWindow(false);
        setShowOverallReportWindow(false);
        setShowLectureWithDateWindow(true);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error In Getting Lecture With Date List.');
      }
    } catch (error) {
      toast.error('Error In Getting Lecture With Date List.');
    }
  };

  const [loadingDownloadOverallReport, setLoadingDownloadOverallReport] = useState(false);

  const handleOverallReportDownload = async () => {
    try {
      setLoadingDownloadOverallReport(true);
      const response = await AttendanceService.downloadOverallStudentReportByModuleId(moduleId);
      if (response.status === 200) {
        const data = response.data;
        const blob = new Blob([data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `module_${selectedModuleReport.moduleCode}_students_report.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error in downloading the report.');
      }
    } catch (error) {
      toast.error('An error occurred while downloading the report.');
    } finally {
      setLoadingDownloadOverallReport(false);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <div className="row justify-content-between align-items-center my-2">
          <div className="col-auto fs-3 fw-bold ms-4">Modules Report</div>
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
              onChange={(e) => setSearchModuleReport(e.target.value)}
            />
          </div>
        </div>
        {showModuleReportWindow && (
          <AppContentCard>
            <ModuleReportTable
              modulesReportList={moduleReportList}
              onModuleReportClick={handleModuleReportClick}
              searchModuleReport={searchModuleReport}
              handleModuleReportReload={handleReloadModuleReportList}
              handleOpenOverallReportWindow={(moduleId) => handleOpenOverallReportWindow(moduleId)}
              handleOpenLecturesReportWindow={(e) => handleLoadLectureReport(e)}
            />
          </AppContentCard>
        )}
        {showOverallReportWindow && (
          <>
            <AppContentCard hasBottomContents={true}>
              <OverallReportTable
                search={searchStudentReport}
                studentAttendanceDetails={studentAttendanceDetails}
              />
            </AppContentCard>
            <div className="row justify-content-around">
              <div className="col-auto">
                <NormalButton
                  handleClick={() => {
                    setShowLectureReportWindow(false);
                    setShowModuleReportWindow(true);
                    setShowOverallReportWindow(false);
                    setShowLectureWithDateWindow(false);
                  }}
                  title={'Back'}
                  icon={<MdArrowBack className="staff-buttonIcon" />}
                />
              </div>
              <div className="col-auto">
                {loadingDownloadOverallReport ? (
                  <CircularProgress />
                ) : (
                  <NormalButton
                    title={'Print'}
                    handleClick={() => {
                      handleOverallReportDownload();
                    }}
                    icon={<BiSolidPrinter className="staff-buttonIcon" />}
                  />
                )}
              </div>
            </div>
          </>
        )}
        {showLectureReportWindow && (
          <>
            <AppContentCard hasBottomContents={true}>
              <LectureReportTable
                handleOpenLectureWithDateWindow={(lectureId) =>
                  handleLoadLectureWithDateList(lectureId)
                }
                lecturesReportList={lecturesReportList}
                onLecturesReportClick={(e) => setSelectedLectureReport(e)}
                searchLecturesReport={searchLecturesReport}
              />
            </AppContentCard>
            <div className="row justify-content-center">
              <div className="col-auto">
                <NormalButton
                  handleClick={() => {
                    setShowLectureReportWindow(false);
                    setShowModuleReportWindow(true);
                    setShowOverallReportWindow(false);
                    setShowLectureWithDateWindow(false);
                  }}
                  title={'Back'}
                  icon={<MdArrowBack className="staff-buttonIcon" />}
                />
              </div>
            </div>
          </>
        )}
        {showLectureWithDateWindow && (
          <>
            <AppContentCard hasBottomContents={true}>
              <LectureWithDateReportTable
                handleOpenLectureAttendanceReportWindow={(lectureId, date) =>
                  handleLoadStudentAttendanceReport(lectureId, date)
                }
                lectureWithDateList={lectureWithDateList}
                onLectureWithDateClick={(e) => setSelectedLectureWithDate(e)}
                searchLectureWithDate={searchLectureWithDate}
              />
            </AppContentCard>
            <div className="row justify-content-center">
              <div className="col-auto">
                <NormalButton
                  handleClick={() => {
                    setShowLectureReportWindow(true);
                    setShowModuleReportWindow(false);
                    setShowOverallReportWindow(false);
                    setShowLectureWithDateWindow(false);
                  }}
                  title={'Back'}
                  icon={<MdArrowBack className="staff-buttonIcon" />}
                />
              </div>
            </div>
          </>
        )}
        {showLectureStudentAttendanceReportWindow && (
          <>
            <AppContentCard hasBottomContents={true}>
              <LectureStudentsAttendanceTable
                attendanceList={lectureStudentAttendanceList}
                search={searchLectureStudentAttendance}
              />
            </AppContentCard>
            <div className="row justify-content-around">
              <div className="col-auto">
                <NormalButton
                  handleClick={() => {
                    setShowLectureReportWindow(false);
                    setShowModuleReportWindow(false);
                    setShowOverallReportWindow(false);
                    setShowLectureStudentAttendanceReportWindow(false);
                    setShowLectureWithDateWindow(true);
                  }}
                  title={'Back'}
                  icon={<MdArrowBack className="staff-buttonIcon" />}
                />
              </div>
              <div className="col-auto">
                {loadingDownloadReport ? (
                  <CircularProgress />
                ) : (
                  <NormalButton
                    title={'Print'}
                    handleClick={() =>
                      handleDownloadReport(
                        selectedLectureWithDate.lectureId,
                        selectedLectureWithDate.lectureDate
                      )
                    }
                    icon={<BiSolidPrinter className="staff-buttonIcon" />}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
