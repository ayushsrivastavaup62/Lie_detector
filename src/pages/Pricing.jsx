import { motion } from "framer-motion";
import { CheckCircle2, Crown, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const plans = [
  {
    id: "free",
    name: "Free Trial",
    price: "₹0",
    originalPrice: "",
    badge: "Current trial",
    features: ["5 image scans", "Image upload only", "Get Trending AI Articles"],
    button: "Current Plan",
  },
  {
    id: "starter",
    name: "Starter Trust Pack",
    price: "₹99",
    originalPrice: "₹149",
    badge: "Save ₹50",
    features: ["50 scans", "Image + Video scans", "Priority detection", "Get Trending AI Articles"],
    button: "Upgrade to Starter",
  },
  {
    id: "pro",
    name: "Pro Verification Pack",
    price: "₹159",
    originalPrice: "₹249",
    badge: "Save ₹90",
    features: ["100 scans", "Image + Video scans", "Download-ready reports (coming soon)", "Get Trending AI Articles"],
    button: "Upgrade to Pro",
  },
];

export default function Pricing() {
  const { isLoggedIn, loading, plan, activateDemoPlan } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planError, setPlanError] = useState("");
  const [activating, setActivating] = useState(false);

  if (loading) {
    return <section className="container-shell min-h-[calc(100vh-5rem)] py-16 sm:py-24" />;
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const activatePlan = async () => {
    if (!selectedPlan || selectedPlan.id === "free") return;

    try {
      setActivating(true);
      setPlanError("");
      await activateDemoPlan(selectedPlan.id);
      setSelectedPlan(null);
    } catch (error) {
      setPlanError(error.message);
    } finally {
      setActivating(false);
    }
  };

  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amberGlow">Purchase access</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-50 sm:text-5xl">Choose your verification pack</h1>
        <p className="section-copy mx-auto">
          Upgrade the demo plan to unlock more scans and video detection while keeping the current Lie_detector experience intact.
        </p>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((item, index) => {
          const isCurrent = plan === item.id;
          const isFreePlan = item.id === "free";
          const isStarter = item.id === "starter";
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className={`flex h-full flex-col rounded-3xl border bg-black/75 p-6 shadow-2xl shadow-black/45 backdrop-blur-2xl transition sm:p-7 ${
                isCurrent
                  ? "border-cyanGlow/45 shadow-[0_0_26px_rgba(134,217,232,0.14)]"
                  : isStarter
                    ? "border-amberGlow/45 shadow-[0_0_26px_rgba(217,154,69,0.12)]"
                    : "border-white/[0.08] hover:border-amberGlow/30"
              }`}
            >
              <div className="flex flex-1 flex-col gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-black text-white">{item.name}</h2>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${isCurrent ? "border-cyanGlow/25 text-cyanGlow" : "border-amberGlow/25 text-amberGlow"}`}>
                      {isCurrent ? "Current Plan" : isStarter ? "Most Popular" : item.badge}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end gap-3">
                    {item.originalPrice && <span className="pb-1 text-lg font-semibold text-stone-500 line-through">{item.originalPrice}</span>}
                    <span className="text-4xl font-black text-stone-50">{item.price}</span>
                  </div>
                </div>

                <div className="mt-auto flex justify-center sm:justify-start">
                  <button
                    type="button"
                  className={isCurrent || isFreePlan ? "ghost-button cursor-default opacity-80" : "glow-button"}
                  disabled={isCurrent || isFreePlan}
                  onClick={() => {
                    setPlanError("");
                    setSelectedPlan(item);
                  }}
                  >
                    {isCurrent || isFreePlan ? "Current Plan" : item.button}
                    {!isCurrent && !isFreePlan && <Crown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-stone-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-mintGlow" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass-card w-full max-w-lg rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanGlow">Demo purchase</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Payment integration coming soon.</h3>
              </div>
              <button type="button" onClick={() => setSelectedPlan(null)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-black/75 text-stone-300 transition hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 leading-7 text-stone-300">
              {selectedPlan.name} is ready for the frontend demo. Activate it locally to update attempts and unlock video detection.
            </p>
            {planError && <p className="mt-4 rounded-2xl border border-roseGlow/20 bg-roseGlow/10 p-3 text-sm text-roseGlow">{planError}</p>}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="glow-button disabled:cursor-not-allowed disabled:opacity-60" onClick={activatePlan} disabled={activating}>
                {activating ? "Activating..." : "Activate Demo Plan"} <Sparkles className="h-4 w-4" />
              </button>
              <button type="button" className="ghost-button" onClick={() => setSelectedPlan(null)}>
                Not Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
