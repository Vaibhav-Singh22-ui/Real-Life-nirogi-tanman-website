import { useRouter } from "next/navigation";
import AuthFormShell from "@/components/auth/AuthFormShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OtpVerificationPage = () => {
  const router = useRouter();

  return (
    <AuthFormShell title="OTP Verification" description="Enter the 6-digit code sent to your registered phone.">
      <div className="space-y-5">
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full" onClick={() => router.push("/patient/dashboard")}>Verify OTP</Button>
      </div>
    </AuthFormShell>
  );
};

export default OtpVerificationPage;
