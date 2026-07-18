import Link from "next/link";
import { roleOverview } from "@/data/health-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoleSelectionPage = () => {
  return (
    <div className="w-full max-w-5xl space-y-6">
      <div>
        <p className="uppercase-label text-primary">Role Selection</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">Choose your workspace</h1>
        <p className="mt-2 text-muted-foreground">Each role has an independent dashboard and focused workflow.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roleOverview.map((role) => (
          <Card key={role.role} className="surface-panel">
            <CardHeader>
              <CardTitle>{role.role}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{role.description}</p>
              <Button asChild className="w-full">
                <Link href={role.path}>Open {role.role}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleSelectionPage;
