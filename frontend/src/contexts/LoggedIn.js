import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const toggleLogin = () => {
      setIsLoggedIn(!isLoggedIn);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, toggleLogin }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export { AuthContext, AuthProvider };