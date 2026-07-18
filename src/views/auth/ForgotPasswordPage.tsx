import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthFormShell from "@/components/auth/AuthFormShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({ email: z.string().email() });

type FormData = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    router.push("/reset-password");
  };

  return (
    <AuthFormShell title="Forgot password" description="We’ll send a secure reset link to your email.">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs status-error">Enter a valid email address</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>Send Reset Link</Button>
      </form>
    </AuthFormShell>
  );
};

export default ForgotPasswordPage;
