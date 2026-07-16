import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { UserRole, AuthSession } from '../types/auth';
import { DEFAULT_SESSIONS } from '../types/auth';

interface BaseLayoutProps {
  children: (session: AuthSession, onRoleChange: (newRole: UserRole) => void) => React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('CLIENT');
  const currentSession = DEFAULT_SESSIONS[currentRole];

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17] text-white">
      {/* Top Navbar with Role Switcher */}
      <Navbar currentSession={currentSession} onRoleChange={handleRoleChange} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-8">
        {children(currentSession, handleRoleChange)}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
