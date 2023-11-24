import { createContext } from "react";
export const userContext = createContext({});

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const lightTheme=() => {
  document.documentElement.style.setProperty("--dark", "#f7f7f7")
  document.documentElement.style.setProperty("--light", "#202122")
}
export const darkTheme=() => {
  document.documentElement.style.setProperty("--dark", "#202122")
  document.documentElement.style.setProperty("--light", "#f7f7f7")
}