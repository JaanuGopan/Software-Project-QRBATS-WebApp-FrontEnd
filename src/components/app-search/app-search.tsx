import React from 'react';
import './app-search.css';

interface AppSearchProps {
  setSearch: (value: string) => void;
}

const AppSearch: React.FC<AppSearchProps> = ({ setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="app-search-input"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default AppSearch;
