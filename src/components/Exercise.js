import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Set from "./Set";

function Exercise() {
  const { workoutId, exerciseId } = useParams();
  const [workout, setWorkout] = useState({});
  const [exercise, setExercise] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sets, setSets] = useState([]);
  const [set, setSet] = useState({
    weight: 0,
    reps: 0,
  });

  function handleSetChange(e) {
    setSet({
      ...set,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddSet(e) {
    e.preventDefault();
    console.log({
      ...set,
      exerciseId,
    });
    fetch(`http://localhost:3000/sets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...set,
        exerciseId,
      }),
    })
      .then((res) => res.json())
      .then((createdSet) => {
        setSets([...sets, createdSet]);
      });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/sets?exerciseId=${exerciseId}`)
      .then((res) => res.json())
      .then((data) => {
        setSets(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/workouts?id=${workoutId}`)
      .then((res) => res.json())
      .then((workoutData) => {
        setWorkout(workoutData[0]);
        fetch(`http://localhost:3000/exercises/?id=${exerciseId}`)
          .then((res) => res.json())
          .then((exerciseData) => {
            setExercise(exerciseData[0]);
            setIsLoading(false);
          });
      });
  }, [workoutId, exerciseId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const renderedSets = sets.map((set) => (
    <div className="card w-96 bg-base-100 p-8 shadow-xl">
      <Set key={set.index} set={set} />
    </div>
  ));
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-lg">{workout.date}</h1>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-lg">{exercise.name}</h1>
          <form className="flex flex-col gap-2">
            <div className="form-control w-full max-w-xs gap-4">
              <section className="flex gap-2">
                <label className="label">
                  <span className="label-text">Weight:</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  placeholder=""
                  className="input input-bordered w-1/3 max-w-xs"
                  onChange={handleSetChange}
                  value={set.weight}
                />
                <label className="label"> lbs</label>
              </section>

              <section className="flex gap-2">
                <label className="label">
                  <span className="label-text">Reps:</span>
                </label>
                <input
                  type="number"
                  name="reps"
                  placeholder=""
                  className="input input-bordered w-1/3 max-w-xs"
                  value={set.reps}
                  onChange={handleSetChange}
                />
              </section>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleAddSet}>
                Add Set
              </button>
            </div>
          </form>
        </div>
      </div>
      {renderedSets}
    </div>
  );
}

export default Exercise;
