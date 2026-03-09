import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Public site
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import WhyChooseUs from './sections/WhyChooseUs';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import TahapanSection from './sections/TahapanSection';
import PortfolioSection from './sections/PortfolioSection';
import StructureSection from './sections/StructureSection';
import MarqueeSection from './sections/MarqueeSection';
import BlogSection from './sections/BlogSection';

// Admin
import AdminRoute from './admin/AdminRoute';
import AdminLayout from './admin/AdminLayout';
import LoginPage from './admin/LoginPage';
import DashboardPage from './admin/DashboardPage';
import ServicesPage from './admin/ServicesPage';
import PortfolioPage from './admin/PortfolioPage';
import TeamPage from './admin/TeamPage';
import BlogPage from './admin/BlogPage';

function HomePage() {
  return (
    <div className="bg-pattern">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <AboutSection />
      <ServicesSection />
      <TahapanSection />
      <PortfolioSection />
      <StructureSection />
      <MarqueeSection />
      <BlogSection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Protected */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
