import React from "react";
import { Link } from "react-router-dom";

function WorkoutCard({ workout }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{workout.date}</h2>

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
