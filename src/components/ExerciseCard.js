import React, { useEffect, useState } from "react";
import SetRow from "./SetRow";
import { Link } from "react-router-dom/";

function ExerciseCard({ exercise, onDeleteClick }) {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/sets/?exerciseId=${exercise.id}`)
      .then((res) => res.json())
      .then((sets) => {
        setSets(sets);
      });
  }, [exercise.id]);
  const renderedSets = sets.map((set) => <SetRow key={set.id} set={set} />);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title border-b-4">{exercise.name}</h2>
        <div className="h-full flex flex-col justify-between gap-3">
          <section className="w-1/2 flex flex-col gap-1">
            {renderedSets}
          </section>
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => onDeleteClick(exercise.id)}
            >
              Delete
            </button>
            <Link
              to={`/workouts/${exercise.workoutId}/exercises/${exercise.id}`}
              className="btn btn-primary"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
