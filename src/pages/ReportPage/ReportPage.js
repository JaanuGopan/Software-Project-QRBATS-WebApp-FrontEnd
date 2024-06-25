import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import "./ReportPage.css";
import ModuleReportTable from "./ModuleReportTable";
import OverallReportTable from "./OverallReportTable";
import LectureReportTable from "./LectureReportTable";
import ModuleService from "../../api/services/ModuleService";
import EventService from "../../api/services/EventService";
import { MdArrowBack } from "react-icons/md";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { BiSolidPrinter } from "react-icons/bi";
import LectureStudentsAttendanceTable from "./LectureStudentsAttendanceTable";
import LectureService from "../../api/services/LectureService";
import AttendanceService from "../../api/services/AttendanceService";
import { ToastContainer, toast } from "react-toastify";
import LectureWithDateReportTable from "./LectureWithDateReportTable";

const ReportPage = () => {
  const user = useSelector(selectUser);
  const { userId } = user || {};
  const [showModuleReportWindow, setShowModuleReportWindow] = useState(true);
  const [showOverallReportWindow, setShowOverallReportWindow] = useState(false);
  const [showLectureReportWindow, setShowLectureReportWindow] = useState(false);
  const [
    showLectureStudentAttendanceReportWindow,
    setShowLectureStudentAttendanceReportWindow,
  ] = useState(false);
  const [showLectureWithDateWindow, setShowLectureWithDateWindow] =
    useState(false);

  const [selectedModuleReport, setSelectedModuleReport] = useState(null);
  const [moduleReportList, setModuleReportList] = useState([]);
  const [searchModuleReport, setSearchModuleReport] = useState("");
  const [searchLecturesReport, setSearchLecturesReport] = useState("");
  const [searchStudentReport, setSearchStudentReport] = useState("");
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);
  const [lecturesReportList, setLecturesReportList] = useState([]);
  const [lectureStudentAttendanceList, setLectureStudentAttendanceList] =
    useState([]);
  const [searchLectureStudentAttendance, setSearchLectureStudentAttendance] =
    useState("");
  const [studentAttendanceDetails, setStudentAttendanceDetails] = useState([]);

  useEffect(() => {
    handleReloadModuleReportList();
  }, []);

  const handleModuleReportClick = (e) => {
    setSelectedModuleReport(e);
    console.log("Selected ModuleReport:", e);
  };

  const handleReloadModuleReportList = async () => {
    try {
      const modulesList = await ModuleService.getModulesByUserId(userId);
      setModuleReportList(modulesList);
      console.log(modulesList);
    } catch (error) {
      console.error("Error reloading module report list:", error);
    }
  };

  const handleLoadLectureReport = async (moduleCode) => {
    try {
      const response = await LectureService.getAllLecturesByModuleCode(
        moduleCode
      );
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
      const response =
        await AttendanceService.getAllAttendanceByLectureIdAndDate(
          lectureId,
          date
        );
      if (response.status === 200) {
        setLectureStudentAttendanceList(response.data);
        setShowLectureStudentAttendanceReportWindow(true);
        setShowLectureReportWindow(false);
        setShowModuleReportWindow(false);
        setShowOverallReportWindow(false);
        setShowLectureWithDateWindow(false);
      } else {
        console.error("Error fetching attendance:", response);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleDownloadReport = async (lectureId, date) => {
    try {
      const response =
        await AttendanceService.downloadLectureAttendanceByLectureIdAndDate(
          lectureId,
          date
        );
      if (response.status === 200) {
        const data = response.data;
        const blob = new Blob([data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `lecture_${selectedLectureWithDate.lectureModuleCode}_attendance_${date}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error("Error in downloading the report.");
      }
    } catch (error) {
      toast.error("An error occurred while downloading the report.");
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
      const response = await AttendanceService.getStudentsAttendanceDetails(
        moduleId
      );
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
        toast.error("Error in getting overall report.");
      }
    } catch (error) {
      toast.error("Error in getting overall report.");
    }
  };

  const [lectureWithDateList, setLectureWithDateList] = useState([]);
  const [searchLectureWithDate, setSearchLectureWithDate] = useState("");
  const [selectedLectureWithDate, setSelectedLectureWithDate] = useState(null);

  const handleLoadLectureWithDateList = async (lectureId) => {
    try {
      setLectureWithDateList([]);
      const response = await LectureService.getAllLectureWithDateByLectureId(
        lectureId
      );
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
        toast.error("Error In Getting Lecture With Date List.");
      }
    } catch (error) {
      toast.error("Error In Getting Lecture With Date List.");
    }
  };

  const handleOverallReportDownload = async () => {
    try {
      const response =
        await AttendanceService.downloadOverallStudentReportByModuleId(
          moduleId
        );
      if (response.status === 200) {
        const data = response.data;
        const blob = new Blob([data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `module_${selectedModuleReport.moduleCode}_students_report.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error("Error in downloading the report.");
      }
    } catch (error) {
      toast.error("An error occurred while downloading the report.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="module-report-Dash">
        <div className="module-report-SearchEvent">
          <p className="module-report-mainHead">Modules Report</p>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "150px",
              padding: "3px 40px",
              border: "0.5px solid black",
              borderRadius: "5px",
              textAlign: "center",
            }}
            onChange={(e) => setSearchModuleReport(e.target.value)}
          />
        </div>
        {showModuleReportWindow && (
          <div className="module-report-ModuleList">
            <ModuleReportTable
              modulesReportList={moduleReportList}
              onModuleReportClick={handleModuleReportClick}
              searchModuleReport={searchModuleReport}
              handleModuleReportReload={handleReloadModuleReportList}
              handleOpenOverallReportWindow={(moduleId) =>
                handleOpenOverallReportWindow(moduleId)
              }
              handleOpenLecturesReportWindow={(e) => handleLoadLectureReport(e)}
            />
          </div>
        )}
        {showOverallReportWindow && (
          <div className="module-report-ModuleList">
            <OverallReportTable
              search={searchStudentReport}
              studentAttendanceDetails={studentAttendanceDetails}
            />
            <div className="staff-List-Buttons">
              <NormalButton
                handleClick={() => {
                  setShowLectureReportWindow(false);
                  setShowModuleReportWindow(true);
                  setShowOverallReportWindow(false);
                  setShowLectureWithDateWindow(false);
                }}
                title={"Back"}
                titlewithiconicon={<MdArrowBack className="staff-buttonIcon" />}
              />
              <NormalButton
                title={"Print"}
                handleClick={() => {
                  handleOverallReportDownload();
                }}
                titlewithiconicon={
                  <BiSolidPrinter className="staff-buttonIcon" />
                }
              />
            </div>
          </div>
        )}
        {showLectureReportWindow && (
          <div className="module-report-ModuleList">
            <LectureReportTable
              handleOpenLectureWithDateWindow={(lectureId) =>
                handleLoadLectureWithDateList(lectureId)
              }
              lecturesReportList={lecturesReportList}
              onLecturesReportClick={(e) => setSelectedLectureReport(e)}
              searchLecturesReport={searchLecturesReport}
            />
            <div className="staff-List-Buttons">
              <NormalButton
                handleClick={() => {
                  setShowLectureReportWindow(false);
                  setShowModuleReportWindow(true);
                  setShowOverallReportWindow(false);
                  setShowLectureWithDateWindow(false);
                }}
                title={"Back"}
                titlewithiconicon={<MdArrowBack className="staff-buttonIcon" />}
              />
              <NormalButton
                title={"Print"}
                handleClick={() => {}}
                titlewithiconicon={
                  <BiSolidPrinter className="staff-buttonIcon" />
                }
              />
            </div>
          </div>
        )}
        {showLectureWithDateWindow && (
          <div className="module-report-ModuleList">
            <LectureWithDateReportTable
              handleOpenLectureAttendanceReportWindow={(lectureId, date) =>
                handleLoadStudentAttendanceReport(lectureId, date)
              }
              lectureWithDateList={lectureWithDateList}
              onLectureWithDateClick={(e) => setSelectedLectureWithDate(e)}
              searchLectureWithDate={searchLectureWithDate}
            />
            <div className="staff-List-Buttons">
              <NormalButton
                handleClick={() => {
                  setShowLectureReportWindow(true);
                  setShowModuleReportWindow(false);
                  setShowOverallReportWindow(false);
                  setShowLectureWithDateWindow(false);
                }}
                title={"Back"}
                titlewithiconicon={<MdArrowBack className="staff-buttonIcon" />}
              />
              <NormalButton
                title={"Print"}
                handleClick={() => {}}
                titlewithiconicon={
                  <BiSolidPrinter className="staff-buttonIcon" />
                }
              />
            </div>
          </div>
        )}
        {showLectureStudentAttendanceReportWindow && (
          <div className="module-report-ModuleList">
            <LectureStudentsAttendanceTable
              attendanceList={lectureStudentAttendanceList}
              search={searchLectureStudentAttendance}
            />
            <div className="staff-List-Buttons">
              <NormalButton
                handleClick={() => {
                  setShowLectureReportWindow(false);
                  setShowModuleReportWindow(false);
                  setShowOverallReportWindow(false);
                  setShowLectureStudentAttendanceReportWindow(false);
                  setShowLectureWithDateWindow(true);
                }}
                title={"Back"}
                titlewithiconicon={<MdArrowBack className="staff-buttonIcon" />}
              />
              <NormalButton
                title={"Print"}
                handleClick={() =>
                  handleDownloadReport(
                    selectedLectureWithDate.lectureId,
                    selectedLectureWithDate.lectureDate
                  )
                }
                titlewithiconicon={
                  <BiSolidPrinter className="staff-buttonIcon" />
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
