import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";

function AddWorkout() {
  const [workout, setworkout] = useState({});
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({
    name: "",
    weight: 0,
    reps: 0,
  });

  function handleFormChange(e) {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
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
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // send GET request to get any workout on today's date
    fetch(`http://localhost:3000/workouts/?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        // if there is an workout already started, get all exercises
        if (data.length != 0) {
          fetch(`http://localhost:3000/exercises/?workoutId=${data[0].id}`)
            .then((res) => res.json())
            .then((exercisesList) => {
              setExercises(exercisesList);
              setworkout(data[0]);
            });
        } else {
          // create new workout
          fetch(`http://localhost:3000/workouts/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date,
            }),
          })
            .then((res) => res.json())
            .then((createdWorkout) => {
              setworkout(createdWorkout);
            });
        }
      });
  }, []);

  const renderedExercises = exercises.map((exercise) => (
    <Exercise key={exercise.id} exercise={exercise} />
  ));
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
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 w-full">{renderedExercises}</div>
      </div>
    </div>
  );
}

export default AddWorkout;
