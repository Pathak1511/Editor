import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import EditorPage from "./pages/EditorPage";
import MainEditor from "./page-temp/MainEditor";
import { Toaster } from "react-hot-toast";

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
          <Route path="/editor/:id" element={<MainEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
