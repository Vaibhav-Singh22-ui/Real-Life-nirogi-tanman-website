"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import AuthFormShell from "@/components/auth/AuthFormShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const schema = z.object({ email: z.string().email() });

type FormData = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const { sendPasswordResetEmail } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await sendPasswordResetEmail(data.email.trim().toLowerCase());
    if (!res.success) {
      setError("root", { message: res.error || "Failed to send reset link. Try again." });
      toast.error(res.error || "Failed to send reset link.");
      return;
    }

    setIsSubmitted(true);
    toast.success("Password reset link sent to your email!");
  };

  return (
    <AuthFormShell
      title="Forgot Password"
      description="Enter your email to receive a secure password reset link."
      footerText="Remembered your password?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
      {isSubmitted ? (
        <div className="space-y-4 text-center py-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-[#2F5E1A]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Reset Link Sent</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We’ve sent a secure password recovery link to your inbox. Open the email and click the link to update your password.
          </p>
          <div className="pt-2">
            <Button variant="outline" asChild className="rounded-xl text-xs font-bold w-full">
              <Link href="/login" className="flex items-center justify-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Sign In
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-rose-500 font-semibold">Enter a valid email address</p>}
          </div>

          <Button type="submit" className="w-full bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl py-2.5 font-bold text-xs" disabled={isSubmitting}>
            {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>
          {errors.root && <p className="text-xs text-rose-500 font-semibold">{errors.root.message}</p>}
        </form>
      )}
    </AuthFormShell>
  );
};

export default ForgotPasswordPage;
