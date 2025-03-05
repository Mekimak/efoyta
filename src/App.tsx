import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./pages/Login";
import LandlordLogin from "./pages/LandlordLogin";
import SignUpPage from "./pages/SignUp";
import Overview from "./pages/dashboard/Overview";
import Properties from "./pages/dashboard/Properties";
import SavedHomes from "./pages/dashboard/SavedHomes";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import WebsiteConfig from "./pages/admin/WebsiteConfig";
import UsersPage from "./pages/admin/UsersPage";
import ListPropertyPage from "./pages/ListPropertyPage";
import PropertyDetails from "./pages/PropertyDetails";
import RentalHomePage from "./pages/RentalHomePage";
import ResetPassword from "./pages/ResetPassword";
import MessagesPage from "./pages/MessagesPage";
import LandlordDashboardPage from "./pages/LandlordDashboardPage";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PropertiesPage from "./pages/Properties";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/dashboard/Settings";
import AuthRedirect from "./pages/AuthRedirect";
import UserDashboard from "./pages/UserDashboard";
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
          <Route path="/renter-login" element={<LoginPage />} />
          <Route path="/landlord-login" element={<LandlordLogin />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth-redirect" element={<AuthRedirect />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedUserTypes={["renter"]}>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedUserTypes={["renter"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/properties"
            element={
              <ProtectedRoute allowedUserTypes={["renter"]}>
                <Properties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/saved"
            element={
              <ProtectedRoute allowedUserTypes={["renter"]}>
                <SavedHomes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedUserTypes={["admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/config"
            element={
              <ProtectedRoute allowedUserTypes={["admin"]}>
                <WebsiteConfig />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedUserTypes={["admin"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route path="/list-property" element={<ListPropertyPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route
            path="/landlord"
            element={
              <ProtectedRoute allowedUserTypes={["landlord"]}>
                <LandlordDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
