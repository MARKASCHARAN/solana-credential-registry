"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive" | "trust";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default:
      "bg-primary/20 text-primary border-primary/20",
    secondary:
      "bg-secondary/50 text-secondary-foreground border-white/5",
    outline:
      "border-border text-muted-foreground",
    destructive:
      "bg-destructive/10 text-destructive border-destructive/20",
    trust:
      "bg-primary text-primary-foreground font-bold tracking-tight",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}