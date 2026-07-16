import React from 'react';
import { Scale, ShieldCheck, User, Sparkles, Briefcase } from 'lucide-react';
import type { UserRole, AuthSession } from '../types/auth';

interface NavbarProps {
  currentSession: AuthSession;
  onRoleChange: (newRole: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSession, onRoleChange }) => {
  return (
    <header className="glass-navbar py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] via-[#d4af37] to-[#b45309] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          <Scale className="w-6 h-6 text-black" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-xl tracking-wider text-white">
              JUSTIFI<span className="text-gradient-gold">QA</span>
            </span>
            <span className="badge badge-gold">Beta MVP</span>
          </div>
          <p className="text-xs text-secondary font-body">
            Legal SuperApp &middot; WORM Vault &amp; ACID Mutex Secured
          </p>
        </div>
      </div>

      {/* Role Switcher Pill & Status */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-[#111827] border border-white/10 rounded-xl p-1.5 shadow-inner">
          <span className="text-xs text-muted font-medium px-2 uppercase tracking-wider hidden sm:inline">
            Peran:
          </span>

          {/* Client Role Button */}
          <button
            onClick={() => onRoleChange('CLIENT')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentSession.role === 'CLIENT'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                : 'text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Klien</span>
          </button>

          {/* Advocate Role Button */}
          <button
            onClick={() => onRoleChange('ADVOCATE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentSession.role === 'ADVOCATE'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold shadow-md'
                : 'text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Advokat</span>
          </button>

          {/* AI Assistant Role Button */}
          <button
            onClick={() => onRoleChange('AI_ASSISTANT')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentSession.role === 'AI_ASSISTANT'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Legal</span>
          </button>
        </div>

        {/* User Info & Security Badge */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/10 hidden lg:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{currentSession.userName}</p>
            <div className="flex items-center justify-end gap-1 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FIDO2 Verified</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
