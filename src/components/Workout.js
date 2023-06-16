import React from "react";

function Workout({ workout }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{workout.date}</h2>
        <ul className="flex gap-2">
          {workout.muscles.map((muscle, index) => (
            <li key={index}>{muscle}</li>
          ))}
        </ul>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  );
}

export default Workout;
