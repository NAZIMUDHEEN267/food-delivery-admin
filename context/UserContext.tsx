'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storage = localStorage.getItem('user')
    if (storage && !user) {
      setUser(JSON.parse(storage))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
