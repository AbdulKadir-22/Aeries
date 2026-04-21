import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import PetalRain from './PetalRain';
import Footer from './Footer';

const Layout = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-sans transition-colors duration-500">
      <PetalRain />
      
      {/* Global Theme Decorations */}
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left hidden md:block" />
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower right hidden md:block" />
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left mobile-tulip md:hidden" />

      {/* Navbar stays consistent */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Page Content injected here */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;
