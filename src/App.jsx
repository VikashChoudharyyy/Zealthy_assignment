import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SlotManagement from './pages/SlotManagement';
import UserProfile from './pages/UserProfile';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <UserProvider>
      <Router>
      <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage-slots" element={<SlotManagement />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;