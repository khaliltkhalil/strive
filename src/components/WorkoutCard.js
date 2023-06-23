import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WorkoutCard({ workout }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/Exercises/?workoutId=${workout.id}`)
      .then((res) => res.json())
      .then((exercisesData) => {
        setExercises(exercisesData);
      });
  }, []);
  const renderedExercises = exercises.map((exercise) => (
    <li>{exercise.name}</li>
  ));
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{workout.date}</h2>
        <ul className="flex gap-2 flex-wrap">{renderedExercises}</ul>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" to={`/workouts/${workout.id}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;
