import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Bills from "./pages/Bills";
import Reports from "./pages/Reports";
import Subscription from "./pages/Subscription";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/Onboarding" element={<Onboarding />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Transactions" element={<Transactions />} />
                <Route path="/Accounts" element={<Accounts />} />
                <Route path="/Budgets" element={<Budgets />} />
                <Route path="/Bills" element={<Bills />} />
                <Route path="/Reports" element={<Reports />} />
                <Route path="/Subscription" element={<Subscription />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
