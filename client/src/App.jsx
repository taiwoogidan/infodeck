import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router";
import VerifyEmail from "./pages/VerifyEmail";
import ChangeEmail from "./pages/ChangeEmail";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/change-email" element={<ChangeEmail />} />
        <Route path="/onboarding" element={<Dashboard />} />
      </Routes>
    </>
  );
}
