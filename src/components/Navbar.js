import React from "react";
import { GrAdd } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
function Navbar() {
  const history = useHistory();
  function handleAddWorkout() {
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let workoutId = 0;
    // send GET request to get any workout on today's date
    fetch(`http://localhost:3000/workouts/?date=${date}`)
      .then((res) => res.json())
      .then((workoutsList) => {
        // if there is an workout already started, get the id
        if (workoutsList.length != 0) {
          workoutId = workoutsList[0].id;
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
              workoutId = createdWorkout.id;
            });
        }
        history.push(`/workouts/${workoutId}`);
      });
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1"></div>
      <div className="flex-none gap-2">
        <button className="btn btn-circle" onClick={handleAddWorkout}>
          <GrAdd className="text-lg" />
        </button>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
