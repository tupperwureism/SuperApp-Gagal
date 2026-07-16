import React from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { IracSection } from '../components/IracSection';
import { ArrowLeft, BrainCircuit } from 'lucide-react';

export const AiNavigatorPage: React.FC = () => {
  return (
    <BaseLayout>
      {(session) => (
        <div className="space-y-8 py-6 animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span>Kembali ke Gerbang Utama (/)</span>
            </Link>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
              AI Legal Navigator ({session.role}) • Neural Bedah Kasus
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-slate-900 border border-purple-500/30 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>AI Legal Navigator Engine</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-[10px] text-purple-300">
                    Neural v4.2
                  </span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Analisis kronologi mandiri, pemetaan hukum 4 pilar IRAC, dan penyusunan draf awal secara instan.
                </p>
              </div>
            </div>
          </div>

          {/* IRAC Generator Full Workspace */}
          <IracSection onProceedToDraft={(analysis) => {
            console.log('AI Navigator IRAC generated:', analysis);
          }} />
        </div>
      )}
    </BaseLayout>
  );
};
