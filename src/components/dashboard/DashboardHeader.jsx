import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function DashboardHeader({ name }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-6 rounded-[2rem] border border-white/[0.08] bg-black/65 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanGlow/20 bg-cyanGlow/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyanGlow">
          <ShieldCheck className="h-3.5 w-3.5" />
          User Dashboard
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Welcome back, {name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300">
          Track your scans, plan usage, and media authenticity reports.
        </p>
      </div>
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-stone-300">
        <span className="font-semibold text-white">Status:</span> Verification workspace active
      </div>
    </motion.header>
  );
}
