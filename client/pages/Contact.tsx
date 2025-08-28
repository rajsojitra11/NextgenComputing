import { Mail, MapPin, Phone, Send, WhatsappIcon } from "lucide-react";
import { useState } from "react";

const WHATSAPP = "918469283448"; // +91 8469283448

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Contact Request%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
    const url = `https://wa.me/${WHATSAPP}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative">
      {/* Hero with tools background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/2136243/pexels-photo-2136243.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Laptop repair tools on desk"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.2)_0%,transparent_40%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_50%)]" />
        </div>
        <div className="container py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight animate-fade-in">Contact Nextgen Computing</h1>
          <p className="mt-4 max-w-2xl text-slate-700 animate-slide-up" style={{animationDelay:'0.1s'}}>
            Questions, repairs or custom builds — we’re here to help. Reach us by phone, email, WhatsApp, or the form below.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-10 md:py-16 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: Info + Map */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6">
            <dl className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <dt className="text-sm font-semibold">Phone</dt>
                  <dd className="text-slate-700">
                    <a href="tel:+918469283448" className="font-medium text-slate-900 hover:text-blue-700">+91 8469283448</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <dt className="text-sm font-semibold">Email</dt>
                  <dd className="text-slate-700 break-words">
                    <a href="mailto:hello@nextgencomputing.co" className="font-medium text-slate-900 hover:text-blue-700">hello@nextgencomputing.co</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <dt className="text-sm font-semibold">Address</dt>
                  <dd className="text-slate-700 break-words">
                    <address className="not-italic font-medium text-slate-900">123 Tech Ave, Innovation City</address>
                  </dd>
                </div>
              </div>
            </dl>
            <div className="mt-6">
              <a
                href={`https://wa.me/${WHATSAPP}?text=Hello%20Nextgen%20Computing%20—%20I%20need%20help%20with...`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200/70 bg-white shadow-sm">
            <iframe
              title="Nextgen Computing Location"
              src="https://www.google.com/maps?q=123%20Tech%20Ave%20Innovation%20City&output=embed"
              className="h-[320px] w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <p className="mt-1 text-sm text-slate-600">We’ll respond quickly via WhatsApp or email.</p>
          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us what you need help with" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary inline-flex items-center gap-2"><Send className="h-4 w-4"/> Send via WhatsApp</button>
              <a href={`mailto:hello@nextgencomputing.co?subject=Contact%20Request%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nPhone: " + phone)}`} className="btn-outline">Email Us</a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
