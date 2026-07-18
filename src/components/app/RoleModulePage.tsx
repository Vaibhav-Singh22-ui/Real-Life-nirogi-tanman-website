import { Calendar, Clock, Filter, Plus } from "lucide-react";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type RoleModulePageProps = {
  title: string;
  description: string;
  roleLabel: string;
  metrics: Array<{ title: string; value: string; change: string; trend: "up" | "down" | "neutral" }>;
  tableColumns: string[];
  tableRows: string[][];
};

const RoleModulePage = ({ title, description, roleLabel, metrics, tableColumns, tableRows }: RoleModulePageProps) => {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary">{roleLabel} Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">{title}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            New Item
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} change={item.change} trend={item.trend} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Operational Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {tableColumns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map((row, index) => (
                  <TableRow key={`${row[0]}-${index}`}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={`${cell}-${cellIndex}`}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader>
            <CardTitle>Today at a glance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              8 scheduled actions
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Average turnaround: 16 minutes
            </p>
            <p>This module is fully scaffolded for backend binding with real APIs, filters, and workflows.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default RoleModulePage;