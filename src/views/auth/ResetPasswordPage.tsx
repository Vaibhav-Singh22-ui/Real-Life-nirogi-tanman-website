"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthFormShell from "@/components/auth/AuthFormShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match",
});

type FormData = z.infer<typeof schema>;

const ResetPasswordPage = () => {
  const router = useRouter();
  const { updatePassword } = useAuth();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await updatePassword(data.password);

    if (!res.success) {
      setError("root", { message: res.error || "Failed to update password. Please try again." });
      toast.error(res.error || "Failed to update password.");
      return;
    }

    toast.success("Password updated successfully! Please sign in with your new password.");
    router.replace("/login");
  };

  return (
    <AuthFormShell title="Set New Password" description="Create a new secure password for your account.">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && <p className="text-xs text-rose-500 font-semibold">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-xs text-rose-500 font-semibold">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl py-2.5 font-bold text-xs" disabled={isSubmitting}>
          {isSubmitting ? "Updating Password..." : "Update Password"}
        </Button>
        {errors.root && <p className="text-xs text-rose-500 font-semibold">{errors.root.message}</p>}
      </form>
    </AuthFormShell>
  );
};

export default ResetPasswordPage;
