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
  return (
    /* LAYER 1: OUTER SHELL (Murni Kulit Visual, TANPA PADDING)
       Menjamin batas border, background, rounded-3xl, dan overflow terbebas dari intervensi padding */
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/90 text-card-foreground shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-border/80 ${
        accentColor === 'amber'
          ? 'hover:shadow-amber-900/20 hover:border-primary/50'
          : accentColor === 'blue'
            ? 'hover:shadow-blue-900/20 hover:border-blue-500/50'
            : 'hover:shadow-emerald-900/20 hover:border-emerald-500/50'
      }`}
    >
      {/* Top decorative gradient stripe (6px height) at absolute top */}
      <div className={`absolute left-0 right-0 top-0 h-[6px] rounded-t-3xl ${topStripeClass} z-20`} />

      {/* Subtle background glow effect */}
      <div
        className={`absolute -right-16 -top-16 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40 z-10 ${
          accentColor === 'amber' ? 'bg-primary' : accentColor === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
        }`}
      />

      {/* LAYER 2: INNER WRAPPER (Murni Geometri & Bantalan Interior: p-8 pt-10 sm:p-10 sm:pt-12 + portal-card-inner)
          Mengunci seluruh anak-anak elemen agar mutlak berada di dalam jarak aman 32px-48px dari batas kotak */}
      <div className="portal-card-inner relative z-20 flex h-full flex-col justify-between gap-8 p-8 pt-10 sm:p-10 sm:pt-12">
        {/* LAYER 3A: TOP STACK (Badge, Judul, Deskripsi, Checklist) */}
        <div className="flex flex-col gap-6">
          {/* Lencana berkelas inline-flex w-fit agar tidak melebar & tidak terlempar ke pojok */}
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider ${badgeClass}`}
          >
            {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 shrink-0" />}
            <span>{badge}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
            {title}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-normal">
            {description}
          </p>

          {features.length > 0 && (
            <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      accentColor === 'amber'
                        ? 'text-primary'
                        : accentColor === 'blue'
                          ? 'text-blue-500'
                          : 'text-emerald-500'
                    }`}
                  />
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LAYER 3B: BOTTOM ACTION (Tombol Masuk/Daftar) */}
        <Link
          to={to}
          className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm sm:text-base font-extrabold text-white transition-all shadow-xl ${btnClass}`}
        >
          <span>{btnText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
