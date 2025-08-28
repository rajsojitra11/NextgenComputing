export default function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15)_0%,transparent_40%)]" />
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{description}</p>
        <p className="mt-8 text-sm text-slate-500">Continue the prompt to build this page in full detail.</p>
      </div>
    </section>
  );
}
