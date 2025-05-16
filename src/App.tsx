import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './authConfig';

import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { CompareView } from './pages/CompareView';
import { AINavigator } from './pages/AINavigator';
import { Layout } from './components/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition animate-fadeIn">
      {children}
    </div>
  );
}

export function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/" element={
                <ProtectedRoute>
                  <PageTransition><Home /></PageTransition>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/:id" element={
                <ProtectedRoute>
                  <PageTransition><Dashboard /></PageTransition>
                </ProtectedRoute>
              } />
              <Route path="/compare" element={
                <ProtectedRoute>
                  <PageTransition><CompareView /></PageTransition>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <PageTransition><UserProfile /></PageTransition>
                </ProtectedRoute>
              } />
              <Route path="/ai-navigator" element={
                <ProtectedRoute>
                  <PageTransition><AINavigator /></PageTransition>
                </ProtectedRoute>
              } />
              <Route path="*" element={<PageTransition><ErrorPage /></PageTransition>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </MsalProvider>
  );
}

export default App;