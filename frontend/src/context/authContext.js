import React, { createContext, useState, useEffect } from 'react';

import UseAuth from './hooks/useAuth';

const Context = createContext();

const AuthProvider = ({ children }) => {
  const {
    authenticated, loading, handleLogin, handleLogout,
  } = UseAuth();

  return (
    <Context.Provider value={{ loading, authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };