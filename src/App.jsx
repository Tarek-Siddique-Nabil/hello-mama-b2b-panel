// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import B2b_Navigation from "./Component/Navigation/B2b_Navigation";
import Login from "./Component/Account/Login";
import FirebaseContextProvider from "./Context Api/AuthContext";
import ContextProvider from "./Context Api/useHooks";
import RequireAuth from "./Firebase/RequireAuth";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <FirebaseContextProvider>
        <ContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <B2b_Navigation />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ContextProvider>
      </FirebaseContextProvider>
      <Toaster />
    </Router>
  );
};

export default App;
