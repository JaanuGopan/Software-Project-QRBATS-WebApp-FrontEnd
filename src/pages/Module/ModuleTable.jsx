import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import ModuleService from "../../api/services/ModuleService";
import { CiViewList } from "react-icons/ci";
import "../AdminDashboard/AdminDashboard.css";
import { BiEdit } from "react-icons/bi";

const ModuleTable = ({
  handleOpenCreateModuleWindow,
  handleOpenUpdateModuleWindow,
  searchModule,
  onModuleClick,
  modulesList,
  handleDeleteModule,
}) => {
  const user = useSelector(selectUser);
  const { userId } = user || {};
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];

  useEffect(() => {
    setModuleList(modulesList);
  }, [modulesList]);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    onModuleClick(module);
  };

  const handleReloadModuleList = async (userId) => {
    ModuleService.getModulesByUserId(userId).then((modules) => {
      setModuleList(modules);
    });
  };

  return (
    <div className="tableDesign">
      <table className="event-report-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Module Name</th>
            <th>Module Code</th>
            <th>Semester</th>
            <th>Department</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {moduleList
            .filter(
              (module) =>
                module.moduleName
                  .toLowerCase()
                  .includes(searchModule.toLowerCase()) ||
                module.moduleCode
                  .toLowerCase()
                  .includes(searchModule.toLowerCase())
            )
            .map((module, index) => (
              <tr
                key={index}
                onClick={() => handleModuleClick(module)}
                className={
                  selectedModule === module ? "selected-row" : "event-row"
                }
              >
                <td>{index + 1}</td>
                <td>{module.moduleName}</td>
                <td>{module.moduleCode}</td>
                <td>{module.semester}</td>
                <td>{departmentList[module.departmentId - 1]}</td>
                <td>
                  <button
                    onClick={handleOpenUpdateModuleWindow}
                    className="ViewButton"
                  >
                    <BiEdit className="EditIcon" />
                    <p className="ViewButtonLabel">Edit</p>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleTable;
