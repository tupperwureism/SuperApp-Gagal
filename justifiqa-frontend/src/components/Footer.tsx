import React from 'react';
import { ShieldAlert, Lock, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0a0e17]/90 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Summary */}
        <div>
          <h4 className="font-heading font-bold text-lg text-white">
            JUSTIFI<span className="text-gradient-gold">QA</span> LEGALTECH
          </h4>
          <p className="text-xs text-secondary max-w-md mt-1">
            Platform Hukum Digital Indonesia berarsitektur Boundary-Control-Entity (BCE). 
            Seluruh transaksi finansial dilindungi penguncian baris ACID Concurrency Mutex &amp; catatan jejak audit WORM Immutable Vault.
          </p>
        </div>

        {/* Security & Audit Badges */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>PostgreSQL Row-Lock Mutex</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-400">
            <Database className="w-3.5 h-3.5" />
            <span>WORM Immutable Audit Trail</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-blue-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>RLS proacl Hardened</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Justifiqa SuperApp. All Rights Reserved.</p>
        <p>Beta MVP Prototype &middot; Designed for Executive Demonstration</p>
      </div>
    </footer>
  );
};
