"use client";

import { Suspense } from "react";
import EmailVerificationPage from "@/views/auth/EmailVerificationPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationPage />
    </Suspense>
  );
}
