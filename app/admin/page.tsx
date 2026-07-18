"use client";

import { Suspense } from "react";
import Admin from "@/views/Admin";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Admin />
    </Suspense>
  );
}
