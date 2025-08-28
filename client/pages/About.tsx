export default function About() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            About <span className="text-blue-600">Nextgen Computing</span>
          </h1>
          <p className="mt-5 text-slate-600 leading-relaxed">
            We are a team of technology enthusiasts dedicated to providing cutting-edge computers and laptops, backed by expert repair and maintenance services. Our mission is to keep you productive and secure with fast turnaround and honest pricing.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200/70 p-4 text-center bg-white/60 backdrop-blur animate-fade-in" style={{animationDelay:'0.05s'}}>
              <div className="mx-auto h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center animate-float">🏆</div>
              <div className="mt-3 font-semibold">10+ Years</div>
              <div className="text-xs text-slate-500">Experience</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 p-4 text-center bg-white/60 backdrop-blur animate-fade-in" style={{animationDelay:'0.15s'}}>
              <div className="mx-auto h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center animate-float">🔒</div>
              <div className="mt-3 font-semibold">Trusted</div>
              <div className="text-xs text-slate-500">Secure & Transparent</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 p-4 text-center bg-white/60 backdrop-blur animate-fade-in" style={{animationDelay:'0.25s'}}>
              <div className="mx-auto h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center animate-float">💬</div>
              <div className="mt-3 font-semibold">5-Star Support</div>
              <div className="text-xs text-slate-500">Customer Service</div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/7286027/pexels-photo-7286027.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Technicians repairing laptops in a professional workshop"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
