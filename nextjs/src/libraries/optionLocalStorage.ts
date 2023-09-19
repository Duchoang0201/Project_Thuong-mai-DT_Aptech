"use-client";

import { useEffect } from "react";

export const getLocalStorage = (name: string) => {
  const result = window.localStorage.getItem(name);
  return result;
};
export const setLocalStorage = (name: string, payload: string) => {
  const result = window.localStorage.setItem(name, payload);
  return result;
};

export const clearLocalStorage = () => {
  const result = window.localStorage.clear();
  return result;
};
