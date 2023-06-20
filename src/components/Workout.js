import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Exercise from "./Exercise";
import Set from "./Set";

function Workout() {
  const [isLoading, setIsLoading] = useState(true);
  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [currentSetId, setCurrentSetId] = useState("");
  const [currExerciseId, setCurrExerciseId] = useState("");
  const [exercise, setExercise] = useState({
    name: "",
    weight: 0,
    reps: 0,
  });

  const { id } = useParams();
  function handleFormChange(e) {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddSet() {
    // if there is no exercise, start a new exercise
    if (!exercise.name) {
      return;
    }
    if (!currExerciseId) {
      fetch(`http://localhost:3000/exercises/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: exercise.name,
          workoutId: workout.id,
        }),
      })
        .then((res) => res.json())
        .then((createdExercise) => {
          setCurrExerciseId(createdExercise.id);
        });
    }

    fetch(`http://localhost:3000/sets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: exercise.weight,
        reps: exercise.reps,
        exerciseId: currExerciseId,
      }),
    })
      .then((res) => res.json())
      .then((createdSet) => {
        setSets([...sets, createdSet]);
      });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!exercise.name) {
      return;
    }
    //check if there is already an exercise for this workout
    console.log(exercises);
    const currentExercise = exercises.find(
      (exerciseItem) => exercise.name === exerciseItem.name
    );
    console.log(currentExercise);
    if (!currentExercise) {
      // send a post request to create the exersise
      fetch(`http://localhost:3000/exercises/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: exercise.name,
          sets: [
            {
              weight: exercise.weight,
              reps: exercise.reps,
            },
          ],
          workoutId: workout.id,
        }),
      })
        .then((res) => res.json())
        .then((createdExercise) => {
          setExercises([createdExercise, ...exercises]);
        });
    } else {
      //  send a patch request to update the exercise
      fetch(`http://localhost:3000/exercises/${currentExercise.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sets: [
            ...currentExercise.sets,
            {
              weight: exercise.weight,
              reps: exercise.reps,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((updatedExercise) => {
          setExercises(
            exercises.map((exerciseItem) => {
              if (exerciseItem.id == currentExercise.id) {
                return updatedExercise;
              }
              return exerciseItem;
            })
          );
        });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/workouts?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data[0]);
      });
    fetch(`http://localhost:3000/exercises/?workoutId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderedExercises = exercises.map((exercise) => (
    <Exercise key={exercise.id} exercise={exercise} />
  ));

  const renderedSets = sets.map((set, index) => <Set key={index} set={set} />);
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-lg">{workout.date}</h1>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
            <div className="form-control w-full max-w-xs gap-4">
              <section>
                <label className="label">
                  <span className="label-text">Exercise Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={handleFormChange}
                  value={exercise.name}
                />
              </section>

              <section className="flex gap-2">
                <label className="label">
                  <span className="label-text">Weight:</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  placeholder=""
                  className="input input-bordered w-1/3 max-w-xs"
                  onChange={handleFormChange}
                  value={exercise.weight}
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
                  value={exercise.reps}
                  onChange={handleFormChange}
                />
              </section>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add Set</button>
            </div>
          </form>
          <section className="w-1/2 flex flex-col gap-1">
            {renderedSets}
          </section>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 w-full">{renderedExercises}</div>
      </div>
    </div>
  );
}

export default Workout;
