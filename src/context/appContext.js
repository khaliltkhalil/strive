import { createContext, useState } from "react";

const AppContext = createContext();
const [user, setUser] = useState({ firstName: "khalil", lastName: "Khalil" });

function AppProvider({ children }) {
  return (
    <AppContext.Provider value={(user, setUser)}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
