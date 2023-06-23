import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import WorkoutCard from "./WorkoutCard";
import Filter from "./Filter";
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);
    // get all workouts and includes the exercises
    fetch("http://localhost:3000/workouts?_embed=exercises")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading Workouts...</div>;
  }

  const filteredWorkouts = workouts.filter((workout) => {
    const searchValue = searchInput.toLowerCase().trim();
    // check if any workout date or exercises name match searchValue
    return (
      workout.date.toLowerCase().includes(searchValue) ||
      workout.exercises.some((exercise) =>
        exercise.name.toLowerCase().includes(searchValue)
      )
    );
  });
  const renderedWorkouts = filteredWorkouts.map((workout) => (
    <WorkoutCard key={workout.id} workout={workout} />
  ));

  return (
    <div className="flex flex-col gap-4">
      <Filter
        searchInput={searchInput}
        onSearchChange={handleSearchInputChange}
      />
      <div className="flex flex-wrap gap-2 w-full">{renderedWorkouts}</div>
    </div>
  );
}

export default Workouts;
