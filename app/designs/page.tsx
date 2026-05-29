import { DesignCard } from '@/components/cards/DesignCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getServerSupabase } from '@/lib/serverSupabase';

async function getDesigns() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return [];
  }

  const { data } = await supabase.from('designs').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

export default async function DesignsPage() {
  const designs = await getDesigns();

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <SectionHeader title="Design Gallery" description="Graphic and motion-first creative work." />
      <p className="mt-5 max-w-2xl text-base text-muted">
        A responsive gallery of visual design assets, brand systems, and expressive creative compositions.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {designs.length === 0 ? (
          <div className="rounded-3xl border border-border bg-panel p-10 text-muted">No design uploads available.</div>
        ) : (
          designs.map((design) => (
            <DesignCard key={design.id} title={design.title} description={design.description} tags={design.tags ?? []} image_url={design.image_url} />
          ))
        )}
      </div>
    </div>
  );
}
