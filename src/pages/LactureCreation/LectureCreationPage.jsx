import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import AppContentCard from '../../components/app-content-card/app-content-card';
import LectureTimeTable from './LectureTimeTable';
import SingleLectureCreate from './SingleLectureCreate';

const LectureCreationPage = () => {
  const [selectedLectureCreationMethod, setSelectedLectureCreationMethod] =
    useState('singleLecture');

  return (
    <div className="row py-2">
      <div className="col g-2">
        <div className="row align-items-center mx-1">
          <div className="col">
            <div className="row">
              <div className="col-auto">
                <p className="ms-5 mt-2 fw-bold fs-5">Lecture Creation</p>
              </div>
            </div>
          </div>
          <div className="col-auto d-flex align-items-center pe-0">Create Lectures :</div>
          <div className="col-auto">
            <ToggleButtonGroup
              color="primary"
              value={selectedLectureCreationMethod}
              exclusive
              onChange={(e) => setSelectedLectureCreationMethod(e.target.value)}
              aria-label="Platform"
            >
              <ToggleButton value="singleLecture">Single Lecture</ToggleButton>
              <ToggleButton value="timetable">TimeTable</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {selectedLectureCreationMethod === 'singleLecture' && (
          <AppContentCard>
            <SingleLectureCreate />
          </AppContentCard>
        )}
        {selectedLectureCreationMethod === 'timetable' && (
          <AppContentCard>
            <LectureTimeTable />
          </AppContentCard>
        )}
      </div>
    </div>
  );
};

export default LectureCreationPage;
