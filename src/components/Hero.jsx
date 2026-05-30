import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, Hand, ScanFace, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const heroText = "Detect AI-generated images and videos before they Shape the Truth";

export default function Hero() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    let deleting = false;
    let timeoutId;

    const type = () => {
      if (!deleting && index <= heroText.length) {
        setTypedText(heroText.slice(0, index));
        index += 1;
        timeoutId = window.setTimeout(type, index === heroText.length + 1 ? 1400 : 48);
        return;
      }

      deleting = true;
      if (index >= 0) {
        setTypedText(heroText.slice(0, index));
        index -= 1;
        timeoutId = window.setTimeout(type, index < 0 ? 450 : 24);
        return;
      }

      deleting = false;
      index = 0;
      timeoutId = window.setTimeout(type, 300);
    };

    type();
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section className="container-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanGlow/25 bg-cyanGlow/10 px-4 py-2 text-sm text-cyanGlow">
          <Sparkles className="h-4 w-4" />
          Media authenticity scanner
        </div>
        <h1 className="min-h-[11rem] max-w-4xl text-4xl font-black tracking-tight text-white sm:min-h-[14rem] sm:text-6xl lg:min-h-[16rem] lg:text-7xl">
          <span className="text-stone-50">
            {typedText}
          </span>
          <span className="ml-1 inline-block h-10 w-1 translate-y-1 rounded-full bg-cyanGlow shadow-glow sm:h-14 lg:h-16" />
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-400">
          Lie_detector helps people identify suspicious synthetic media, reduce misinformation risk, and make faster trust decisions with clear confidence signals.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#upload" className="glow-button">
            Start Detection <ScanFace className="h-4 w-4" />
          </a>
          <Link to="/trending" className="ghost-button">
            Explore Trending Fakes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="relative mx-auto aspect-square w-full max-w-[520px]"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_160deg,rgba(34,211,238,0.55),rgba(167,139,250,0.35),rgba(251,113,133,0.35),rgba(34,211,238,0.55))] p-px shadow-violet">
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink/95 p-7">
            <motion.div
              className="absolute inset-x-8 top-10 z-20 h-1 rounded-full bg-cyanGlow/80 blur-sm"
              animate={{ y: [0, 370, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-x-10 top-12 z-10 h-24 bg-gradient-to-b from-cyanGlow/20 via-cyanGlow/5 to-transparent"
              animate={{ y: [0, 325, 0], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="grid h-full place-items-center rounded-3xl border border-white/10 bg-black/30">
              <div className="relative grid h-72 w-72 place-items-center rounded-full border border-cyanGlow/20 bg-cyanGlow/[0.03]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-dashed border-cyanGlow/40"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-10 rounded-full border border-dashed border-violetGlow/35"
                />
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(251,113,133,0)",
                      "0 0 46px rgba(251,113,133,0.62)",
                      "0 0 0 rgba(251,113,133,0)",
                    ],
                    borderColor: [
                      "rgba(34,211,238,0.28)",
                      "rgba(251,113,133,0.72)",
                      "rgba(34,211,238,0.28)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-44 w-44 place-items-center rounded-[2rem] border bg-black/35"
                >
                  <Hand className="h-24 w-24 text-cyanGlow drop-shadow-[0_0_22px_rgba(34,211,238,0.72)]" />
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute rounded-full bg-roseGlow/20 p-4 text-roseGlow shadow-[0_0_32px_rgba(251,113,133,0.52)]"
                  >
                    <Fingerprint className="h-10 w-10" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-7 left-7 right-7 grid grid-cols-3 gap-3">
              {["Palm scan", "Threat pulse", "Metadata"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-center text-xs text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
