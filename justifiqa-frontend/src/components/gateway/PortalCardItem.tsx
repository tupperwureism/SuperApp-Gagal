import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
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
      ? 'hover:border-amber-500/50 hover:shadow-[0_25px_60px_-15px_rgba(245,158,11,0.2)]'
      : accentColor === 'blue'
        ? 'hover:border-blue-500/50 hover:shadow-[0_25px_60px_-15px_rgba(59,130,246,0.2)]'
        : 'hover:border-emerald-500/50 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.2)]';

  const checkColor =
    accentColor === 'amber'
      ? 'text-amber-400'
      : accentColor === 'blue'
        ? 'text-blue-400'
        : 'text-emerald-400';

  return (
    <Card className={`portal-card-shell relative overflow-hidden group ${hoverBorder}`}>
      {/* Top decorative gradient stripe */}
      <div className={`absolute left-0 right-0 top-0 h-[5px] rounded-t-3xl ${topStripeClass} z-20`} />

      {/* Subtle background glow effect */}
      <div
        className={`absolute -right-20 -top-20 w-72 h-72 rounded-full blur-[110px] pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40 z-10 ${
          accentColor === 'amber' ? 'bg-amber-500' : accentColor === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
        }`}
      />

      {/* INNER CONTENT WRAPPER without redundant inner padding */}
      <div className="relative z-20 flex h-full flex-col justify-between gap-8">
        <div className="flex flex-col gap-6">
          <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${badgeClass}`}>
            {BadgeIcon && <BadgeIcon className="h-4 w-4 shrink-0" />}
            <span>{badge}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-heading drop-shadow-sm">
            {title}
          </h3>

          <p className="text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
            {description}
          </p>

          {features.length > 0 && (
            <div className="mt-2 flex flex-col gap-3.5 border-t border-white/[0.08] pt-6">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${checkColor}`} />
                  <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <Link to={to} className={`portal-btn-cta shadow-xl group/btn ${btnClass}`}>
          <span>{btnText}</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1.5" />
        </Link>
      </div>
    </Card>
  );
};
