import { createFileRoute } from "@tanstack/react-router";
import {
  Scale,
  Search,
  ShieldCheck,
  User,
  Award,
  CheckCircle2,
  ArrowRight,
  Globe,
  Siren,
  Lock,
  BadgeCheck,
  Database,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function NavbarGateway() {
  const links = ["Tentang Kami", "Pro Bono", "Keamanan E2EE", "Panduan"];
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
            <Scale className="h-6 w-6 text-slate-950" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-black leading-tight tracking-tight text-white">JUSTICA</p>
            <p className="hidden truncate text-[11px] leading-tight text-slate-400 sm:block">
              Infrastruktur Praktik Hukum Digital Terproteksi Tingkat Tinggi SIPP MA
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 md:flex">
            <Globe className="h-3.5 w-3.5" /> ID / EN
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-900/40 hover:from-red-500 hover:to-rose-500">
            <Siren className="h-4 w-4" />
            <span className="hidden sm:inline">Darurat Hukum 24/7</span>
            <span className="sm:hidden">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSearchSection() {
  const filters = [
    "Semua",
    "Litigasi Pidana",
    "Sengketa Bisnis",
    "Hukum Keluarga",
    "Pro Bono PERADI",
  ];
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-10 lg:px-10 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-10 top-40 h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          Terverifikasi Mahkamah Agung RI · PERADI · Kominfo
        </div>
        <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Akses Keadilan &{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Praktik Hukum Digital
          </span>{" "}
          Tanpa Batas
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Ditopang enkripsi <strong className="text-slate-200">Zero-Knowledge E2EE</strong>,
          verifikasi <strong className="text-slate-200">SIPP Mahkamah Agung real-time</strong>, dan
          perlindungan dana <strong className="text-slate-200">Mutex Escrow</strong> untuk setiap
          transaksi hukum Anda.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="group relative rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl shadow-blue-950/50 backdrop-blur-xl focus-within:border-cyan-400/50">
            <div className="flex items-center gap-2 px-3">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Cari advokat, kasus, atau layanan hukum…"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-cyan-400">
                Cari
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                  i === 0
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type PortalCardProps = {
  theme: "blue" | "emerald";
  badgeLabel: string;
  BadgeIcon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  checklist: string[];
  cta: string;
};

function PortalCard({
  theme,
  badgeLabel,
  BadgeIcon,
  title,
  description,
  checklist,
  cta,
}: PortalCardProps) {
  const isBlue = theme === "blue";
  const stripe = isBlue
    ? "bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500"
    : "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400";
  const badgeCls = isBlue
    ? "border-blue-400/30 bg-blue-500/10 text-blue-200"
    : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
  const checkCls = isBlue ? "text-blue-400" : "text-emerald-400";
  const glow = isBlue
    ? "hover:shadow-blue-900/40 hover:border-blue-400/40"
    : "hover:shadow-emerald-900/40 hover:border-emerald-400/40";
  const button = isBlue
    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-xl shadow-blue-900/40"
    : "bg-slate-900 hover:bg-slate-800 border-2 border-white/20 hover:border-emerald-500 shadow-xl shadow-emerald-950/40";

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-slate-900/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/40 ${glow}`}
    >
      <div className={`absolute left-0 right-0 top-0 h-[6px] rounded-t-3xl ${stripe}`} />

      <div className="flex h-full flex-col justify-between gap-8 p-8 pt-10 sm:p-10 sm:pt-12">
        <div className="flex flex-col gap-6">
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider ${badgeCls}`}
          >
            <BadgeIcon className="h-3.5 w-3.5" />
            {badgeLabel}
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{title}</h3>

          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">{description}</p>

          <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-5">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${checkCls}`} />
                <p className="text-sm leading-relaxed text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-extrabold text-white transition-all ${button}`}
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PortalCardsGrid() {
  return (
    <section className="px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto mb-12 flex max-w-3xl items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400">
          Pilih Akses Portal
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
        <PortalCard
          theme="blue"
          badgeLabel="Portal Pencari Keadilan"
          BadgeIcon={User}
          title="KLIEN HUKUM"
          description="Konsultasikan perkara Anda dengan advokat terverifikasi PERADI, dijaga privasinya dengan enkripsi Zero-Knowledge dan dana Anda diamankan Mutex Escrow."
          checklist={[
            "Konsultasi terenkripsi Zero-Knowledge E2EE",
            "Perlindungan dana rekening bersama (Mutex Escrow)",
            "Akses kuota bantuan hukum Pro Bono PERADI",
          ]}
          cta="Masuk / Daftar sebagai Klien"
        />
        <PortalCard
          theme="emerald"
          badgeLabel="Portal Praktisi Hukum"
          BadgeIcon={Award}
          title="MITRA ADVOKAT"
          description="Kelola praktik hukum Anda secara digital: verifikasi status SIPP real-time, terbitkan opini ber-eMeterai, dan terima honor instan lewat BI-FAST."
          checklist={[
            "Verifikasi real-time SIPP Mahkamah Agung & PERADI",
            "Penerbitan opini hukum ber-eMeterai SHA-256 sah",
            "Pencairan honor instan BI-FAST tanpa potongan gelap",
          ]}
          cta="Masuk / Daftar Mitra Advokat"
        />
      </div>
    </section>
  );
}

function PublicTrustGrid() {
  const stats = [
    {
      icon: Lock,
      value: "100%",
      label: "E2EE Terenkripsi",
      accent: "text-cyan-300",
      ring: "from-cyan-500/20",
    },
    {
      icon: BadgeCheck,
      value: "4,850+",
      label: "Advokat Terverifikasi SIPP",
      accent: "text-emerald-300",
      ring: "from-emerald-500/20",
    },
    {
      icon: Database,
      value: "0",
      label: "Insiden Data Bocor (WORM Vault)",
      accent: "text-amber-300",
      ring: "from-amber-500/20",
    },
    {
      icon: Wallet,
      value: "Rp 14,2 M+",
      label: "Dana Escrow Aman",
      accent: "text-blue-300",
      ring: "from-blue-500/20",
    },
  ];
  return (
    <section className="px-6 pb-24 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, accent, ring }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/25"
          >
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${ring} to-transparent blur-2xl`}
            />
            <div className="flex flex-col gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5">
                <Icon className={`h-5 w-5 ${accent}`} />
              </div>
              <div>
                <p className={`text-2xl font-black tracking-tight ${accent}`}>{value}</p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen bg-[#090d16] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(16,185,129,0.10),transparent_50%),linear-gradient(to_bottom,#090d16,#0f172a)]" />
      <NavbarGateway />
      <main>
        <HeroSearchSection />
        <PortalCardsGrid />
        <PublicTrustGrid />
      </main>
    </div>
  );
}
