import { getServerSupabase } from '@/lib/serverSupabase';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { PostCard } from '@/components/cards/PostCard';

async function getHomeData() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return { projects: [], posts: [] };
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .limit(3)
    .order('created_at', { ascending: false });

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .limit(3)
    .order('created_at', { ascending: false });

  return { projects: projects ?? [], posts: posts ?? [] };
}

export default async function HomePage() {
  const { projects, posts } = await getHomeData();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.42em] text-accent">Hello, I’m Makram</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Developer + Graphic Designer crafting polished digital experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              A modern portfolio to showcase code, creative branding, and design systems with a strong focus on craft, motion, and clarity.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-panel p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Specialties</p>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>Front-end engineering</li>
                <li>Visual identity systems</li>
                <li>Interactive interfaces</li>
                <li>Responsive product design</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-panel p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">What I build</p>
              <p className="mt-5 text-sm leading-7 text-muted">
                Complete portfolio sites, blog systems, design galleries, and branded experiences for digital-first creators.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-panel p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Featured work</p>
          <div className="mt-8 space-y-6">
            {projects.length === 0 ? (
              <p className="text-sm text-muted">No featured projects available yet.</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="rounded-3xl border border-border bg-surface p-5">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mt-20 space-y-10">
        <SectionHeader title="Projects" description="Selected developer and design work." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-border bg-panel p-8 text-muted">No projects to display yet.</div>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project.id} title={project.title} description={project.description} github_link={project.github_link} live_link={project.live_link} tags={project.tags ?? []} image_url={project.image_url} />
            ))
          )}
        </div>
      </section>

      <section className="mt-20 space-y-10">
        <SectionHeader title="Latest posts" description="Insights, dev logs, and creative process." />
        <div className="grid gap-6 xl:grid-cols-3">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-border bg-panel p-8 text-muted">No posts yet. Add some content from the admin panel.</div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} id={post.id} title={post.title} cover_image={post.cover_image} tags={post.tags ?? []} excerpt={post.content.slice(0, 140) + '...'} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
