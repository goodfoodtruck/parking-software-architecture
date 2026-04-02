import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "./pages/authentification/App";
import ProfileApp from "./pages/profile/App";
import HomeApp from "./pages/home/App";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import SecretaryApp from "./pages/resources/App";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="pt-16">
                <Routes>
                <Route path="/" element={<HomeApp />} />
                <Route path="/profil" element={<ProfileApp />} />
                <Route path="/dashboard" element={<ManagerDashboard />} />
                <Route path="/login" element={<LoginApp />} />
                <Route path="/resources" element={<SecretaryApp />} />
                <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;