import React, { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function NumberOfWorkoutsChart({ chartData }) {
  const [selectedYear, setSelectedYear] = useState(Object.keys(chartData)[0]);
  //console.log(workouts);

  const renderYearsList = Object.keys(chartData).map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  return (
    <div className="w-full h-64 flex flex-col gap-4">
      <div className="ml-16 flex items-center">
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          className="w-28 select select-primary max-w-xs"
        >
          {renderYearsList}
        </select>
      </div>
      <ResponsiveContainer width="90%">
        <BarChart data={chartData[selectedYear]}>
          <Bar dataKey="numOfWorkouts" fill="#8884d8" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NumberOfWorkoutsChart;
