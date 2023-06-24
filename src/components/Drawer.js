import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Switch, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Workouts from "./Workouts";
import AddWorkout from "./Workout";
import Workout from "./Workout";
import Exercise from "./Exercise";
import Profile from "./Profile";

function Drawer() {
  const [user, setUser] = useState({});
  const [workouts, setWorkouts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function handleProfileSubmit(e, formData) {
    e.preventDefault();
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
      });
  }

  useEffect(() => {
    fetch("http://localhost:3000/users/1")
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
        fetch("http://localhost:3000/workouts?_embed=exercises")
          .then((res) => res.json())
          .then((workoutData) => {
            setWorkouts(workoutData);
            setIsLoading(false);
          });
      });
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <label
        htmlFor="my-drawer-2"
        className="btn btn-square btn-ghost m-2 lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <div className="drawer-content flex flex-col m-5">
        {/* Page content here */}
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} onSubmit={handleProfileSubmit} />
          </Route>
          <Route path="/workouts/add">
            <AddWorkout />
          </Route>
          <Route exact path="/workouts">
            <Workouts />
          </Route>
          <Route exact path="/workouts/:id">
            <Workout />
          </Route>
          <Route exact path="/workouts/:workoutId/exercises/:exerciseId">
            <Exercise />
          </Route>
        </Switch>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}

          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/workouts">Workouts</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
