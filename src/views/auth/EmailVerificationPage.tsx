import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthFormShell from "@/components/auth/AuthFormShell";
import { Button } from "@/components/ui/button";
import { getRoleDashboardPath } from "@/lib/role-routing";
import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/types/navigation";

const EmailVerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roleFromQuery = searchParams ? searchParams.get("role") : null;
  const roleFromStorage = typeof window !== "undefined" ? localStorage.getItem("nirogi_signup_role") : null;

  const selectedRole = useMemo(() => roleFromQuery ?? roleFromStorage, [roleFromQuery, roleFromStorage]);
  const nextPath = getRoleDashboardPath(selectedRole);

  useEffect(() => {
    const clearStoredRole = () => localStorage.removeItem("nirogi_signup_role");

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        clearStoredRole();
        router.replace(nextPath);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session) {
        clearStoredRole();
        router.replace(nextPath);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, nextPath]);

  const goToWorkspace = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      localStorage.removeItem("nirogi_signup_role");
      router.replace(nextPath);
      return;
    }

    router.replace("/login");
  };

  return (
    <AuthFormShell title="Verify your email" description="We sent a verification link to your inbox.">
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>Open your email and confirm your account to activate your role workspace.</p>
        <Button className="w-full" onClick={goToWorkspace}>I've Verified My Email</Button>
      </div>
    </AuthFormShell>
  );
};

export default EmailVerificationPage;
