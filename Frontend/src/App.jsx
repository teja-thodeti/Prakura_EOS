import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Onboarding" element={<Onboarding />} />
                <Route path="/Trasactions" element={<Transactions />} />
                <Route path="/Accounts" element={<Accounts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
