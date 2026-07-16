import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
}) => {
  return (
    <Card className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl border border-border bg-card/85 backdrop-blur-xl shadow-lg h-full relative overflow-hidden transition-all hover:-translate-y-1 hover:border-primary hover:shadow-2xl group">
      {/* Top decorative stripe (5px height exactly as in JUSTICA_Proto_1.1 line 306) */}
      <div className={`absolute top-0 left-0 right-0 h-[5px] ${topStripeClass}`} />

      <CardHeader className="p-0 pt-2 flex flex-col items-start gap-3">
        <Badge
          variant="outline"
          className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${badgeClass}`}
        >
          {badge}
        </Badge>

        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading tracking-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-normal">
          {description}
        </p>
      </CardContent>

      <CardFooter className="p-0 mt-auto pt-4">
        <Button
          asChild
          size="lg"
          className={`w-full h-12 rounded-xl font-bold text-base gap-2 shadow-md transition-all ${btnClass}`}
        >
          <Link to={to}>
            <span>{btnText}</span>
            <span>→</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
