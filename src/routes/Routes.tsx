// src/Routes.tsx
import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/Layout';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const User = lazy(() => import('../pages/User'));
const UserList = lazy(() => import('../pages/List'));
const BacklogTable = lazy(() => import('../pages/Kanban.tsx'));


const NotFound = lazy(() => import('../pages/NotFound'));

interface AppRoutesProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppRoutes = ({ sidebarOpen, toggleSidebar }: AppRoutesProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <User />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/userlist"
          element={
            <PrivateRoute>
              <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <UserList />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <PrivateRoute>
              <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <BacklogTable />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} /> 

        
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
