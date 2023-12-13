import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import MainEditor from "./page-temp/MainEditor";
import Dashboard from "./dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import SignUp from "./pages/Signup";

function App() {
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
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:id" element={<MainEditor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
