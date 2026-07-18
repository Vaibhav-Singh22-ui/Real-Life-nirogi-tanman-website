import Link from "next/link";
import { blogPosts } from "@/data/health-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BlogPage = () => {
  return (
    <section className="section-band">
      <div className="container space-y-6">
        <div>
          <p className="uppercase-label text-primary">Insights</p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">Blog</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="surface-panel">
              <CardHeader>
                <p className="text-xs text-muted-foreground">{post.category} · {post.date}</p>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{post.excerpt}</p>
                <Button variant="ghost" className="h-auto p-0 text-primary" asChild>
                  <Link href={`/blog/${post.id}`}>Read Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
