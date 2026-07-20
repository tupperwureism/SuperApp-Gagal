import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ── Batch 1: Root Gateway, Verifier & Authentication ──────────────────────────
import { LandingGatewayPage } from '../pages/LandingGatewayPage';
import { PublicDocumentVerifierPage } from '../pages/PublicDocumentVerifierPage';
import { ClientAuthPage } from '../pages/ClientAuthPage';
import { AdvocateAuthPage } from '../pages/AdvocateAuthPage';
import { ClientLoginPage } from '../pages/auth/ClientLoginPage';
import { AdvocateLoginPage } from '../pages/auth/AdvocateLoginPage';

// ── Batch 2+: Portal Dashboards ───────────────────────────────────────────────
import { ClientDashboardPage } from '../pages/ClientDashboardPage';
import { ClientConsultationRoomPage } from '../pages/ClientConsultationRoomPage';
import { ClientDisputeCenterPage } from '../pages/ClientDisputeCenterPage';
import { AdvocateDashboardPage } from '../pages/AdvocateDashboardPage';
import { AiNavigatorPage } from '../pages/AiNavigatorPage';

/**
 * AppRouter — Central Route Mapping untuk Justifiqa SuperApp (Batch 1 Complete)
 * Semua navigasi trigger dari komponen via <Link to="..."> atau useNavigate().
 */
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Batch 1: Public Routes ── */}
        <Route path="/" element={<LandingGatewayPage />} />
        <Route path="/public/verify" element={<PublicDocumentVerifierPage />} />

        {/* Auth: legacy paths (compatible) */}
        <Route path="/client/auth" element={<ClientAuthPage />} />
        <Route path="/advocate/auth" element={<AdvocateAuthPage />} />

        {/* Auth: Batch 1 canonical paths */}
        <Route path="/client/login" element={<ClientLoginPage />} />
        <Route path="/advocate/login" element={<AdvocateLoginPage />} />

        {/* ── Batch 2+: Protected Portal Routes ── */}
        <Route path="/client/dashboard" element={<ClientDashboardPage />} />
        <Route path="/client/room/:sessionId" element={<ClientConsultationRoomPage />} />
        <Route path="/client/room" element={<ClientConsultationRoomPage />} />
        <Route path="/client/dispute" element={<ClientDisputeCenterPage />} />
        <Route path="/advocate/dashboard" element={<AdvocateDashboardPage />} />
        <Route path="/ai-legal" element={<AiNavigatorPage />} />

        {/* Catch-all → redirect to Root Gateway */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
