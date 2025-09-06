import { useEffect, useMemo, useRef, useState } from "react";

// Floating Chatbot for Nextgen Computing
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  const PHONE = "+918469283448";
  const EMAIL = "nextgencomputing01@gmail.com";
  const ADDRESS = "Bopal, Ahmedabad, Gujarat";
  const WHATSAPP = `https://wa.me/${PHONE.replace(/\D/g, "")}`;
  const MAPS = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}`;

  const quickReplies = useMemo(
    () => [
      "Services",
      "Book a repair",
      "Shop products",
      "Contact",
      "Location",
      "Email",
      "Call",
      "Warranty",
    ],
    []
  );

  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text:
            "Hi! I’m the Nextgen Computing assistant. I can help with repairs, upgrades, product queries and directions. How can I help you today?",
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const reply = (text: string) => {
    const add = (t: string) => setMessages((m) => [...m, { role: "bot", text: t }]);
    const q = text.toLowerCase();

    if (/^services?$/.test(text) || q.includes("service") || q.includes("repair")) {
      add(
        "We offer: Laptop & Desktop Repair, Data Recovery, OS Install & Tune‑up, Hardware Upgrades (SSD/RAM/GPU/CPU), and Maintenance & Cleaning."
      );
      add(
        `Book now on WhatsApp: ${WHATSAPP}?text=${encodeURIComponent(
          "Hello Nextgen Computing — I want to book a repair or service"
        )}`
      );
      return;
    }

    if (q.includes("book")) {
      add(
        `Great! Tap to book on WhatsApp: ${WHATSAPP}?text=${encodeURIComponent(
          "Hello Nextgen Computing — I want to book a repair or service"
        )}`
      );
      return;
    }

    if (q.includes("shop") || q.includes("product")) {
      add("You can browse featured products and peripherals on our Products page.");
      add("Open Products: /products");
      return;
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("call")) {
      add(`Phone: +91 8469283448 (tap to call: tel:${PHONE})`);
      add(`WhatsApp: ${WHATSAPP}`);
      add(`Email: ${EMAIL}`);
      return;
    }

    if (q.includes("email")) {
      add(`Email us at ${EMAIL}`);
      return;
    }

    if (q.includes("location") || q.includes("address") || q.includes("map")) {
      add(`Address: ${ADDRESS}`);
      add(`Directions: ${MAPS}`);
      return;
    }

    if (q.includes("warranty") || q.includes("guarantee")) {
      add(
        "Repairs include warranty as stated on your invoice (varies by service and parts). We use genuine parts where available."
      );
      add(`Have a specific job in mind? Message us: ${WHATSAPP}`);
      return;
    }

    add(
      "I can help with Services, Booking, Products, Contact, and Location. Try one of the quick suggestions below."
    );
  };

  const onSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => reply(text), 200);
  };

  return (
    <div className="safe-fixed z-[99999]">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5 h-14 w-14 md:h-14 md:w-14"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          // Close icon
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Chat bubble icon
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
        )}
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
                  "rounded-2xl px-3 py-2 max-w-[80%] text-sm " +
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
                    setMessages((m) => [...m, { role: "user", text: t }]);
                    setTimeout(() => reply(t), 150);
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
            Need a human? Chat on WhatsApp: <a className="text-blue-700 font-medium" href={`${WHATSAPP}?text=${encodeURIComponent("Hello Nextgen Computing — I need help with...")}`} target="_blank" rel="noreferrer">Open WhatsApp</a>
          </div>
        </div>
      )}
    </div>
  );
}
