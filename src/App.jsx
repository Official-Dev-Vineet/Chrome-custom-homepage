import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorDetails } from "./helper/ErrorDetails";
import { Suspense, useLayoutEffect, useState } from "react";
import { darkTheme, lightTheme, userContext } from "./Context/Context";
export const App = () => {
  const [user, setUser] = useState({ username: localStorage.getItem("username") || "🫅🏻" });
  const [accentColor, setAccentColor] = useState(localStorage.getItem("accentColor") || "#2d7bf9")
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("userTheme") || "dark")
  const [frameLink, setFrameLink] = useState(localStorage.getItem("frameLink") || "")
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || [])
  // const [bookmark,setBookmark] = useState(localStorage.getItem("bookmark") || [])
  // const [searchEngine, setSearchEngine] = useState(localStorage.getItem("searchEngine") || "algolia")
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--primary", accentColor)
  }, [accentColor])
  useLayoutEffect(() => {
    currentTheme === "light" ? lightTheme() : currentTheme === "dark" ? darkTheme() : null
    localStorage.setItem("userTheme", currentTheme)
  }, [currentTheme])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorDetails />}>
        <Route path="*" element={<>page not found</>} />
      </Route>
    )
  );
  return (
    <userContext.Provider value={{ user, setUser, accentColor, setAccentColor, currentTheme, setCurrentTheme, frameLink, setFrameLink, history, setHistory }}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </userContext.Provider>
  );
};
