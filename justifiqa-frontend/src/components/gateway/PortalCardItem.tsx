import React from 'react';
import { Link } from 'react-router-dom';

interface PortalCardItemProps {
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  btnText: string;
  btnClass: string;
  to: string;
  topStripeClass: string;
  isDark?: boolean;
}

export const PortalCardItem: React.FC<PortalCardItemProps> = ({
  badge,
  badgeClass,
  title,
  description,
  btnText,
  btnClass,
  to,
  topStripeClass,
  isDark = true,
}) => {
  return (
    <div
      className={`portal-card-gateway relative overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-[#111827] border-[#374151] hover:border-[#3B82F6]'
          : 'bg-white border-slate-200 hover:border-[#2563EB]'
      }`}
    >
      {/* Top decorative stripe (5px height exactly as in JUSTICA_Proto_1.1 line 306) */}
      <div className={`absolute top-0 left-0 right-0 h-[5px] ${topStripeClass}`} />

      <div className="flex flex-col flex-1">
        <span
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.08em] mb-5 w-fit ${badgeClass}`}
        >
          {badge}
        </span>

        <h3
          className={`text-2xl md:text-[1.65rem] font-extrabold mb-4 ${
            isDark ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {title}
        </h3>

        <p
          className={`text-sm md:text-[0.98rem] leading-[1.7] mb-8 font-normal flex-1 ${
            isDark ? 'text-[#9CA3AF]' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4">
        <Link
          to={to}
          className={`w-full py-[1.05rem] px-6 rounded-[12px] font-bold text-base text-center transition-all flex items-center justify-center gap-3 shadow-md active:scale-95 cursor-pointer box-border flex-shrink-0 ${btnClass}`}
        >
          <span>{btnText}</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};
