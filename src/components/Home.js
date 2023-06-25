import React, { useContext } from "react";
import NumberOfWorkoutsChart from "./NumberOfWorkoutsChart";
import { createBarChartData } from "../utils/helper";

function Home({ user, workouts }) {
  const barChartData = createBarChartData(workouts);
  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-2xl">Welcome, {user.firstName}</h1>
      <section className="w-3/4">
        <NumberOfWorkoutsChart chartData={barChartData} />
      </section>
    </div>
  );
}

export default Home;
