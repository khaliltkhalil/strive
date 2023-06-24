import React, { useContext } from "react";

function Home({ user }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">Welcome, {user.firstName}</h1>
      <section>
        <h1>{user.firstName}</h1>
      </section>
    </div>
  );
}

export default Home;
