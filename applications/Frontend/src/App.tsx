import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "./pages/authentification/App";
import ProfilApp from "./pages/profil/App";
import HomeApp from "./pages/home/App";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/profil" element={<ProfilApp />} />
        <Route path="/dashboard" element={<ManagerDashboard />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;