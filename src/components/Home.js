import React, { useContext } from "react";
import NumberOfWorkoutsChart from "./NumberOfWorkoutsChart";

function Home({ user, workouts }) {
  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-2xl">Welcome, {user.firstName}</h1>
      <section className="w-3/4">
        <NumberOfWorkoutsChart workouts={workouts} />
      </section>
    </div>
  );
}

export default Home;
