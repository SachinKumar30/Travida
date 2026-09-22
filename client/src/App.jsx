import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import StakeholdersPage from './pages/StakeholdersPage';
import WhyChoosePage from './pages/WhyChoosePage';
import ContactPage from './pages/ContactPage';
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
        <ContentProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/who-we-serve" element={<StakeholdersPage />} />
              <Route path="/why-travida" element={<WhyChoosePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
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
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
