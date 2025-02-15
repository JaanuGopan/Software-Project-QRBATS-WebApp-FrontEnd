import React, { useState, useEffect } from 'react';
import ModuleService from '../../api/services/ModuleService';
import Department from '../../utils/Department';
import './module-table.css'
import { IconButton } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const ModuleTable = ({
  handleOpenUpdateModuleWindow,
  searchModule,
  onModuleClick,
  modulesList,
  handleDeleteModule,
}) => {
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  const departmentList = Department.studentDepartmentList;

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
    <div className="module-table-container">
      <table className="table table-hover">
        <thead className='sticky-header'>
          <tr className='module-table-table-header-row'>
            <th className='col'>No</th>
            <th className='col'>Module Name</th>
            <th className='col'>Module Code</th>
            <th className='col'>Semester</th>
            <th className='col'>Department</th>
            <th className='col'>Edit</th>
          </tr>
        </thead>
        {moduleList.filter(
          (module) =>
            module.moduleName.toLowerCase().includes(searchModule.toLowerCase()) ||
            module.moduleCode.toLowerCase().includes(searchModule.toLowerCase())
        ).length > 0 ? (
          <tbody>
            {moduleList
              .filter(
                (module) =>
                  module.moduleName.toLowerCase().includes(searchModule.toLowerCase()) ||
                  module.moduleCode.toLowerCase().includes(searchModule.toLowerCase())
              )
              .map((module, index) => (
                <tr
                  key={index}
                  onClick={() => handleModuleClick(module)}
                  className={'module-table-row' + (selectedModule === module ? ' module-table-selected-row' : '')}
                >
                  <td>{index + 1}</td>
                  <td>{module.moduleName}</td>
                  <td>{module.moduleCode}</td>
                  <td>{module.semester}</td>
                  <td>{departmentList[module.departmentId - 1]}</td>
                  <td>
                    <div className='row table-action-icons'>
                      <div className='col px-0 d-flex justify-content-center align-items-center'>
                        <IconButton onClick={() => handleOpenUpdateModuleWindow(module)} ><FaEdit color='#0063a0' size={"20px"}/></IconButton>
                      </div>
                      <div className='col ps-0  d-flex justify-content-center align-items-center'>
                        <IconButton onClick={() => handleDeleteModule(module)} ><MdDeleteForever color='#f01e2c' size={"20px"}/></IconButton>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <tbody className='d-flex justify-content-center'>
            <div className='row w-100'>
              <div className='col'>No Data Available</div>
            </div>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ModuleTable;
