import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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
    <Card className="flex flex-col justify-between gap-6 p-8 xl:p-10 rounded-3xl border border-white/15 bg-slate-900/90 backdrop-blur-2xl shadow-2xl min-h-[500px] h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] group">
      {/* Top decorative gradient stripe (6px height) */}
      <div className={`absolute top-0 left-0 right-0 h-[6px] ${topStripeClass}`} />

      {/* Subtle background glow effect */}
      <div
        className={`absolute -right-16 -top-16 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40 ${
          accentColor === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
        }`}
      />

      <CardHeader className="p-0 pt-3 flex flex-col items-start gap-3.5">
        <Badge
          variant="outline"
          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm max-w-full ${badgeClass}`}
        >
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 flex-shrink-0" />}
          <span className="truncate">{badge}</span>
        </Badge>

        <h3 className="text-2xl md:text-3xl font-black text-white font-heading tracking-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="p-0 flex-1 space-y-5">
        <p className="text-sm md:text-base leading-relaxed text-slate-300 font-normal">
          {description}
        </p>

        {features.length > 0 && (
          <div className="space-y-2.5 pt-3 border-t border-white/10">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    accentColor === 'blue' ? 'text-blue-400' : 'text-emerald-400'
                  }`}
                />
                <span className="leading-snug font-medium">{item}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-0 mt-auto pt-4">
        <Button
          asChild
          size="lg"
          className={`w-full h-13 py-3 rounded-2xl font-extrabold text-sm md:text-base gap-3 shadow-xl transition-all ${btnClass}`}
        >
          <Link to={to} className="flex items-center justify-center">
            <span>{btnText}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
