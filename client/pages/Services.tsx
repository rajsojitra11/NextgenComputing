import { Wrench, Laptop, Monitor, HardDrive, Database, ShieldCheck, Cpu, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const wa = "https://wa.me/918469283448?text=Hello%20Nextgen%20Computing%20%E2%80%94%20I%20want%20to%20book%20a%20repair%20or%20service";

type Service = {
  title: string;
  desc: string;
  icon: JSX.Element;
};

const services: Service[] = [
  { title: "Laptop Repair", desc: "Screen, battery, keyboard, motherboard & water damage repairs.", icon: <Laptop className="h-6 w-6" /> },
  { title: "Desktop Repair", desc: "Boot issues, PSU, GPU, RAM diagnostics and replacement.", icon: <Monitor className="h-6 w-6" /> },
  { title: "Data Recovery", desc: "Recover files from HDD/SSD, accidental deletes, or corrupt disks.", icon: <Database className="h-6 w-6" /> },
  { title: "OS Install & Tune‑up", desc: "Windows/macOS install, drivers, antivirus, and performance tune‑up.", icon: <ShieldCheck className="h-6 w-6" /> },
  { title: "Hardware Upgrades", desc: "SSD, RAM, GPU and CPU upgrades for faster performance.", icon: <Cpu className="h-6 w-6" /> },
  { title: "Maintenance & Cleaning", desc: "Thermal paste, dust cleaning, fan replacement and health checks.", icon: <RefreshCcw className="h-6 w-6" /> },
];

export default function Services() {
  const ENABLE_API = import.meta.env.VITE_ENABLE_API === "true";
  const HOST_OK = typeof window !== "undefined" && (location.hostname === "localhost" || location.hostname.endsWith(".netlify.app"));
  const [bg, setBg] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const DEFAULTS = {
      bg: null as string | null,
      video: "https://youtu.be/ntDq2VeJr9Q?si=pI0xbW26OrPs3LjO",
    };
    const timeout = (ms: number) => new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms));
    const safeFetchJson = async (url: string, ms = 4000) => {
      const res: Response = await Promise.race([
        fetch(url, { cache: "no-store" }),
        timeout(ms),
      ]) as Response;
      if (!res || !res.ok) throw new Error("bad_status");
      return res.json();
    };

    (async () => {
      // If API isn't enabled or host isn't supported, use defaults
      if (!ENABLE_API || !HOST_OK) {
        if (!cancelled) {
          setBg(DEFAULTS.bg);
          setVideoUrl(DEFAULTS.video);
        }
        return;
      }
      try {
        await safeFetchJson("/api/ping", 2500);
        const pg = await safeFetchJson("/api/pages/services", 4000);
        if (!cancelled) {
          setBg(pg?.meta?.backgroundUrl || DEFAULTS.bg);
          setVideoUrl(pg?.meta?.videoUrl || DEFAULTS.video);
        }
      } catch {
        if (!cancelled) {
          setBg(DEFAULTS.bg);
          setVideoUrl(DEFAULTS.video);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [ENABLE_API, HOST_OK]);

  const toEmbed = (url: string) => {
    // Build an embeddable URL with autoplay+mute to satisfy browser policies
    const addParams = (base: string) => `${base}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1`;
    if (/youtube\.com\/.+v=/.test(url)) {
      const v = new URL(url).searchParams.get("v");
      return v ? addParams(`https://www.youtube.com/embed/${v}`) : url;
    }
    if (/youtu\.be\//.test(url)) {
      const id = url.split(/youtu\.be\//)[1]?.split(/[?&#]/)[0];
      return id ? addParams(`https://www.youtube.com/embed/${id}`) : url;
    }
    if (/youtube\.com\/embed\//.test(url)) {
      // Provided as embed already
      const [base] = url.split("?");
      return addParams(base);
    }
    return url;
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        {bg && <img src={bg} alt="Services background" className="h-full w-full object-cover opacity-20" referrerPolicy="no-referrer" />}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      </div>
      <div className="container">
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <header className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Professional Computer Services</h1>
              <p className="mt-4 text-slate-700">From quick fixes to complex repairs and performance upgrades — our certified technicians keep your devices running like new.</p>
              <div className="mt-6 flex gap-4">
                <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">Book Service</a>
                <Link to="/products" className="btn-outline">Shop Devices</Link>
              </div>
            </header>
            {videoUrl && (
              <div>
                {/(youtube\.com|youtu\.be)/.test(videoUrl) ? (
                  <div className="relative w-full -mx-6 md:mx-0 overflow-hidden rounded-xl border border-slate-200/70 shadow-sm">
                    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={toEmbed(videoUrl)}
                        title="Service video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full -mx-6 md:mx-0 overflow-hidden rounded-xl border border-slate-200/70 shadow-sm" style={{ aspectRatio: "16 / 9" }}>
                    <video className="h-full w-full object-cover" autoPlay muted loop playsInline src={videoUrl} controls />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-600/20 text-blue-700 flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.desc}</p>
              <div className="mt-5">
                <a href={`https://wa.me/918469283448?text=${encodeURIComponent(`Hello Nextgen Computing — I want to book ${s.title}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium">
                  <Wrench className="h-4 w-4" /> Book now
                </a>
              </div>
              <svg className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 opacity-30" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="90" stroke="hsl(var(--ring))" strokeDasharray="6 6"></circle>
              </svg>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-blue-200/40 bg-gradient-to-br from-blue-50 to-white p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold">Why choose Nextgen Computing?</h2>
              <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-5">
                <li>Certified technicians and genuine parts</li>
                <li>Same‑day diagnostics and fast turnaround</li>
                <li>Upfront pricing and warranty on repairs</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Screen Replacement",
                "SSD Upgrade",
                "Battery Swap",
                "Thermal Service",
                "Keyboard Repair",
                "Data Backup",
              ].map((t) => (
                <span key={t} className="rounded-full border border-blue-200/60 bg-white/70 px-3 py-1 text-sm text-blue-900">{t}</span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">Book Service</a>
          </div>
        </div>
      </div>
    </section>
  );
}
