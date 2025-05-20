import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const getStoredUser = () => {
  const user = localStorage.getItem('earthscope_user');
  return user ? JSON.parse(user) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('earthscope_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('earthscope_user');
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const updateProfile = (updates) => setUser((u) => ({ ...u, ...updates }));

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
