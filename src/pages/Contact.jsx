import { Instagram, Linkedin, Mail, Phone, Twitter, Github } from "lucide-react";
import ContactForm from "../components/ContactForm.jsx";

const contactItems = [
  { label: "Mobile", value: "+91 7275794027", icon: Phone, href: "tel:+917275794027" },
  { label: "Email", value: "ayushsrivastavaup62@gmail.com", icon: Mail, href: "mailto:ayushsrivastavaup62@gmail.com" },
  { label: "LinkedIn", value: "www.Linkedin.com/in/ayush-srivastava-3465753b2", icon: Linkedin, href: "https://www.linkedin.com/in/ayush-srivastava-3465753b2", external: true },
  { label: "Instagram", value: "www.instagram.com/ayushsrivastavaup62", icon: Instagram, href: "https://www.instagram.com/ayushsrivastavaup62", external: true },
  { label: "GitHub", value: "https://github.com/ayushsrivastavaup62", icon: Github, href: "https://github.com/ayushsrivastavaup62", external: true },
  { label: "X", value: "www.x.com/I_am_AyushX", icon: Twitter, href: "https://x.com/I_am_AyushX", external: true },
];

export default function Contact() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanGlow">Contact</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">Help shape safer media verification</h1>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Reach out with partnership ideas, product feedback, or suggestions for improving the demo experience.
          </p>
          <div className="mt-8 grid gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="glass-card flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-cyanGlow/25"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyanGlow/10">
                    <Icon className="h-5 w-5 text-cyanGlow" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-stone-500">{item.label}</p>
                    <p className="truncate font-semibold text-stone-100">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
