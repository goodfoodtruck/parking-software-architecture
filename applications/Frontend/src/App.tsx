import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "./pages/authentification/App";
import ProfilApp from "./pages/profil/App";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginApp />} />
        <Route path="/profil" element={<ProfilApp />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;