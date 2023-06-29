import React, { useState } from "react";
import logo from "../images/logo.png";
function Profile({ user, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    currentWeight: user.currentWeight,
    targetedWeight: user.targetedWeight,
    currentBodyFat: user.currentBodyFat,
    targetedBodyFat: user.targetedBodyFat,
  });

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-96 h-96 rounded-full border-4 border-black-500/50 overflow-hidden">
        <img src={logo} alt="profile" />
      </div>
      <form
        className="flex flex-col gap-4 max-w-xs w-full"
        onSubmit={(e) => onSubmit(e, formData)}
      >
        <div className="form-control gap-4">
          <section>
            <label className="label">
              <span className="label-text">First Name :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              className="input input-bordered w-full max-w-xs"
            />
          </section>
          <section>
            <label className="label">
              <span className="label-text">Last Name :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              className="input input-bordered w-full max-w-xs"
            />
          </section>
          <section>
            <label className="label">
              <span className="label-text">Current Weight :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleFormChange}
              className="input input-bordered w-full max-w-xs"
            />
          </section>
          <section>
            <label className="label">
              <span className="label-text">Targeted Weight :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="targetedWeight"
              value={formData.targetedWeight}
              onChange={handleFormChange}
              className="input input-bordered w-full max-w-xs"
            />
          </section>
          <section>
            <label className="label">
              <span className="label-text">Current Body Fat % :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="currentBodyFat"
              value={formData.currentBodyFat}
              onChange={handleFormChange}
              className="input input-bordered w-full max-w-xs"
            />
          </section>
          <section>
            <label className="label">
              <span className="label-text">Targeted Body Fat % :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="targetedBodyFat"
              value={formData.targetedBodyFat}
              onChange={handleFormChange}
              className="input input-bordered w-full max-w-xs"
            />
          </section>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
