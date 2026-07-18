import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
  role: z.enum(["patient", "doctor", "yoga"], {
    required_error: "Please select the role you want to join as",
  }),
});

type FormData = z.infer<typeof schema>;

const roleOptions: { label: string; value: Exclude<AppRole, "admin"> }[] = [
  { label: "Patient", value: "patient" },
  { label: "Doctor", value: "doctor" },
  { label: "Yoga Instructor", value: "yoga" },
];

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue, setError, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: FormData) => {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/email-verification?role=${data.role}`,
        data: {
          full_name: data.fullName,
          phone: data.phone,
          role: data.role,
        },
      },
    });

    if (error) {
      setError("root", {
        message: error.message || "We could not create your account. Please try again.",
      });
      return;
    }

    if (signUpData.session || signUpData.user?.email_confirmed_at) {
      router.replace(getRoleDashboardPath(data.role));
      return;
    }

    localStorage.setItem("nirogi_signup_role", data.role);

    router.push(`/email-verification?role=${data.role}&email=${encodeURIComponent(data.email)}`);
  };

  return (
    <AuthFormShell
      title="Create your account"
      description="Set up your secure healthcare workspace"
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("role")} />
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && <p className="text-xs status-error">Please enter your full name</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs status-error">Please provide a valid email</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...register("phone")} />
          {errors.phone && <p className="text-xs status-error">Enter a valid phone number</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-xs status-error">Password must be at least 8 characters</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">I want to join as</Label>
          <Select
            value={selectedRole}
            onValueChange={(value) =>
              setValue("role", value as AppRole, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-xs status-error">{errors.role.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>Create Account</Button>
        {errors.root && <p className="text-xs status-error">{errors.root.message}</p>}
      </form>
    </AuthFormShell>
  );
};

export default RegisterPage;
