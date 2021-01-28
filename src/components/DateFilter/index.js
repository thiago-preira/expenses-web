import React from "react";
import { months } from "./DateFilterData.js";
import "./styles.css";

function DateFilter({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
}) {
  const years = [currentYear - 1, currentYear];
  return (
    <div className="date-filter">
      <label htmlFor="month">Month:</label>
      <select
        name="month"
        value={currentMonth}
        className="u-full-width"
        id="month"
        onChange={onMonthChange}
      >
        <option value="">Select</option>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month.month}
          </option>
        ))}
      </select>
      <label htmlFor="toDate">Year:</label>
      <select
        name="year"
        value={currentYear}
        className="u-full-width"
        id="year"
        onChange={onYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DateFilter;
