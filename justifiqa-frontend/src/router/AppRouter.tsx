import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GatewayPage } from '../pages/GatewayPage';
import { ClientAuthPage } from '../pages/ClientAuthPage';
import { AdvocateAuthPage } from '../pages/AdvocateAuthPage';
import { ClientDashboardPage } from '../pages/ClientDashboardPage';
import { AdvocateDashboardPage } from '../pages/AdvocateDashboardPage';
import { AiNavigatorPage } from '../pages/AiNavigatorPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GatewayPage />} />
        <Route path="/client/auth" element={<ClientAuthPage />} />
        <Route path="/advocate/auth" element={<AdvocateAuthPage />} />
        <Route path="/client/dashboard" element={<ClientDashboardPage />} />
        <Route path="/advocate/dashboard" element={<AdvocateDashboardPage />} />
        <Route path="/ai-legal" element={<AiNavigatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
