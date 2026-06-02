import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import EvidenceVault from "./pages/EvidenceVault";
import CCTVAnalysis from "./pages/CCTVAnalysis";
import CrimeScene3D from "./pages/CrimeScene3D";
import AIAgent from "./pages/AIAgent";
import Reports from "./pages/Reports";
import VoiceAnalysis from "./pages/VoiceAnalysis";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {

  return (

    <AuthProvider>

      <Routes>

        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={
            <Navigate to="/dashboard" />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* CASES */}
        <Route
          path="/cases"
          element={
            <ProtectedRoute>
              <Cases />
            </ProtectedRoute>
          }
        />

        {/* CASE DETAILS */}
        <Route
          path="/cases/:id"
          element={
            <ProtectedRoute>
              <CaseDetails />
            </ProtectedRoute>
          }
        />

        {/* EVIDENCE */}
        <Route
          path="/evidence"
          element={
            <ProtectedRoute>
              <EvidenceVault />
            </ProtectedRoute>
          }
        />

        {/* CCTV */}
        <Route
          path="/cctv-analysis"
          element={
            <ProtectedRoute>
              <CCTVAnalysis />
            </ProtectedRoute>
          }
        />

        {/* CRIME SCENE */}
        <Route
          path="/crime-scene-3d"
          element={
            <ProtectedRoute>
              <CrimeScene3D />
            </ProtectedRoute>
          }
        />

        {/* AI AGENT */}
        <Route
          path="/ai-agent"
          element={
            <ProtectedRoute>
              <AIAgent />
            </ProtectedRoute>
          }
        />

        {/* REPORTS */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* VOICE ANALYSIS */}
        <Route
          path="/voice-analysis"
          element={
            <ProtectedRoute>
              <VoiceAnalysis />
            </ProtectedRoute>
          }
        />

      </Routes>

    </AuthProvider>
  );
}

export default App;