import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
function Home() {
  const { user, setUser } = useContext(AppContext);

  return (
    <div>
      <h1>Home</h1>
      <h1>{user.firstName}</h1>
    </div>
  );
}

export default Home;
