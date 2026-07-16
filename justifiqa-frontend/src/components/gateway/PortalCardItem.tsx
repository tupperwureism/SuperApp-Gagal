import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  accentColor?: 'blue' | 'emerald';
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
  return (
    /* DIRECT NATIVE CONTAINER: pt-10 pb-8 px-8 sm:px-10 xl:px-12 directly on the root card element.
       Bypasses all Shadcn <Card> tailwind-merge (cn) abstraction layers. 
       Ensures 100% exact 40px top padding and 32px-48px horizontal padding for every single letter and badge! */
    <div className="flex flex-col justify-between pt-10 pb-8 px-8 sm:px-10 xl:px-12 gap-6 rounded-3xl border border-white/15 bg-slate-900/90 backdrop-blur-2xl shadow-2xl min-h-[500px] h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] group">
      {/* Top decorative gradient stripe (6px height) at absolute top z-20 */}
      <div className={`absolute top-0 left-0 right-0 h-[6px] ${topStripeClass} z-20`} />

      {/* Subtle background glow effect */}
      <div
        className={`absolute -right-16 -top-16 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40 ${
          accentColor === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
        }`}
      />

      {/* HEADER SECTION */}
      <div className="flex flex-col items-start gap-4 w-full relative z-10">
        <Badge
          variant="outline"
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm border ${badgeClass}`}
        >
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 shrink-0" />}
          <span>{badge}</span>
        </Badge>

        <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
          {title}
        </h3>
      </div>

      {/* CONTENT SECTION */}
      <div className="flex-1 space-y-5 w-full relative z-10">
        <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
          {description}
        </p>

        {features.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-white/10 w-full">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    accentColor === 'blue' ? 'text-blue-400' : 'text-emerald-400'
                  }`}
                />
                <span className="leading-snug font-medium">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER ACTION SECTION */}
      <div className="pt-4 w-full mt-auto relative z-10">
        <Button
          asChild
          size="lg"
          className={`w-full h-13 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base gap-3 shadow-xl transition-all ${btnClass}`}
        >
          <Link to={to} className="flex items-center justify-center">
            <span>{btnText}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
