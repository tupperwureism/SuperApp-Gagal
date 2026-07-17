import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PortalCardItemProps {
  badge: string;
  badgeClass: string;
  badgeIcon?: React.ElementType;
  title: string;
  description: string;
  features?: string[];
  btnText: string;
  btnClass: string;
  to: string;
  topStripeClass: string;
  isDark?: boolean;
  accentColor?: 'blue' | 'emerald' | 'amber';
}

export const PortalCardItem: React.FC<PortalCardItemProps> = ({
  badge,
  badgeClass,
  badgeIcon: BadgeIcon,
  title,
  description,
  features = [],
  btnText,
  btnClass,
  to,
  topStripeClass,
  accentColor = 'blue',
}) => {
  const hoverBorder =
    accentColor === 'amber'
      ? 'hover:border-amber-500/60 hover:shadow-[0_30px_70px_-15px_rgba(245,158,11,0.25)]'
      : accentColor === 'blue'
        ? 'hover:border-blue-500/60 hover:shadow-[0_30px_70px_-15px_rgba(59,130,246,0.25)]'
        : 'hover:border-emerald-500/60 hover:shadow-[0_30px_70px_-15px_rgba(16,185,129,0.25)]';

  const checkColor =
    accentColor === 'amber'
      ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
      : accentColor === 'blue'
        ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'
        : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]';

  return (
    <div className={`portal-card-shell relative group ${hoverBorder}`}>
      {/* Top decorative gradient stripe conforming perfectly to card radius */}
      <div className={`absolute left-0 right-0 top-0 h-[6px] rounded-t-3xl ${topStripeClass} z-30 pointer-events-none`} />

      {/* Subtle background glow effect */}
      <div
        className={`absolute -right-24 -top-24 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-45 z-10 ${
          accentColor === 'amber' ? 'bg-amber-500' : accentColor === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
        }`}
      />

      {/* INNER SAFE-ZONE WRAPPER (Guaranteed physical 32px-56px margin from outer walls) */}
      <div className="relative z-20 p-8 sm:p-12 md:p-14 flex h-full flex-col justify-between gap-10">
        <div className="flex flex-col gap-7">
          <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-md backdrop-blur-md ${badgeClass}`}>
            {BadgeIcon && <BadgeIcon className="h-4 w-4 shrink-0" />}
            <span>{badge}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-heading drop-shadow-md">
            {title}
          </h3>

          <p className="text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
            {description}
          </p>

          {features.length > 0 && (
            <div className="mt-1 flex flex-col gap-4 border-t border-white/[0.1] pt-7">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${checkColor}`} />
                  <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <Link to={to} className={`portal-btn-cta shadow-2xl group/btn ${btnClass}`}>
          <span>{btnText}</span>
          <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-2" />
        </Link>
      </div>
    </div>
  );
};
