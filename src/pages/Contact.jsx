import { Instagram, Linkedin, Mail, Phone, Twitter, Github } from "lucide-react";
import ContactForm from "../components/ContactForm.jsx";

const contactItems = [
  { label: "Mobile", value: "+91 7275794027", icon: Phone },
  { label: "Email", value: "ayushsrivastavaup62@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "www.Linkedin.com/in/ayush-srivastava-3465753b2", icon: Linkedin },
  { label: "GitHub", value: "https://github.com/ayushsrivastavaup62", icon: Github },
  { label: "X", value: "www.x.com/I_am_AyushX", icon: Twitter },
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
                <div key={item.label} className="glass-card flex items-center gap-4 rounded-2xl p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyanGlow/10">
                    <Icon className="h-5 w-5 text-cyanGlow" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-stone-500">{item.label}</p>
                    <p className="truncate font-semibold text-stone-100">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
