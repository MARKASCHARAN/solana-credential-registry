"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalBackdrop, modalPanel } from "@/animations/cardMotion";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg glass-card p-8 rounded-2xl relative overflow-hidden"
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle top light effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}