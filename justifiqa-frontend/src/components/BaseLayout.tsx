import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { UserRole, AuthSession } from '../types/auth';
import { DEFAULT_SESSIONS } from '../types/auth';

interface BaseLayoutProps {
  children: (session: AuthSession, onRoleChange: (newRole: UserRole) => void) => React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial role based on current path or state
  const getInitialRole = (): UserRole => {
    if (location.pathname.startsWith('/advocate')) return 'ADVOCATE';
    if (location.pathname.startsWith('/navigator')) return 'AI_ASSISTANT';
    return 'CLIENT';
  };

  const [currentRole, setCurrentRole] = useState<UserRole>(getInitialRole);
  const currentSession = DEFAULT_SESSIONS[currentRole];

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'CLIENT') {
      navigate('/client/dashboard');
    } else if (newRole === 'ADVOCATE') {
      navigate('/advocate/dashboard');
    } else if (newRole === 'AI_ASSISTANT') {
      navigate('/navigator');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar currentSession={currentSession} onRoleChange={handleRoleChange} />

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-10 py-8">
        {children(currentSession, handleRoleChange)}
      </main>

      <Footer />
    </div>
  );
};
