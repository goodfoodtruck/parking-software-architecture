import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "./pages/authentification/App";
import ProfileApp from "./pages/profile/App";
import HomeApp from "./pages/home/App";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import SecretaryApp from "./pages/resources/App";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/profil" element={<ProfileApp />} />
        <Route path="/dashboard" element={<ManagerDashboard />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="/resources" element={<SecretaryApp />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;