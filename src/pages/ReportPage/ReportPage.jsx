import { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import AttendanceService from '../../api/services/AttendanceService';
import LectureService from '../../api/services/LectureService';
import ModuleService from '../../api/services/ModuleService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import AppSearch from '../../components/app-search/app-search';
import NormalButton from '../../components/buttons/NormalButton';
import LectureReportTable from './LectureReportTable';
import LectureStudentReportTable from './LectureStudentReportTable';
import ModuleReportTable from './module-report-table';
import OverallReportTable from './OverallReportTable';
import './ReportPage.css';

const ReportPage = () => {
  const [showModuleReportWindow, setShowModuleReportWindow] = useState(true);
  const [showOverallReportWindow, setShowOverallReportWindow] = useState(false);
  const [showLectureReportWindow, setShowLectureReportWindow] = useState(false);
  const [showStudentLectureReport, setShowStudentLectureReport] = useState(false);

  const [selectedModuleReport, setSelectedModuleReport] = useState(null);
  const [moduleReportList, setModuleReportList] = useState([]);
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);
  const [lectureList, setLectureList] = useState([]);
  const [selectedModuleFinishedLectureList, setSelectedModuleFinishedLectureList] = useState([]);
  const [lectureStudentAttendanceList, setLectureStudentAttendanceList] = useState([]);
  const [studentAttendanceDetails, setStudentAttendanceDetails] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleReloadModuleReportList();
  }, []);

  const handleModuleReportClick = (e) => {
    setSelectedModuleReport(e);
  };

  const handleReloadModuleReportList = async () => {
    try {
      const modulesList = await ModuleService.getModulesByUserId();
      setModuleReportList(modulesList);
    } catch (error) {
      console.error('Error reloading module report list:', error);
    }
  };

  const handleLoadLectureReport = async (module) => {
    try {
      const response = await LectureService.getAllFinishedLecturesByModuleId(module.id);
      if (response) {
        setLectureList(response);
        setShowModuleReportWindow(false);
        setShowLectureReportWindow(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [moduleId, setModuleId] = useState(null);

  const handleOpenOverallReportWindow = async (moduleId) => {
    setStudentAttendanceDetails([]);
    setModuleId(moduleId);
    await getAllStudentsAttendanceReport(moduleId);
  };

  const getAllStudentsAttendanceReport = async (moduleId) => {
    const responseData = await AttendanceService.getStudentsAttendanceDetails(moduleId);
    const lectureList = await LectureService.getAllFinishedLecturesByModuleId(moduleId);
    setSelectedModuleFinishedLectureList(lectureList);
    setStudentAttendanceDetails(responseData);
    setShowLectureStudentAttendanceReportWindow(false);
    setShowLectureReportWindow(false);
    setShowModuleReportWindow(false);
    setShowOverallReportWindow(true);
    setShowStudentLectureReport(false);
  };

  const [lectureReportList, setLectureReportList] = useState([]);
  const [selectedStudentReport, setSelectedStudentReport] = useState(null);
  const [showLectureStudentAttendanceReportWindow, setShowLectureStudentAttendanceReportWindow] =
    useState(false);

  const handleLoadLectureStudentReportList = async (lectureId) => {
    try {
      setLectureReportList([]);
      const responseData = await LectureService.getLectureReportByLectureId(lectureId);
      setLectureReportList(responseData);
      setShowLectureStudentAttendanceReportWindow(false);
      setShowLectureReportWindow(false);
      setShowModuleReportWindow(false);
      setShowOverallReportWindow(false);
      setShowStudentLectureReport(true);
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

  // 📌 Export Table to Excel
  const exportOverallReportToExcel = (sortedStudents, lectureList) => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        'No',
        'Index Number',
        'Student Name',
        'Finished Lectures',
        'Attended Lectures',
        'Attendance %',
        ...lectureList.map((lec) => lec.lectureDate),
      ],
      ...sortedStudents.map((details, index) => [
        index + 1,
        details.indexNumber,
        details.studentName,
        details.finishedLectureCount,
        details.attendanceCount,
        `${Number(details.attendancePercentage).toFixed(2)} %`,
        ...lectureList.map((lecture) =>
          details.attendedLectureDateList.includes(lecture.lectureDate) ? 'Present' : 'Absent'
        ),
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    XLSX.writeFile(wb, 'Attendance_Report.xlsx');
  };

  return (
    <div className="row">
      <div className="col">
        <div className="row justify-content-between align-items-center my-2">
          <div className="col-auto fs-5 fw-bold ms-4">
            {showLectureReportWindow
              ? `${selectedModuleReport?.moduleName?.slice(0, 30)}${selectedModuleReport?.moduleName?.length > 30 ? '...' : ''} Lectures`
              : showOverallReportWindow
                ? `${selectedModuleReport?.moduleName?.slice(0, 30)}${selectedModuleReport?.moduleName?.length > 30 ? '...' : ''} Overall Report`
                : showStudentLectureReport
                  ? `${selectedModuleReport?.moduleName?.slice(0, 30)}${selectedModuleReport?.moduleName?.length > 30 ? '...' : ''} ${selectedLectureReport?.lectureDate} lecture Report`
                  : 'Modules Report'}
          </div>
          <div className="col-auto">
            <div className="row align-items-center">
              {(showOverallReportWindow || showLectureReportWindow || showStudentLectureReport) && (
                <div className="col-auto">
                  <NormalButton
                    handleClick={() => {
                      if (showOverallReportWindow) {
                        setShowLectureReportWindow(false);
                        setShowModuleReportWindow(true);
                        setShowOverallReportWindow(false);
                        setShowStudentLectureReport(false);
                      } else if (showLectureReportWindow) {
                        setShowLectureReportWindow(false);
                        setShowModuleReportWindow(true);
                        setShowOverallReportWindow(false);
                        setShowStudentLectureReport(false);
                      } else if (showStudentLectureReport) {
                        setShowLectureReportWindow(true);
                        setShowModuleReportWindow(false);
                        setShowOverallReportWindow(false);
                        setShowStudentLectureReport(false);
                      }
                    }}
                    title={'Back'}
                    icon={<MdArrowBack className="staff-buttonIcon" />}
                  />
                </div>
              )}
              <div className="col-auto">
                <AppSearch setSearch={setSearch} />
              </div>
            </div>
          </div>
        </div>
        {showModuleReportWindow && (
          <AppContentCard>
            <ModuleReportTable
              modulesReportList={moduleReportList}
              onModuleReportClick={handleModuleReportClick}
              searchModuleReport={search}
              handleModuleReportReload={handleReloadModuleReportList}
              handleOpenOverallReportWindow={handleOpenOverallReportWindow}
              handleOpenLecturesReportWindow={handleLoadLectureReport}
            />
          </AppContentCard>
        )}
        {showOverallReportWindow && (
          <AppContentCard hasBottomContents={true}>
            <OverallReportTable
              search={search}
              studentAttendanceDetails={studentAttendanceDetails}
              lectureList={selectedModuleFinishedLectureList}
            />
          </AppContentCard>
        )}
        {showLectureReportWindow && (
          <AppContentCard hasBottomContents={true}>
            <LectureReportTable
              handleOpenLectureReport={handleLoadLectureStudentReportList}
              lecturesReportList={lectureList}
              onLecturesReportClick={setSelectedLectureReport}
              searchLecturesReport={search}
            />
          </AppContentCard>
        )}
        {showStudentLectureReport && (
          <AppContentCard hasBottomContents={true}>
            <LectureStudentReportTable
              lectureReportList={lectureReportList}
              onStudentReportClick={setSelectedStudentReport}
              search={search}
              lecture={selectedLectureReport}
            />
          </AppContentCard>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
