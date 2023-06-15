import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({ firstName: "khalil", lastName: "Khalil" });
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
