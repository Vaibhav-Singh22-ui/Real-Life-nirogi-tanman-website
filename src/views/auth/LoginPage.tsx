import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthFormShell from "@/components/auth/AuthFormShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { getRoleDashboardPath } from "@/lib/role-routing";
import type { AppRole } from "@/types/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const TEST_PASSWORD = "Test@1234";

const TEST_EMAILS: Record<AppRole, string> = {
  patient: "test.patient@nirogi.app",
  doctor: "test.doctor@nirogi.app",
  yoga: "test.yoga@nirogi.app",
  admin: "test.admin@nirogi.app",
};

const LoginPage = () => {
  const router = useRouter();
  const [selectedTestRole, setSelectedTestRole] = useState<Exclude<AppRole, "admin">>("patient");
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const normalizedEmail = data.email.trim().toLowerCase();

    const matchedTestRole = (Object.entries(TEST_EMAILS).find(
      ([role, email]) => role === selectedTestRole && email === normalizedEmail && data.password === TEST_PASSWORD,
    )?.[0] as AppRole | undefined);

    if (matchedTestRole) {
      localStorage.setItem("nirogi_signup_role", matchedTestRole);
      router.replace(getRoleDashboardPath(matchedTestRole));
      return;
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: data.password,
    });

    if (error) {
      const message = error.message.toLowerCase();

      if (message.includes("email not confirmed")) {
        setError("root", {
          message: "Your email is not verified yet. Please verify your email first, then sign in.",
        });
        return;
      }

      setError("root", { message: "Invalid email or password. Please try again." });
      return;
    }

    const roleFromUser = authData.user?.user_metadata?.role as string | undefined;
    const roleFromState = null;
    const roleFromStorage = localStorage.getItem("nirogi_signup_role");
    const targetPath = getRoleDashboardPath(roleFromUser ?? roleFromState ?? roleFromStorage);

    localStorage.removeItem("nirogi_signup_role");
    router.replace(targetPath);
  };

  return (
    <AuthFormShell
      title="Welcome back"
      description="Sign in to continue your healthcare journey"
      footerText="New to Nirogi Tanman?"
      footerLinkLabel="Create account"
      footerLinkTo="/register"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-xs status-error">Enter a valid email</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && <p className="text-xs status-error">Password must be at least 8 characters</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="testRole">Test role</Label>
          <Select value={selectedTestRole} onValueChange={(value) => setSelectedTestRole(value as Exclude<AppRole, "admin">)}>
            <SelectTrigger id="testRole">
              <SelectValue placeholder="Choose a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="yoga">Yoga Instructor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border border-border/70 bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Role test credentials</p>
          <p className="mt-1">Email: {TEST_EMAILS[selectedTestRole]}</p>
          <p>Password: {TEST_PASSWORD}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="text-primary">Forgot password?</Link>
          <Link href="/otp-verification" className="text-muted-foreground">Use OTP</Link>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>Sign In</Button>
        {errors.root && <p className="text-xs status-error">{errors.root.message}</p>}
      </form>
    </AuthFormShell>
  );
};

export default LoginPage;
