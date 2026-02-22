import clsx from "clsx";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5",
        variant === "outline" &&
          "border border-border bg-transparent hover:bg-accent/50 hover:text-accent-foreground",
        variant === "ghost" &&
          "bg-transparent hover:bg-accent/50 hover:text-accent-foreground",
        variant === "destructive" &&
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    />
  );
}