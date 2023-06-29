import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

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
