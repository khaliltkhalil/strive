import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Exercise from "./Exercise";
function WorkoutDetails() {
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/exercises/?workoutId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setIsLoading(false);
      });
  }, []);

  const renderedExercises = exercises.map((exercise) => (
    <Exercise key={exercise.id} workout={exercise} />
  ));

  if (isLoading) {
    return <div>Loading Workout Details...</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 w-full">{renderedExercises}</div>
    </div>
  );
}

export default WorkoutDetails;
