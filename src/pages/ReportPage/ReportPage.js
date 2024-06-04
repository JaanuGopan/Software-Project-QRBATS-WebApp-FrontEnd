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

  const [selectedModuleReport, setSelectedModuleReport] = useState(null);
  const [moduleReportList, setModuleReportList] = useState([]);
  const [searchModuleReport, setSearchModuleReport] = useState("");
  const [searchLecturesReport, setSearchLecturesReport] = useState("");
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);
  const [lecturesReportList, setLecturesReportList] = useState([]);
  const [lectureStudentAttendanceList, setLectureStudentAttendanceList] =
    useState([]);
  const [searchLectureStudentAttendance, setSearchLectureStudentAttendance] =
    useState("");

  useEffect(() => {
    handleReloadModuleReportList();
  }, []);

  const handleModuleReportClick = (e) => {
    setSelectedModuleReport(e);
    console.log("Selected ModuleReport:", e);
  };

  const handleReloadModuleReportList = async () => {
    await ModuleService.getModulesByUserId(userId).then((modulesList) => {
      setModuleReportList(modulesList);
      console.log(modulesList);
    });
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

  const handleLoadStudentAttendanceReport = async (lectureId) => {
    await AttendanceService.getAllAttendanceByLectureId(lectureId)
      .then((attendanceList) => {
        setLectureStudentAttendanceList(attendanceList);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      })
      .finally(() => {
        if (lectureStudentAttendanceList.length > 0) {
          setShowLectureStudentAttendanceReportWindow(true);
          setShowLectureReportWindow(false);
          setShowModuleReportWindow(false);
          setShowOverallReportWindow(false);
        }
      });
  };

  const handleOpenLectureReportWindow = async (e) => {
    await handleLoadLectureReport(e);
  };

  const handleOpenLectureAttendanceReportWindow = () => {};

  return (
    <div>
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
              handleOpenOverallReportWindow={() =>
                setShowOverallReportWindow(true)
              }
              handleOpenLecturesReportWindow={(e) =>
                handleOpenLectureReportWindow(e)
              }
            />
          </div>
        )}
        {showOverallReportWindow && (
          <div className="Module-report-Create-module-Dashboard">
            <OverallReportTable />
          </div>
        )}
        {showLectureReportWindow && (
          <div className="module-report-ModuleList">
            <LectureReportTable
              handleOpenLectureAttendanceReportWindow={(lectureId) => {
                handleLoadStudentAttendanceReport(lectureId);
              }}
              lecturesReportList={lecturesReportList}
              //attendedStudentList={(e) => setLectureStudentAttendanceList(e)}
              onLecturesReportClick={(e) => setSelectedLectureReport(e)}
              searchLecturesReport={searchLecturesReport}
            />
            <div className="staff-List-Buttons">
              <NormalButton
                handleClick={() => {
                  setShowLectureReportWindow(false);
                  setShowModuleReportWindow(true);
                  setShowOverallReportWindow(false);
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
                  setShowLectureReportWindow(true);
                  setShowModuleReportWindow(false);
                  setShowOverallReportWindow(false);
                  setShowLectureStudentAttendanceReportWindow(false);
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
      </div>
    </div>
  );
};

export default ReportPage;
