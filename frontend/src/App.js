import "./App.css";
import Register from "./Pages/Authentication/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Verification from "./Pages/Authentication/Verification";
import Login from "./Pages/Authentication/Login";
import Home from "./Pages/Home/Home";
import ForgetPassword from "./Pages/Authentication/ForgetPassword";
import Profile from "./Pages/Profile/Profile";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminPage from "./Pages/Admin/AdminPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/fp" element={<ForgetPassword />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/adminpage" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
