import { SectionHeader } from '@/components/ui/SectionHeader';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <SectionHeader title="Contact" description="Let’s create something exceptional." />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-border bg-panel p-10 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Reach out</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Start your next digital project.</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            Whether you need design systems, product launches, or portfolio refreshes, I’m available for freelance and collaborative opportunities.
          </p>
          <div className="mt-8 space-y-5 text-sm text-muted">
            <div>
              <p className="font-semibold text-white">Email</p>
              <p>hello@makram-png.dev</p>
            </div>
            <div>
              <p className="font-semibold text-white">Location</p>
              <p>Remote / Global</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-panel p-10 shadow-glow">
          <form className="space-y-6">
            <label className="block text-sm text-muted">
              <span className="text-white">Name</span>
              <input className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none transition focus:border-accent" type="text" placeholder="Your full name" />
            </label>
            <label className="block text-sm text-muted">
              <span className="text-white">Email</span>
              <input className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none transition focus:border-accent" type="email" placeholder="you@domain.com" />
            </label>
            <label className="block text-sm text-muted">
              <span className="text-white">Message</span>
              <textarea className="mt-3 h-40 w-full resize-none rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none transition focus:border-accent" placeholder="Tell me about your project..." />
            </label>
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#585fff]">
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
