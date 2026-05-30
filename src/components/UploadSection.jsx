import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ExternalLink, FileVideo, ImagePlus, Loader2, SearchCheck, UploadCloud, X } from "lucide-react";
import { useState } from "react";

// Later this list can be replaced with real web search or scraping API results.
const relatedArticles = [
  {
    title: "How AI-generated images are spreading misinformation online",
    source: "Digital Trust Review",
    snippet: "Analysts explain how synthetic visuals can quickly influence public perception when shared without verification.",
    date: "May 22, 2026",
  },
  {
    title: "Deepfake videos create new challenges for digital trust",
    source: "Media Integrity Lab",
    snippet: "New deepfake workflows make realistic video manipulation easier, raising the need for layered authenticity checks.",
    date: "May 18, 2026",
  },
  {
    title: "Experts warn users to verify viral media before sharing",
    source: "Cyber Awareness Weekly",
    snippet: "Verification specialists recommend checking sources, context, metadata, and independent reporting before resharing.",
    date: "May 11, 2026",
  },
];

export default function UploadSection() {
  const [state, setState] = useState("idle");
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const runDemo = () => {
    setState("analyzing");
    window.setTimeout(() => setState("done"), 2300);
  };

  return (
    <section id="upload" className="container-shell py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanGlow">Demo detection</p>
        <h2 className="section-title mt-3">Upload media for a simulated authenticity scan</h2>
        <p className="section-copy mx-auto">
          This frontend uses static demo results for now. The flow shows how image and video analysis will feel once a real model is connected.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-3xl border-dashed p-6 sm:p-8"
        >
          <div className="grid min-h-[340px] place-items-center rounded-2xl border border-dashed border-cyanGlow/35 bg-black/30 p-6 text-center">
            <div>
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cyanGlow/10 shadow-glow">
                <UploadCloud className="h-9 w-9 text-cyanGlow" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white">Drag and drop image or video</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Supports visual demo states for JPG, PNG, MP4, MOV, and WebM files.
              </p>
              <div className="mt-5 flex justify-center gap-3 text-xs text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                  <ImagePlus className="h-4 w-4 text-cyanGlow" /> Images
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                  <FileVideo className="h-4 w-4 text-violetGlow" /> Videos
                </span>
              </div>
              <button type="button" className="glow-button mt-7" onClick={runDemo}>
                Run Demo Analysis
              </button>
            </div>
          </div>
        </motion.div>

        <div className="glass-card rounded-3xl p-6 sm:p-8">
          {state === "idle" && (
            <div className="flex h-full min-h-[340px] flex-col justify-center">
              <AlertTriangle className="h-9 w-9 text-cyanGlow" />
              <h3 className="mt-5 text-2xl font-bold text-white">Awaiting sample media</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Start the demo to see the analysis loader, confidence panel, related articles, and explanation card.
              </p>
            </div>
          )}

          {state === "analyzing" && (
            <div className="min-h-[340px]">
              <div className="flex items-center gap-3 text-cyanGlow">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-semibold">Analyzing media patterns...</span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/10" />
                <div className="h-24 animate-pulse rounded-2xl bg-white/10" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 animate-pulse rounded-2xl bg-white/10" />
                  <div className="h-24 animate-pulse rounded-2xl bg-white/10" />
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-cyanGlow"
                    initial={{ width: "8%" }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 2.1, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          )}

          {state === "done" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="min-h-[340px]">
              <div className="flex items-center gap-3 text-mintGlow">
                <CheckCircle2 className="h-6 w-6" />
                <span className="font-semibold">Demo analysis complete</span>
              </div>
              <div className="mt-7 rounded-2xl border border-roseGlow/25 bg-roseGlow/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseGlow">Result</p>
                <p className="mt-3 text-4xl font-black text-white">92% chance AI-generated</p>
                <p className="mt-3 leading-7 text-slate-300">
                  Synthetic texture repetition, lighting inconsistencies, and metadata gaps were detected in this static demo scenario.
                </p>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-sm text-slate-400">Confidence level</p>
                  <p className="mt-2 text-2xl font-bold text-cyanGlow">High</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-sm text-slate-400">Analysis mode</p>
                  <p className="mt-2 text-2xl font-bold text-violetGlow">Static demo</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 text-white">
                  <SearchCheck className="h-5 w-5 text-cyanGlow" />
                  <h3 className="font-bold">Related AI Fake Media Articles</h3>
                </div>
                <div className="space-y-3">
                  {relatedArticles.map((article) => (
                    <article key={article.title} className="rounded-2xl border border-white/10 bg-black/25 p-4 transition duration-300 hover:border-cyanGlow/30 hover:bg-white/[0.06]">
                      <h4 className="font-semibold leading-6 text-white">{article.title}</h4>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span>{article.source}</span>
                        <span>{article.date}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{article.snippet}</p>
                      <button type="button" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyanGlow transition hover:text-white">
                        Read More <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-cyanGlow/20 bg-cyanGlow/10 p-4 text-sm leading-6 text-slate-300">
                Lie_detector can make mistakes. AI-based results are predictions, not guaranteed proof.
                <button type="button" onClick={() => setDisclaimerOpen(true)} className="ml-2 font-semibold text-cyanGlow transition hover:text-white">
                  Read More
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {disclaimerOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass-card max-w-2xl rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanGlow">Accuracy disclaimer</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Prediction, not final proof</h3>
              </div>
              <button type="button" onClick={() => setDisclaimerOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-5 leading-8 text-slate-300">
              Lie_detector is an AI-oriented media analysis platform. The results shown by the system are based on AI models, visual patterns, metadata signals, and probability-based analysis. Because AI detection itself is not always 100% accurate, the result should not be treated as final legal or factual proof. Users should verify important media from trusted sources before making decisions or sharing content. Lie_detector aims to support awareness, reduce misinformation, and help users think critically, but it cannot guarantee perfect accuracy in every case.
            </p>
            <button type="button" onClick={() => setDisclaimerOpen(false)} className="glow-button mt-6">
              I Understand
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
