import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';
import Footer from './Footer';

export default function Layout() {
  const location = window.location.pathname.substring(1);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {(location === 'meals' || location === 'drinks' || location === 'profile') && (
        <Footer />
      )}
    </>
  );
}
