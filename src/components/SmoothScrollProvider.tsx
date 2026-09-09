"use client";

import { useLenisSetup } from "@/lib/useLenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useLenisSetup();
  return <>{children}</>;
}
