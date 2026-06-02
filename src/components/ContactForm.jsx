import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { apiClient } from "../context/AuthContext.jsx";

export default function ContactForm() {
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setToast(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.feedback.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setToast({ type: "error", message: "Unable to send feedback. Please try again." });
      return;
    }

    try {
      setSubmitting(true);
      await apiClient.post("/contact", payload);
      setForm({ name: "", email: "", feedback: "" });
      setToast({ type: "success", message: "Feedback submitted successfully." });
    } catch {
      setToast({ type: "error", message: "Unable to send feedback. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card self-start rounded-3xl p-6 sm:p-8">
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
      <button type="submit" className="glow-button mt-6 disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Feedback"} <Send className="h-4 w-4" />
      </button>
      {toast && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-5 rounded-2xl border p-4 text-sm ${
            toast.type === "success" ? "border-mintGlow/20 bg-mintGlow/10 text-mintGlow" : "border-roseGlow/20 bg-roseGlow/10 text-roseGlow"
          }`}
        >
          {toast.message}
        </motion.p>
      )}
    </form>
  );
}
