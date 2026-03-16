export default function Footer() {
  return (
    <footer className="relative pb-10 pt-20">
      {/* Big Brand Name — full-width like Videaste */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Top: Logo + nav */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <span className="text-2xl font-black tracking-tighter text-text">
            b<span className="text-primary">.</span>
          </span>
          <div className="flex flex-wrap items-center gap-6">
            {[
              { href: "#hero", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#projects", label: "Portfolio" },
              { href: "#guestbook", label: "Guestbook" },
              { href: "mailto:royazizbarera@gmail.com", label: "Contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Giant Name */}
        <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter lowercase leading-[0.85] text-text/[0.06] select-none overflow-hidden">
          roy barera
        </h2>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-text/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-light">
            © {new Date().getFullYear()} Roy Aziz Barera. Built with passion.
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/broyrera", label: "GitHub" },
              {
                href: "https://linkedin.com/in/royazizbarera",
                label: "LinkedIn",
              },
              { href: "https://wa.me/6285871761909", label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted hover:text-text transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
