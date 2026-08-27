import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Onboarding" element={<Onboarding />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
