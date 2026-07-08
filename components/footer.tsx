import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#07201C] border-t border-white/10">
      {/* Top section */}
      <div className="flex flex-col lg:flex-row justify-between items-start py-16 px-8 gap-12 max-w-7xl mx-auto">
        {/* Left: logo + CTA buttons */}
        <div className="flex flex-col gap-6 flex-shrink-0">
          <Link href="/" className="flex shrink-0 items-center">
            {/* white logo variant on the dark footer surface — no CSS filter
                hacks; fixed height + auto width + shrink-0 keeps proportions */}
            <img
              src="/logo-white.svg"
              alt="SOVITECH Control"
              width={200}
              height={50}
              className="h-9 w-auto shrink-0 select-none"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#07201C] text-sm font-medium px-5 py-2.5 rounded-[1px] hover:bg-[#C8E6C9] transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              className="text-white/50 text-sm border border-white/15 px-4 py-2.5 rounded-[1px] hover:text-white hover:border-white/40 transition-colors duration-300"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Right: link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto">
          {/* Services */}
          <div>
            <h3 className="text-[#C8E6C9]/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/servicii#proiectare" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  BMS Design
                </Link>
              </li>
              <li>
                <Link href="/servicii#executie" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  System Installation
                </Link>
              </li>
              <li>
                <Link href="/servicii#integrare" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Systems Integration
                </Link>
              </li>
              <li>
                <Link href="/servicii#mentenanta" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  BMS Maintenance
                </Link>
              </li>
              <li>
                <Link href="/servicii#consultanta" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Consultancy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[#C8E6C9]/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/resurse/referinte" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Projects & References
                </Link>
              </li>
              <li>
                <Link href="/ghid-bms" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Free BMS Guide
                </Link>
              </li>
              <li>
                <Link href="/resurse/raport-piata" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  BMS Market Report
                </Link>
              </li>
              <li>
                <Link href="/produse" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  SAUTER Products
                </Link>
              </li>
              <li>
                <Link href="/calculator-roi" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Calculator ROI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#C8E6C9]/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/servicii" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sectoare" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Sectors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* By SOVITECH */}
          <div>
            <h3 className="text-[#C8E6C9]/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">By SOVITECH</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 px-8 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-xs">
          Terms · Privacy · Cookie Settings · &copy; {new Date().getFullYear()} SOVITECH Control
        </p>
        <div className="flex items-center gap-4">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-150"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* X / Twitter */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-150"
            aria-label="X"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
