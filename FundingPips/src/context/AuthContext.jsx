import { createContext, useContext } from "react";

const AuthContext = createContext({ user: null, profile: null });

export const AuthProvider = AuthContext.Provider;
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
