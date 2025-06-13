import { User } from "firebase/auth";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuth = () => useContext(AuthContext);
