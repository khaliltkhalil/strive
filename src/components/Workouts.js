import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import WorkoutCard from "./WorkoutCard";
import Filter from "./Filter";
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("Recent");

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function handleSortChange(e) {
    setSort(e.target.value);
  }

  function sortDescending(a, b) {
    return new Date(a.date) - new Date(b.date);
  }

  function sortAscending(a, b) {
    return new Date(b.date) - new Date(a.date);
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

  let compareFunction = sortAscending;
  if (sort === "Oldest") {
    compareFunction = sortDescending;
  }

  filteredWorkouts.sort(compareFunction);
  const renderedWorkouts = filteredWorkouts.map((workout) => (
    <WorkoutCard key={workout.id} workout={workout} />
  ));

  return (
    <div className="flex flex-col gap-8">
      <Filter
        searchInput={searchInput}
        onSearchChange={handleSearchInputChange}
        sort={sort}
        onSortChange={handleSortChange}
      />
      <div className="flex flex-wrap gap-2 w-full">{renderedWorkouts}</div>
    </div>
  );
}

export default Workouts;
