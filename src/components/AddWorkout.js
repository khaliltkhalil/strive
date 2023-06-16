import React from "react";
import { useParams } from "react-router-dom";

function AddWorkout() {
  const { id } = useParams();
  console.log(id);
  return <div>addWorkout</div>;
}

export default AddWorkout;
