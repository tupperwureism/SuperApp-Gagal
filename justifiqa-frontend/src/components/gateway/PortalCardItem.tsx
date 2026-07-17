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
      ? 'hover:border-primary/60'
      : accentColor === 'blue'
        ? 'hover:border-blue-500/60'
        : 'hover:border-emerald-500/60';

  const checkColor =
    accentColor === 'amber'
      ? 'text-primary'
      : accentColor === 'blue'
        ? 'text-blue-500'
        : 'text-emerald-500';

  return (
    <Card className={`portal-card-shell relative overflow-hidden group ${hoverBorder}`}>
      {/* Top decorative gradient stripe */}
      <div className={`absolute left-0 right-0 top-0 h-[6px] rounded-t-3xl ${topStripeClass} z-20`} />

      {/* Subtle background glow effect */}
      <div
        className={`absolute -right-16 -top-16 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40 z-10 ${
          accentColor === 'amber' ? 'bg-primary' : accentColor === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
        }`}
      />

      {/* INNER CONTENT WRAPPER */}
      <div className="portal-card-inner relative z-20 flex h-full flex-col justify-between gap-8 p-6 sm:p-8 pt-8 sm:pt-10">
        <div className="flex flex-col gap-6">
          <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
            {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 shrink-0" />}
            <span>{badge}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
            {title}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-muted font-normal">
            {description}
          </p>

          {features.length > 0 && (
            <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${checkColor}`} />
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BUTTON (`Design System First & Anti-Wrap`) */}
        <Link to={to} className={`portal-btn-cta shadow-xl ${btnClass}`}>
          <span>{btnText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
};
