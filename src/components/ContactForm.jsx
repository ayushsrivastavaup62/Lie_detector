import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", feedback: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-300">
          Name
          <input value={form.name} onChange={updateField("name")} className="rounded-2xl border border-white/10 bg-black/75 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/45" placeholder="Your name" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-300">
          Email
          <input value={form.email} onChange={updateField("email")} type="email" className="rounded-2xl border border-white/10 bg-black/75 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/45" placeholder="you@example.com" required />
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-medium text-stone-300">
        Feedback
        <textarea value={form.feedback} onChange={updateField("feedback")} className="min-h-36 rounded-2xl border border-white/10 bg-black/75 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/45" placeholder="Tell us what would make Lie_detector more useful." required />
      </label>
      <button type="submit" className="glow-button mt-6">
        Submit Feedback <Send className="h-4 w-4" />
      </button>
      {submitted && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl border border-mintGlow/20 bg-mintGlow/10 p-4 text-sm text-mintGlow">
          Thank you. Your demo feedback has been received successfully.
        </motion.p>
      )}
    </form>
  );
}
