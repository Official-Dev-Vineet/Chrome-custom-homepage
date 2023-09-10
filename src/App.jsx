import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorDetails } from "./components/helper/ErrorDetails";
import { Suspense, useEffect, useState } from "react";
import { userContext } from "./Context/Context";
export const App = () => {
  const [user, setUser] = useState({ username: "🫅🏻" });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorDetails />}>
        <Route path="*" element={<>page not found</>} />
      </Route>
    )
  );
  useEffect(() => {
    const localUser = localStorage.getItem("username");
    if (localUser) {
      setUser({ ...user, username: localUser });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </userContext.Provider>
  );
};
