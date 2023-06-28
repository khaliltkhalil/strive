import React, { useContext } from "react";
import NumberOfWorkoutsChart from "./NumberOfWorkoutsChart";
import ExerciseTypesChart from "./ExerciseTypesChart";
import BarChart from "./BarChart";
import { createBarChartData } from "../utils/helper";

function Home({ user, workouts }) {
  const barChartData = createBarChartData(workouts);

  return (
    <div className="flex flex-col items-center gap-16 w-full">
      <h1 className="text-2xl text-center">Welcome, {user.firstName}</h1>
      <section className="w-full flex flex-col items-center gap-20">
        {/* <BarChart /> */}
        <section className="w-full">
          <h1 className="text-xl text-center">Number of Workouts</h1>
          <NumberOfWorkoutsChart chartData={barChartData} />
        </section>
        <section className="w-full">
          <h1 className="text-xl text-center">Exercise Types</h1>
          <ExerciseTypesChart />
        </section>
      </section>
    </div>
  );
}

export default Home;
