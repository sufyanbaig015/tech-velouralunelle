"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Loaded on demand, so the animation engine never delays the first paint.
const loadFeatures = () => import("@/components/motion-features").then((mod) => mod.default);

// Provides Framer Motion to the whole site and honours the visitor's reduced-motion setting.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
