import "./global.css";
import { useEffect } from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp";
import ScrollToTop from "./components/routing/ScrollToTop";
import About from "./pages/About";
import Placeholder from "./pages/Placeholder";
import Products from "./pages/Products";
import Testimonials from "./pages/Testimonials";
import Admin from "./pages/Admin";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const AppShell = () => {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    let title = "Nextgen Computing";
    if (path === "/") title = "Nextgen Computing – Home";
    else if (path.startsWith("/products")) title = "Products – Nextgen Computing";
    else if (path.startsWith("/services")) title = "Services – Nextgen Computing";
    else if (path.startsWith("/about")) title = "About – Nextgen Computing";
    else if (path.startsWith("/contact")) title = "Contact – Nextgen Computing";
    else if (path.startsWith("/testimonials")) title = "Testimonials – Nextgen Computing";
    else if (path.startsWith("/admin")) title = "Admin – Nextgen Computing";
    document.title = title;
  }, [location.pathname]);
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-dvh flex flex-col">
      {!isAdmin && <SiteHeader />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <SiteFooter />}
      {!isAdmin && <FloatingWhatsApp />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
