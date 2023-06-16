import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Workout from "./Workout";
import Filter from "./Filter";
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/workouts")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setIsLoading(false);
      });
  }, []);

  const renderedWorkouts = workouts.map((workout) => (
    <Workout key={workout.id} workout={workout} />
  ));

  if (isLoading) {
    return <div>Loading Workouts...</div>;
  }

  return (
    <div>
      <Filter />
      <div className="flex flex-wrap gap-2 w-full">{renderedWorkouts}</div>
    </div>
  );
}

export default Workouts;
