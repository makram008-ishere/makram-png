import { ProjectCard } from '@/components/cards/ProjectCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getServerSupabase } from '@/lib/serverSupabase';

async function getProjects() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return [];
  }

  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <SectionHeader title="Projects" description="Developer and product work." />
      <p className="mt-5 max-w-2xl text-base text-muted">
        Browse a curated selection of web applications, brand systems, and polished product interfaces.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-border bg-panel p-10 text-muted">No projects available yet.</div>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} title={project.title} description={project.description} github_link={project.github_link} live_link={project.live_link} tags={project.tags ?? []} image_url={project.image_url} />
          ))
        )}
      </div>
    </div>
  );
}
