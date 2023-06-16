import React from "react";
import Set from "./Set";

function Exercise({ exercise }) {
  const renderedSets = exercise.sets.map((set, index) => (
    <Set key={index} set={set} />
  ));
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{exercise.name}</h2>
        <section className="w-1/2 flex flex-col gap-1">{renderedSets}</section>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Exercise;
