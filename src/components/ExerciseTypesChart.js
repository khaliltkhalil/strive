import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

function ExerciseTypesChart({ chartData }) {
  const [selectedYear, setSelectedYear] = useState(Object.keys(chartData)[0]);

  const renderYearsList = Object.keys(chartData).map((year) => (
    <option className="" key={year} value={year}>
      {year}
    </option>
  ));
  return (
    <div>
      <div className="ml-16 flex items-center">
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          className="w-28 select select-primary max-w-xs"
        >
          {renderYearsList}
        </select>
      </div>
      <ResponsiveContainer width="90%" height={250}>
        <PieChart width={730} height={250}>
          <Pie
            data={chartData[selectedYear]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExerciseTypesChart;
