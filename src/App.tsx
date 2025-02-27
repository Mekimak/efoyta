import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Overview from "./pages/dashboard/Overview";
import Properties from "./pages/dashboard/Properties";
import SavedHomes from "./pages/dashboard/SavedHomes";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import WebsiteConfig from "./pages/admin/WebsiteConfig";
import ListPropertyPage from "./pages/ListPropertyPage";
import PropertyDetails from "./pages/PropertyDetails";
import RentalHomePage from "./pages/RentalHomePage";
import MessagesPage from "./pages/MessagesPage";
import LandlordDashboardPage from "./pages/LandlordDashboardPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}

        {/* App routes */}
        <Routes>
          <Route path="/" element={<RentalHomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/properties" element={<Properties />} />
          <Route path="/dashboard/saved" element={<SavedHomes />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/config" element={<WebsiteConfig />} />
          <Route path="/list-property" element={<ListPropertyPage />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/landlord" element={<LandlordDashboardPage />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
