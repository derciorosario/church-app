import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { SocketProvider } from './contexts/SocketContext';
import { AuthProvider } from './contexts/AuthContext';
import { isNative } from './api/client';
import Home from './pages/Home';
import Events from './pages/events/Events';
import Ministries from './pages/ministries/Ministries';
import Bible from './pages/bible/Bible';
import Gallery from './pages/gallery/Gallery';
import Prayers from './pages/prayers/Prayers';
import Profile from './pages/profile/Profile';

const AppInner = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/ministries" element={<Ministries />} />
      <Route path="/bible" element={<Bible />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/prayers" element={<Prayers />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppInner />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
