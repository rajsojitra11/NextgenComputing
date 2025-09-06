import { useEffect, useMemo, useRef, useState } from "react";

// Floating Chatbot for Nextgen Computing
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Business details
  const PHONE = "+91 8469283448";
  const PHONE_E164 = PHONE.replace(/\D/g, "");
  const EMAIL = "nextgencomputing01@gmail.com";
  const ADDRESS = "Bopal, Ahmedabad, Gujarat";
  const WHATSAPP = `https://wa.me/${PHONE_E164}`;
  const MAPS = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}`;

  type BookingData = {
    device?: string;
    issue?: string;
    method?: "pickup" | "instore" | "remote";
    time?: string;
    name?: string;
    phone?: string;
  };
  type Flow = { mode: "idle" | "booking"; step: number; data: BookingData };
  const [flow, setFlow] = useState<Flow>({ mode: "idle", step: 0, data: {} });

  const baseQuick = ["Services", "Shop products", "Contact", "Location", "Start booking"] as const;
  const bookingQuick = ["Laptop", "Desktop", "Pickup", "In-store", "Remote support", "Start over"] as const;
  const quickReplies = useMemo(() => (flow.mode === "booking" ? bookingQuick : baseQuick), [flow.mode]);

  const addBot = (text: string) => setMessages((m) => [...m, { role: "bot", text }]);
  const addUser = (text: string) => setMessages((m) => [...m, { role: "user", text }]);

  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text:
            "Welcome to Nextgen Computing! We repair laptops/desktops, do upgrades, and sell devices & accessories. I’ll guide you step‑by‑step. Choose an option or type your question.",
        },
        {
          role: "bot",
          text:
            "Popular: Start booking, Services, Shop products, Contact, Location",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const startBooking = () => {
    setFlow({ mode: "booking", step: 1, data: {} });
    addBot("Let’s book a repair/service. I’ll ask a few quick questions.");
    addBot("Step 1/4 — What device do you need help with? (e.g., Laptop, Desktop, Other)");
  };

  const summarizeAndConfirm = (data: BookingData) => {
    const summary = [
      `Device: ${data.device || "-"}`,
      `Issue: ${data.issue || "-"}`,
      `Method: ${data.method || "-"}`,
      `Preferred time: ${data.time || "-"}`,
      data.name ? `Name: ${data.name}` : null,
      data.phone ? `Phone: ${data.phone}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    addBot("Thanks! Here’s your booking summary:");
    addBot(summary);
    const text = `Booking Request%0A${encodeURIComponent(summary)}`;
    addBot(
      `To confirm now, tap: ${WHATSAPP}?text=${text}\nOr I can help with anything else — type \"Start over\" to reset.`
    );
    setFlow({ mode: "idle", step: 0, data: {} });
  };

  const handleBookingStep = (text: string) => {
    const q = text.trim();
    if (/^start over$/i.test(q)) {
      setFlow({ mode: "idle", step: 0, data: {} });
      addBot("Reset. You can Start booking, view Services, or ask a question.");
      return;
    }

    if (flow.step === 1) {
      const device = /laptop/i.test(q)
        ? "Laptop"
        : /desktop|pc/i.test(q)
        ? "Desktop"
        : q;
      const data = { ...flow.data, device };
      setFlow({ mode: "booking", step: 2, data });
      addBot("Step 2/4 — Briefly describe the issue (e.g., won’t boot, screen broken, battery drains, upgrade needed)");
      return;
    }

    if (flow.step === 2) {
      const data = { ...flow.data, issue: q };
      setFlow({ mode: "booking", step: 3, data });
      addBot("Step 3/4 — Choose service method: Pickup, In‑store, or Remote support");
      return;
    }

    if (flow.step === 3) {
      let method: BookingData["method"] | undefined;
      if (/pickup/i.test(q)) method = "pickup";
      else if (/store|instore|in-store/i.test(q)) method = "instore";
      else if (/remote/i.test(q)) method = "remote";
      const data = { ...flow.data, method: method || (q as any) };
      setFlow({ mode: "booking", step: 4, data });
      addBot("Step 4/4 — What’s your preferred date/time window? (e.g., tomorrow 3‑5pm)");
      return;
    }

    if (flow.step === 4) {
      const data = { ...flow.data, time: q };
      setFlow({ mode: "booking", step: 5, data });
      addBot("Optional — Share your name and phone (e.g., Rahul, 98XXXXXX10). Or type Skip.");
      return;
    }

    if (flow.step === 5) {
      let name: string | undefined;
      let phone: string | undefined;
      if (!/^skip$/i.test(q)) {
        const m = q.match(/([^,]+),\s*(\+?\d[\d\s-]{6,})/);
        if (m) {
          name = m[1].trim();
          phone = m[2].replace(/\D/g, "");
        } else {
          name = q.trim();
        }
      }
      const data = { ...flow.data, name, phone };
      summarizeAndConfirm(data);
      return;
    }
  };

  const reply = (text: string) => {
    const q = text.toLowerCase();

    if (flow.mode === "booking") {
      handleBookingStep(text);
      return;
    }

    if (q.includes("start booking") || q.includes("book a repair") || q.includes("book")) {
      startBooking();
      return;
    }

    if (/^services?$/.test(text) || q.includes("service") || q.includes("repair")) {
      addBot(
        "We offer: Laptop/Desktop Repair, Data Recovery, OS Install & Tune‑up, Hardware Upgrades (SSD/RAM/GPU/CPU), Maintenance & Cleaning."
      );
      addBot("Type ‘Start booking’ to schedule a service, or ask about pricing/warranty.");
      return;
    }

    if (q.includes("shop") || q.includes("product")) {
      addBot("You can browse products, laptops and accessories on our Products page.");
      addBot("Open Products: /products");
      addBot("Need help choosing? Tell me your budget and use-case (office, gaming, study). I’ll suggest options.");
      return;
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("call")) {
      addBot(`Phone: ${PHONE}`);
      addBot(`Email: ${EMAIL}`);
      addBot("For instant chat, say ‘Start booking’ or ask a question.");
      return;
    }

    if (q.includes("email")) {
      addBot(`Email us at ${EMAIL}. For urgent issues, calling is faster.`);
      return;
    }

    if (q.includes("location") || q.includes("address") || q.includes("map")) {
      addBot(`Address: ${ADDRESS}`);
      addBot(`Directions: ${MAPS}`);
      addBot("We offer pickup in nearby areas — say ‘Start booking’ to arrange.");
      return;
    }

    if (q.includes("warranty") || q.includes("guarantee") || q.includes("price") || q.includes("pricing")) {
      addBot(
        "Diagnostics are quick; pricing depends on parts and labor. Repairs include warranty as mentioned on your invoice (varies by service/parts)."
      );
      addBot("Tell me the device and issue, or say ‘Start booking’. I’ll guide you.");
      return;
    }

    addBot(
      "I can help with Services, Start booking, Products, Contact, and Location. Try the quick buttons below."
    );
  };

  const onSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    addUser(text);
    setInput("");
    setTimeout(() => reply(text), 150);
  };

  return (
    <div className="safe-fixed z-[99999]">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative inline-flex items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5 h-14 w-14 md:h-14 md:w-14 overflow-visible"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" aria-hidden="true" />
        <span className="relative z-10 flex items-center justify-center">
          {open ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            </svg>
          )}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] rounded-2xl border border-slate-200/70 bg-white/95 backdrop-blur shadow-2xl flex flex-col overflow-hidden">
          <header className="px-4 py-3 border-b border-slate-200/70 bg-gradient-to-r from-blue-50 to-white">
            <h3 className="text-sm font-semibold text-slate-900">Nextgen Computing — Chat Assistant</h3>
            <p className="text-xs text-slate-600">Repairs, upgrades, products and directions</p>
          </header>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "bot" ? "flex gap-2" : "flex gap-2 justify-end"}>
                {m.role === "bot" && (
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
                  </div>
                )}
                <div className={
                  "rounded-2xl px-3 py-2 max-w-[80%] text-sm whitespace-pre-wrap " +
                  (m.role === "bot" ? "bg-slate-100 text-slate-900" : "bg-blue-600 text-white")
                }>
                  {m.text}
                </div>
                {m.role === "user" && <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">You</div>}
              </div>
            ))}
            <div ref={endRef} />

            {/* Quick Replies */}
            <div className="mt-2 flex flex-wrap gap-2">
              {quickReplies.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    addUser(t);
                    setTimeout(() => reply(t), 120);
                  }}
                  className="rounded-full border border-blue-200/60 bg-white/70 px-3 py-1 text-xs text-blue-900 hover:bg-blue-50"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={onSend} className="border-t border-slate-200/70 p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700">
              Send
            </button>
          </form>

          <div className="px-3 py-2 text-[11px] text-slate-500 bg-slate-50 border-t border-slate-200/70">
            Need a human? Call {PHONE} or email {EMAIL}. For WhatsApp confirmation we’ll share a link after booking.
          </div>
        </div>
      )}
    </div>
  );
}
