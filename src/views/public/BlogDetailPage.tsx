import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/health-data";
import { Button } from "@/components/ui/button";

const BlogDetailPage = () => {
  const { id } = useParams();
  const post = useMemo(() => blogPosts.find((item) => item.id === id) ?? blogPosts[0], [id]);

  return (
    <section className="section-band">
      <div className="container max-w-3xl space-y-6">
        <Button variant="ghost" className="h-auto p-0 text-primary" asChild>
          <Link href="/blog"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">{post.category} · {post.date}</p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">{post.title}</h1>
        </div>
        <article className="space-y-4 text-muted-foreground">
          <p>{post.excerpt}</p>
          <p>
            Nirogi Tanman publishes practical, clinician-reviewed articles to help patients align diagnostics,
            nutrition, movement, sleep, and stress routines for sustainable health outcomes.
          </p>
          <p>
            This frontend structure is ready to connect with a content backend and CMS module through route-level data loading.
          </p>
        </article>
      </div>
    </section>
  );
};

export default BlogDetailPage;
