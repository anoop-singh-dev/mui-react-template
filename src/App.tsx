// src/App.tsx
import { useState } from 'react';
import AppRoutes from './routes/Routes';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return <AppRoutes sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />;
};

export default App;
