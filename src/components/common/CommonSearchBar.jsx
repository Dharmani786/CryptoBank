import { addDays, subDays, format } from 'date-fns';
import React, { useState } from 'react';
import Select from 'react-select';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const options = [
  { value: 'HOME', label: 'Home Loan' },
  { value: 'CAR', label: 'Car Loan' },
  { value: 'PERSONAL', label: 'Personal Loan' },
];

const CommonSearchBar = ({ onSearch, onReset }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleDateRangeChange = (value) => {
    setSelectedDateRange(value);
  };

  const handleClearDateRange = () => {
    setSelectedDateRange(null);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSelectedDateRange(null);
    onReset()
  };

  const handleSearch = () => {

    const params = {
      search: selectedOption?.value || '',
        fromDate: selectedDateRange?.[0] ? format(selectedDateRange[0], 'yyyy-MM-dd') : '',
        toDate: selectedDateRange?.[1] ? format(selectedDateRange[1], 'yyyy-MM-dd') : '',
    };
    onSearch(params);
  };

  return (
    <div className="common-srch">
      <div className="date-rnge">
        <DateRangePicker
          className='datepick'
          size="lg"
          placeholder="Start Date - End Date"
          format="yyyy-MM-dd"
          ranges={[]}
          hoverRange={(date) => [subDays(date, 1), addDays(date, 1)]}
          onChange={handleDateRangeChange}
          value={selectedDateRange}
          onClean={handleReset}
        />
         {/* {selectedDateRange && (
        <button onClick={handleReset}>
          Clear Date Range
        </button>
      )} */}
      </div>
      <div className="dropdown">
        <Select
        className='selettt'
          options={options}
          onChange={handleOptionChange}
          value={selectedOption}
          placeholder="Choose an option"
        />
      </div>
      <div className="cmn-btn">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default CommonSearchBar;
