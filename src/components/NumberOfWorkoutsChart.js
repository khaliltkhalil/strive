import React, { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function NumberOfWorkoutsChart({ workouts }) {
  const [selectedYear, setSelectedYear] = useState("2023");
  //console.log(workouts);

  const chartData = {};
  workouts.forEach((workout) => {
    const date = new Date(workout.date);
    const year = date.getFullYear();

    const month = date.toLocaleString("default", {
      month: "short",
    });

    // if year doesnt exist in chartData add it
    if (!chartData[year]) {
      chartData[year] = [
        {
          month: "Jan",
          numOfWorkouts: 0,
        },
        {
          month: "Feb",
          numOfWorkouts: 0,
        },
        {
          month: "Mar",
          numOfWorkouts: 0,
        },
        {
          month: "Apr",
          numOfWorkouts: 0,
        },
        {
          month: "May",
          numOfWorkouts: 0,
        },
        {
          month: "Jun",
          numOfWorkouts: 0,
        },

        {
          month: "Jul",
          numOfWorkouts: 0,
        },
        {
          month: "Aug",
          numOfWorkouts: 0,
        },
        {
          month: "Sep",
          numOfWorkouts: 0,
        },
        {
          month: "Oct",
          numOfWorkouts: 0,
        },
        {
          month: "Nov",
          numOfWorkouts: 0,
        },
        {
          month: "Dec",
          numOfWorkouts: 0,
        },
      ];
    }
    // find the month in the year and increase the number of workouts
    chartData[year].forEach((mon) => {
      if (mon["month"] === month) {
        mon["numOfWorkouts"] += 1;
      }
    });
  });

  const renderYearsList = Object.keys(chartData).map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  return (
    <div className="w-full h-64 flex flex-col gap-4">
      <div className="ml-16">
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          className="w-28 select select-primary max-w-xs"
        >
          {renderYearsList}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={400} height={200} data={chartData[selectedYear]}>
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
