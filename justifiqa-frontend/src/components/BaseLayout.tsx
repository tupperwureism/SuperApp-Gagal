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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar currentSession={currentSession} onRoleChange={handleRoleChange} />

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 py-8">
        {children(currentSession, handleRoleChange)}
      </main>

      <Footer />
    </div>
  );
};
