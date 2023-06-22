import React from "react";

function SetCard({ set, onClick, currentSetID }) {
  const isSelected = set.id === currentSetID;
  const baseClass = "card w-96 bg-base-100 p-8 shadow-xl";

  return (
    <div
      className={
        isSelected ? baseClass + " border-4 border-indigo-500/50" : baseClass
      }
      onClick={() => onClick(set)}
    >
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
