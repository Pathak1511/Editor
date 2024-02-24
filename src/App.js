import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import MainEditor from "./page-temp/MainEditor";
import Dashboard from "./dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import SignUp from "./pages/Signup";
import FuzzyOverlayError from "./dashboard/Error";
import { useSelector } from "react-redux";

function App() {
  let user = useSelector((state) => {
    return state.users.isAuthorized;
  });
  return (
    <>
      {/* toast */}
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-coding-env" element={<Signin />} />
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/editor/:id"
            element={user ? <MainEditor /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<FuzzyOverlayError error={true} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
