import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Workout from "./Workout";
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((res) => res.json())
      .then(setWorkouts);
  }, []);
  const renderedWorkouts = workouts.map((workout) => (
    <Workout key={workout.id} />
  ));

  return <div>{renderedWorkouts}</div>;
}

export default Workouts;
