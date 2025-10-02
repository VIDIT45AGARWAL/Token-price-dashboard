import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type {User} from 'firebase/auth'
import type {FC, PropsWithChildren} from 'react'

interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};