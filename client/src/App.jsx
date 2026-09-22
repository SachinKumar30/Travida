import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import HeroEditor from './pages/admin/editors/HeroEditor';
import ProblemEditor from './pages/admin/editors/ProblemEditor';
import ServicesEditor from './pages/admin/editors/ServicesEditor';
import ProcessEditor from './pages/admin/editors/ProcessEditor';
import StakeholdersEditor from './pages/admin/editors/StakeholdersEditor';
import WhyChooseEditor from './pages/admin/editors/WhyChooseEditor';
import ContactInfoEditor from './pages/admin/editors/ContactInfoEditor';
import SiteSettingsEditor from './pages/admin/editors/SiteSettingsEditor';
import Submissions from './pages/admin/Submissions';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ContentProvider>
                <Home />
              </ContentProvider>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <ContentProvider>
                  <AdminLayout />
                </ContentProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="hero" element={<HeroEditor />} />
            <Route path="problem" element={<ProblemEditor />} />
            <Route path="services" element={<ServicesEditor />} />
            <Route path="process" element={<ProcessEditor />} />
            <Route path="stakeholders" element={<StakeholdersEditor />} />
            <Route path="why-choose" element={<WhyChooseEditor />} />
            <Route path="contact-info" element={<ContactInfoEditor />} />
            <Route path="site-settings" element={<SiteSettingsEditor />} />
            <Route path="submissions" element={<Submissions />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
