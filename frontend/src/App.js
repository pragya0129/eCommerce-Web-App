import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import AdminPanel from "./pages/AdminPanel";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsByCategory from "./pages/ProductsByCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route
          path="//products/category/:categoryName"
          element={<ProductsByCategory />}
        />
      </Routes>
    </Router>
  );
}

export default App;
