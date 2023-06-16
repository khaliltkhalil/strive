import { createContext, useState } from "react";
import { outside } from "semver";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({ firstName: "khalil", lastName: "Khalil" });
  const [workouts, setWorkouts] = useState([]);
  return (
    <AppContext.Provider value={{ user, setUser, workouts, setWorkouts }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
