import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Workout from "./Workout";
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
    <Workout key={workout.id} />
  ));
  if (isLoading) {
    return <div>Loading Workouts...</div>;
  }

  return <div>{renderedWorkouts}</div>;
}

export default Workouts;
