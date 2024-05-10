import React, { useState, useEffect } from "react";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdArrowBack, MdCreateNewFolder } from "react-icons/md";
import { BiSolidPrinter } from "react-icons/bi";
import ModuleTable from "./ModuleTable";
import ModuleService from "../../api/services/ModuleService";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import ModuleUpdate from "./ModuleUpdate";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./ModulePage.css";
import ModuleCreate from "./ModuleCreate";

const ModulePage = () => {
  const user = useSelector(selectUser);
  const { userId } = user || {};

  const [showModuleTable, setShowModuleTable] = useState(true);
  const [showUpdateModuleWindow, setShowUpdateModuleWindow] = useState(false);
  const [showModuleCreateWindow, setShowModuleCreateWindow] = useState(false);

  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [searchModule, setSearchModule] = useState("");

  useEffect(() => {
    handleReloadModuleList();
  }, []);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    console.log("Selected Module:", module);
  };

  const handleReloadModuleList = async () => {
    ModuleService.getModulesByUserId(userId).then((modules) => {
      setModuleList(modules);
      console.log(modules);
    });
  };

  const handleOpenUpdateModuleWindow = () => {
    setShowModuleTable(false);
    setShowUpdateModuleWindow(true);
  };

  return (
    <div>
      <div className="module-Dash">
        <div className="module-SearchEvent">
          <p className="module-mainHead">Modules</p>
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
            onChange={(e) => setSearchModule(e.target.value)}
          />
        </div>
        <div className="module-EventList">
          <ModuleTable
            modulesList={moduleList}
            onModuleClick={handleModuleClick}
            searchModule={searchModule}
            handleDeleteModule={() => {}}
            handleOpenCreateModuleWindow={() => {}}
            handleOpenUpdateModuleWindow={() => {
              setShowUpdateModuleWindow(true);
            }}
          />

          <div className="module-List-Buttons">
            <NormalButton
              handleClick={() => {
                setShowModuleCreateWindow(true);
              }}
              title={"Create"}
              titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            />
            <NormalButton
              title={"Delete"}
              handleClick={() => {}}
              titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
            />
          </div>
        </div>
        {showUpdateModuleWindow && (
          <div
            className="event-Create-Event-Dashboard"
            handleClick={() => {
              setShowModuleCreateWindow(false);
            }}
          >
            <ModuleUpdate
              selectedModule={selectedModule}
              handleCloseUpdateWindow={() => {}}
              handleUpdateModule={() => {}}
              reloadModuleList={handleReloadModuleList}
            />
          </div>
        )}
        {showModuleCreateWindow && (
          <div
            className="event-Create-Event-Dashboard"
            handleClick={() => {
              setShowUpdateModuleWindow(false);
            }}
          >
            <ModuleCreate
              handleCloseModuleCreateWindow={() => {
                setShowModuleCreateWindow(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
