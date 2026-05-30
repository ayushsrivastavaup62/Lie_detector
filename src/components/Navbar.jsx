import { Menu, ScanSearch, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Truth Scanner", to: "/" },
  { label: "Viral Fakes", to: "/trending" },
  { label: "Our Mission", to: "/about" },
  { label: "Connect", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition duration-300 ${
      isActive
        ? "bg-white/[0.055] text-cyanGlow shadow-[0_0_18px_rgba(134,217,232,0.12)]"
        : "text-stone-300 hover:-translate-y-0.5 hover:bg-white/[0.045] hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/75 shadow-[0_16px_50px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
      <nav className="container-shell flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyanGlow/25 bg-black/75 shadow-[0_0_16px_rgba(134,217,232,0.10)]">
            <ScanSearch className="h-5 w-5 text-cyanGlow" />
          </span>
          <span className="text-xl font-black tracking-wide text-stone-50 drop-shadow-[0_0_14px_rgba(134,217,232,0.16)]">
            Lie_detector
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/75 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="container-shell pb-5 md:hidden">
          <div className="glass-card grid gap-2 rounded-2xl p-3">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
