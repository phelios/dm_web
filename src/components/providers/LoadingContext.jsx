import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: null,
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const value = { isLoading, setIsLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}