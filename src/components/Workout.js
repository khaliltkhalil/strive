import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ExerciseCard from "./ExerciseCard";
import Set from "./SetCard";

function Workout({ onUpdateExercise }) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState("");

  // const [exercise, setExercise] = useState({
  //   name: "",
  //   weight: 0,
  //   reps: 0,
  // });

  const { id } = useParams();

  function handleExerciseNameChange(e) {
    setExerciseName(e.target.value);
  }

  function handleAddExercise(e) {
    e.preventDefault();
    if (!exerciseName) {
      return;
    }

    fetch(`http://localhost:3000/exercises/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: exerciseName,
        workoutId: workout.id,
      }),
    })
      .then((res) => res.json())
      .then((createdExercise) => {
        onUpdateExercise(id, [...exercises, createdExercise]);
        history.push(`/workouts/${id}/exercises/${createdExercise.id}`);
      });
  }

  function handleDeleteExercise(exerciseId) {
    fetch(`http://localhost:3000/exercises/${exerciseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        const updatedExercises = exercises.filter(
          (exercise) => exercise.id !== exerciseId
        );
        onUpdateExercise(id, updatedExercises);
        setExercises(updatedExercises);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/workouts?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data[0]);
        setIsLoading(false);
      });
    fetch(`http://localhost:3000/exercises/?workoutId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderedExercises = exercises.map((exercise) => (
    <ExerciseCard
      key={exercise.id}
      exercise={exercise}
      onDeleteClick={handleDeleteExercise}
    />
  ));

  // const renderedSets = sets.map((set, index) => <Set key={index} set={set} />);
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-lg">{workout.date}</h1>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <form className="flex flex-col gap-2" onSubmit={handleAddExercise}>
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
                  onChange={handleExerciseNameChange}
                  value={exerciseName}
                />
              </section>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Add Exercise</button>
              </div>
            </div>
            {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Add Set</button>
            </div> */}
          </form>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 w-full">{renderedExercises}</div>
      </div>
    </div>
  );
}

export default Workout;
