import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SetCard from "./SetCard";

const api_url = process.env.REACT_APP_API_URL;

function Exercise() {
  const { workoutId, exerciseId } = useParams();
  const [workout, setWorkout] = useState({});
  const [exercise, setExercise] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sets, setSets] = useState([]);
  const [currentSetId, setCurrentSetId] = useState("");
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

  function handleBackgroundClick(e) {
    if (e.target.id === "container") {
      setSet({
        weight: 0,
        reps: 0,
      });
      setCurrentSetId("");
    }
  }

  function handleSetClicked(set) {
    setSet({
      weight: set.weight,
      reps: set.reps,
    });
    setCurrentSetId(set.id);
  }

  function handleAddSet(e) {
    e.preventDefault();
    fetch(`${api_url}/sets/`, {
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

  function handleUpdateSet(e) {
    e.preventDefault();
    fetch(`${api_url}/sets/${currentSetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(set),
    })
      .then((res) => res.json())
      .then((updatedSet) => {
        const updatedSets = sets.map((set) => {
          if (set.id === Number(updatedSet.id)) {
            return updatedSet;
          }
          return set;
        });
        setSets(updatedSets);
      });
  }

  function handleDeleteSet(e) {
    e.preventDefault();
    fetch(`${api_url}/sets/${currentSetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        const updatedSet = sets.filter((set) => set.id !== currentSetId);
        setSets(updatedSet);
        setCurrentSetId("");
      });
  }

  useEffect(() => {
    fetch(`${api_url}/sets?exerciseId=${exerciseId}`)
      .then((res) => res.json())
      .then((data) => {
        setSets(data);
      });
  }, [exerciseId]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${api_url}/workouts?id=${workoutId}`)
      .then((res) => res.json())
      .then((workoutData) => {
        setWorkout(workoutData[0]);
        fetch(`${api_url}/exercises/?id=${exerciseId}`)
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
    <SetCard
      key={set.id}
      set={set}
      currentSetID={currentSetId}
      onClick={handleSetClicked}
    />
  ));

  const addSetButton = (
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleAddSet}>
        Add Set
      </button>
    </div>
  );

  const DeleteUpdateButtons = (
    <div className="card-actions justify-end">
      <button className="btn btn-secondary" onClick={handleDeleteSet}>
        Delete
      </button>
      <button className="btn btn-accent" onClick={handleUpdateSet}>
        Update
      </button>
    </div>
  );
  const renderedButtons = currentSetId ? DeleteUpdateButtons : addSetButton;

  return (
    <div
      id="container"
      className="flex flex-col gap-2 items-center"
      onClick={handleBackgroundClick}
    >
      <h1 className="text-lg">{workout.date}</h1>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-lg border-b-4">{exercise.name}</h1>
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
            {renderedButtons}
          </form>
        </div>
      </div>
      {renderedSets}
    </div>
  );
}

export default Exercise;
