
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import DesignerAI from './components/DesignerAI';
import MobileNotice from './components/MobileNotice';
import App from './App';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import WorkDetailPage from './pages/WorkDetailPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';

// ScrollToTop component - scrolls to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <MobileNotice />
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<WorkDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
