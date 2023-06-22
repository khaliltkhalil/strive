import React, { useEffect, useState } from "react";
import Set from "./Set";

function ExerciseCard({ exercise }) {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/sets/?exerciseId=${exercise.id}`)
      .then((res) => res.json())
      .then((sets) => {
        setSets(sets);
      });
  }, []);
  const renderedSets = sets.map((set) => <Set key={set.id} set={set} />);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title border-b-4">{exercise.name}</h2>
        <div className="h-full flex flex-col justify-between">
          <section className="w-1/2 flex flex-col gap-1">
            {renderedSets}
          </section>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
