import React, { useEffect, useState } from "react";

function AddWorkout() {
  const [workout, setworkout] = useState({});
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // send GET request to get nay workout on today's date
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

  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-lg">{workout.date}</h1>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <form className="flex flex-col gap-2">
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
                />
              </section>

              <section className="flex gap-2">
                <label className="label">
                  <span className="label-text">Weight:</span>
                </label>
                <input
                  type="number"
                  name="name"
                  placeholder=""
                  className="input input-bordered w-1/3 max-w-xs"
                />
                <label className="label"> lbs</label>
              </section>
              <section className="flex gap-2">
                <label className="label">
                  <span className="label-text">Reps:</span>
                </label>
                <input
                  type="number"
                  name="name"
                  placeholder=""
                  className="input input-bordered w-1/3 max-w-xs"
                />
              </section>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add Set</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddWorkout;
