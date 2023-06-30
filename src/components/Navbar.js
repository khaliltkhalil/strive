import React from "react";
import { GrAdd } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo.png";

const api_url = process.env.REACT_APP_API_URL;

function Navbar({ onAddWorkout }) {
  const history = useHistory();
  function handleAddWorkout() {
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // send GET request to get any workout on today's date
    fetch(`${api_url}/workouts/?date=${date}`)
      .then((res) => res.json())
      .then((workoutsList) => {
        // if there is an workout already started, get the id
        if (workoutsList.length !== 0) {
          history.push(`/workouts/${workoutsList[0].id}`);
        } else {
          // create new workout
          fetch(`${api_url}/workouts/`, {
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
              onAddWorkout(createdWorkout);
              history.push(`/workouts/${createdWorkout.id}`);
            });
        }
      });
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1"></div>
      <div className="flex-none gap-2">
        <button className="btn btn-circle" onClick={handleAddWorkout}>
          <GrAdd className="text-lg" />
        </button>

        <div className="dropdown dropdown-end z-20">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={logo} alt="logo" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
