import React from "react";

function SetCard({ set }) {
  return (
    <div className="card w-96 bg-base-100 p-8 shadow-xl">
      <div className="flex justify-between">
        <div>
          {set.weight} <span>lbs</span>
        </div>
        <div>
          {set.reps} <span>reps</span>
        </div>
      </div>
    </div>
  );
}

export default SetCard;
