import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUsers, updateUser as updateUserApi } from '../api/mockApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const login = () => {
    // Show a modal or prompt to select a user
    const userIndex = prompt('Enter user index to login (0 or 1):');
    if (userIndex !== null && (userIndex === '0' || userIndex === '1')) {
      setCurrentUser(users[parseInt(userIndex)]);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = async (updates) => {
    if (currentUser) {
      const updatedUser = await updateUserApi(currentUser.id, updates);
      setCurrentUser(updatedUser);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);