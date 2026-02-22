import { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
};

export function Card({ children, className, onClick, hoverable = false }: CardProps) {
  const Component = onClick || hoverable ? motion.div : "div";

  return (
    <Component
      onClick={onClick}
      {...(hoverable || onClick ? {
        whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
        whileTap: { scale: 0.99 }
      } : {})}
      className={clsx(
        "glass-card overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </Component>
  );
}