import { useEffect, useRef, useState } from "react";

// Floating Chatbot for Nextgen Computing
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "bot" | "user"; text: string }[]
  >([]);
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
    method?: "pickup" | "instore" | "remote" | string;
    time?: string;
    name?: string;
    phone?: string;
  };
  type Flow = {
    mode: "idle" | "booking" | "confirm";
    step: number;
    data: BookingData;
  };
  const [flow, setFlow] = useState<Flow>({ mode: "idle", step: 0, data: {} });

  const baseQuick = [
    "Start booking",
    "Services",
    "Shop products",
    "Contact",
    "Location",
  ] as const;
  const bookingQuickByStep: Record<number, string[]> = {
    1: ["Laptop", "Desktop", "Other", "Start over"],
    2: [
      "Screen broken",
      "Battery issue",
      "Won’t boot",
      "Upgrade",
      "Start over",
    ],
    3: ["Pickup", "In-store", "Remote support", "Start over"],
    4: ["Today evening", "Tomorrow morning", "This weekend", "Start over"],
    5: ["Skip", "Start over"],
  };
  const confirmQuick = ["Confirm", "Start over"] as const;

  const issueOptionsForDevice = (device?: string): string[] => {
    const d = (device || "").toLowerCase();
    if (d.includes("laptop")) {
      return [
        "Screen broken",
        "Battery issue",
        "Keyboard/Touchpad",
        "Won’t boot",
        "Overheating",
        "SSD/RAM upgrade",
        "Start over",
      ];
    }
    if (d.includes("desktop") || d.includes("pc") || d.includes("computer")) {
      return [
        "No display",
        "Won’t boot",
        "Power supply issue",
        "Overheating",
        "SSD/RAM upgrade",
        "Start over",
      ];
    }
    return [
      "Won’t boot",
      "Slow performance",
      "Data recovery",
      "Virus/OS issue",
      "SSD/RAM upgrade",
      "Start over",
    ];
  };

  const getQuickReplies = (): string[] => {
    if (flow.mode === "confirm") return ["Confirm", "Start over"];
    if (flow.mode === "booking") {
      if (flow.step === 1) return ["Laptop", "Desktop", "Other", "Start over"];
      if (flow.step === 2) return issueOptionsForDevice(flow.data.device);
      if (flow.step === 3)
        return ["Pickup", "In-store", "Remote support", "Start over"];
      if (flow.step === 4)
        return [
          "Today evening",
          "Tomorrow morning",
          "This weekend",
          "Start over",
        ];
      if (flow.step === 5) return ["Skip", "Start over"];
      return ["Start over"];
    }
    return [
      "Start booking",
      "Services",
      "Shop products",
      "Contact",
      "Location",
    ];
  };

  const quickReplies = getQuickReplies();

  const addBot = (text: string) =>
    setMessages((m) => [...m, { role: "bot", text }]);
  const addUser = (text: string) =>
    setMessages((m) => [...m, { role: "user", text }]);

  const reset = () => {
    setFlow({ mode: "idle", step: 0, data: {} });
    addBot("Reset. You can Start booking, view Services, or ask a question.");
  };

  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "Welcome to Nextgen Computing! I’ll guide you step‑by‑step to book a repair, find products, or get our contact/location.",
        },
        {
          role: "bot",
          text: "Try: Start booking, Services, Shop products, Contact, Location",
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
    addBot(
      "Step 1/5 — What device do you need help with? (e.g., Laptop, Desktop, Other)",
    );
  };

  const normalizeDevice = (q: string) => {
    if (/laptop|notebook|macbook/i.test(q)) return "Laptop";
    if (/(desktop|pc|computer)/i.test(q)) return "Desktop";
    return q.trim();
  };

  const normalizeMethod = (q: string): BookingData["method"] => {
    if (/pickup|pick\s*up|doorstep|home/i.test(q)) return "pickup";
    if (/in[-\s]?store|store|drop\s*off|shop|visit/i.test(q)) return "instore";
    if (/remote|online|anydesk|teamviewer/i.test(q)) return "remote";
    return q.trim();
  };

  const toSummary = (d: BookingData) =>
    [
      `Device: ${d.device || "-"}`,
      `Issue: ${d.issue || "-"}`,
      `Method: ${d.method || "-"}`,
      `Preferred time: ${d.time || "-"}`,
      d.name ? `Name: ${d.name}` : null,
      d.phone ? `Phone: ${d.phone}` : null,
    ]
      .filter(Boolean)
      .join("\n");

  const handleBookingStep = (text: string) => {
    const q = text.trim();

    if (/^start over$/i.test(q)) {
      return reset();
    }

    if (flow.step === 1) {
      const device = normalizeDevice(q);
      const data = { ...flow.data, device };
      setFlow({ mode: "booking", step: 2, data });
      addBot(
        "Step 2/5 — Briefly describe the issue (e.g., won’t boot, screen broken, battery drains, upgrade needed)",
      );
      return;
    }

    if (flow.step === 2) {
      const issue = q.length < 3 ? "General diagnostics" : q;
      const data = { ...flow.data, issue };
      setFlow({ mode: "booking", step: 3, data });
      addBot(
        "Step 3/5 — Choose service method: Pickup, In‑store, or Remote support",
      );
      return;
    }

    if (flow.step === 3) {
      const method = normalizeMethod(q);
      const data = { ...flow.data, method };
      setFlow({ mode: "booking", step: 4, data });
      addBot(
        "Step 4/5 — What’s your preferred date/time window? (e.g., tomorrow 3‑5pm)",
      );
      return;
    }

    if (flow.step === 4) {
      const time = q;
      const data = { ...flow.data, time };
      setFlow({ mode: "booking", step: 5, data });
      addBot(
        "Step 5/5 — Optional: Share your name and phone (e.g., Rahul, 98XXXXXX10). Or type Skip.",
      );
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
        } else if (/\d/.test(q)) {
          const digits = q.replace(/\D/g, "");
          phone = digits.length >= 7 ? digits : undefined;
        } else {
          name = q.trim();
        }
      }
      const data = { ...flow.data, name, phone };
      const summary = toSummary(data);
      addBot("Thanks! Here’s your booking summary:");
      addBot(summary);
      addBot(
        "If this looks good, type ‘Confirm’. You can also ‘Start over’. No WhatsApp link is sent until you Confirm.",
      );
      setFlow({ mode: "confirm", step: 6, data });
      return;
    }
  };

  const confirmBooking = () => {
    const summary = toSummary(flow.data);
    const text = `Booking Request%0A${encodeURIComponent(summary)}`;
    addBot(`Confirmed. Tap to send on WhatsApp: ${WHATSAPP}?text=${text}`);
    setFlow({ mode: "idle", step: 0, data: {} });
  };

  const reply = (text: string) => {
    const q = text.toLowerCase();

    if (flow.mode === "booking") {
      handleBookingStep(text);
      return;
    }

    if (flow.mode === "confirm") {
      if (/^confirm$/i.test(text)) {
        confirmBooking();
      } else if (/^start over$/i.test(text)) {
        reset();
      } else {
        addBot("Please type ‘Confirm’ to proceed or ‘Start over’ to restart.");
      }
      return;
    }

    if (/\b(start\s*booking|book a?\s*repair|book)\b/i.test(text)) {
      startBooking();
      return;
    }

    if (
      /^services?$|repair|upgrade|data\s*recovery|cleaning|maintenance/i.test(q)
    ) {
      addBot(
        "We offer: Laptop/Desktop Repair, Data Recovery, OS Install & Tune‑up, Hardware Upgrades (SSD/RAM/GPU/CPU), Maintenance & Cleaning.",
      );
      addBot(
        "Type ‘Start booking’ to schedule a service, or ask about pricing/warranty.",
      );
      return;
    }

    if (q.includes("shop") || q.includes("product")) {
      addBot(
        "You can browse products, laptops and accessories on our Products page.",
      );
      addBot("Open Products: /products");
      addBot(
        "Need help choosing? Tell me your budget and use‑case (office, gaming, study). I’ll suggest options.",
      );
      return;
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("call")) {
      addBot(`Phone: ${PHONE}`);
      addBot(`Email: ${EMAIL}`);
      addBot(
        "For instant help, type ‘Start booking’. No WhatsApp link until you confirm.",
      );
      return;
    }

    if (q.includes("email")) {
      addBot(`Email us at ${EMAIL}. For urgent issues, calling is faster.`);
      return;
    }

    if (
      q.includes("location") ||
      q.includes("address") ||
      q.includes("map") ||
      q.includes("directions")
    ) {
      addBot(`Address: ${ADDRESS}`);
      addBot(`Directions: ${MAPS}`);
      addBot("We can do pickups nearby — say ‘Start booking’ to arrange.");
      return;
    }

    if (
      q.includes("warranty") ||
      q.includes("guarantee") ||
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("cost")
    ) {
      addBot(
        "Diagnostics are quick; pricing depends on parts and labor. Repairs include warranty as mentioned on your invoice (varies by service/parts).",
      );
      addBot(
        "Tell me the device and issue, or say ‘Start booking’. I’ll guide you.",
      );
      return;
    }

    addBot(
      "I can help with Start booking, Services, Products, Contact, and Location. Try the quick buttons below.",
    );
  };

  const onSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    addUser(text);
    setInput("");
    setTimeout(() => reply(text), 120);
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
        <span
          className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping"
          aria-hidden="true"
        />
        <span className="relative z-10 flex items-center justify-center">
          {open ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            </svg>
          )}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] rounded-2xl border border-slate-200/70 bg-white/95 backdrop-blur shadow-2xl flex flex-col overflow-hidden">
          <header className="px-4 py-3 border-b border-slate-200/70 bg-gradient-to-r from-blue-50 to-white">
            <h3 className="text-sm font-semibold text-slate-900">
              Nextgen Computing — Chat Assistant
            </h3>
            <p className="text-xs text-slate-600">
              {flow.mode === "booking"
                ? `Booking • Step ${flow.step} of 5`
                : flow.mode === "confirm"
                  ? "Review & Confirm"
                  : "Repairs, upgrades, products and directions"}
            </p>
          </header>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "bot" ? "flex gap-2" : "flex gap-2 justify-end"
                }
              >
                {m.role === "bot" && (
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                )}
                <div
                  className={
                    "rounded-2xl px-3 py-2 max-w-[80%] text-sm whitespace-pre-wrap " +
                    (m.role === "bot"
                      ? "bg-slate-100 text-slate-900"
                      : "bg-blue-600 text-white")
                  }
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    You
                  </div>
                )}
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
                    setTimeout(() => reply(t), 100);
                  }}
                  className="rounded-full border border-blue-200/60 bg-white/70 px-3 py-1 text-xs text-blue-900 hover:bg-blue-50"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSend}
            className="border-t border-slate-200/70 p-2 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700"
            >
              Send
            </button>
          </form>

          <div className="px-3 py-2 text-[11px] text-slate-500 bg-slate-50 border-t border-slate-200/70">
            Need a human? Call {PHONE} or email {EMAIL}. WhatsApp link is only
            shown after you confirm.
          </div>
        </div>
      )}
    </div>
  );
}
