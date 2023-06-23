import React from "react";

function SetRow({ set }) {
  return (
    <div className="flex justify-between">
      <div>
        {set.weight} <span>lbs</span>
      </div>
      <div>
        {set.reps} <span>reps</span>
      </div>
    </div>
  );
}

export default SetRow;
