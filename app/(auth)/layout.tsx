"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container flex min-h-screen items-center justify-center py-10">
        {children}
      </main>
    </div>
  );
}
