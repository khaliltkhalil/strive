import React from "react";
import { useParams } from "react-router-dom";
function WorkoutDetails() {
  const { id } = useParams();
  return <div>WorkoutDetails</div>;
}

export default WorkoutDetails;
