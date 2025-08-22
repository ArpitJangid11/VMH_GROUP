import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import VmhLogo from '/images/vmh-logo.png'; 
import { Link } from "react-router-dom";
import ProfessionalHouseholdModal from "./ProfessionalHouseholdModal";
import { useState } from "react";



export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showModal, setShowModal] = useState(false);
  const handleCardClick = () => {
    
      setShowModal(true);
      
  };
  return (
    <footer className="relative bg-blue-600 text-white">
      {/* Top gradient glow */}
      {showModal && (
              <ProfessionalHouseholdModal onClose={() => setShowModal(false)} />
            )}
      <div className="absolute inset-x-0 py-2 -top-6 h-6 bg-gradient-to-b from-blue-400/20 to-transparent pointer-events-none" />
      
      <div >
        <div className="mx-auto max-w-7xl px-6 pt-14">
          <div className="grid gap-10 md:grid-cols-3">
            
            {/* Brand Section */}
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center gap-3">
                
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <Link to="/">
                    <img 
                        src={VmhLogo} // Your imported logo
                        alt="VMH Group Logo" 
                        className="h-10 w-auto group-hover:scale-110 transition-transform duration-300"
                      />
                </Link>
                  </div>
                <div onClick={() => handleCardClick()}>
                  <h3 className="text-lg font-semibold">VMH Global Insights</h3>
                  <p className="text-sm text-white/70">Turning Opinions Into Decisions</p>
                </div>
              </div>

              {/* Social Icons - Simple hover effects */}
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  aria-label="Facebook"
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-blue-500 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a 
                  href="#" 
                  aria-label="X"
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaXTwitter className="text-sm" />
                </a>
                <a 
                  href="https://in.linkedin.com/company/vmh-groups" 
                  target="_blank"
                  aria-label="LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-blue-900 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a 
                  href="#" 
                  target="_blank"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-pink-500 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <FaInstagram className="text-sm" />
                </a>
              </div>
            </div>

            {/* Quick Links - Simple hover motion */}
            <nav className="space-y-3">
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "GDPR Compliance", href: "/gdpr" }, 
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faqs" }
              ].map((item, index) => (
                <div key={item.label} style={{ animation: `fadeUp 0.5s ease-out ${0.08 * index}s both` }}>
                  <Link 
                    to={item.href}
                    className="block text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Contact Us - Simple right-side motion */}
            <div className="space-y-3" style={{ animation: "fadeUp 0.5s ease-out 0.2s both" }}>
              <h4 className="text-xl font-semibold">Contact Us</h4>
              
              {/* Address */}
              <div className="flex gap-2 text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1 cursor-pointer">
                <MdLocationOn className="text-blue-300 mt-0.5 shrink-0" />
                <span>
                  5 Penn Plaza, 14th floor<br />
                  New York - NY 10001 (US)
                </span>
              </div>

              {/* Phone */}
               <div className="flex gap-2 text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1 cursor-pointer">
                <MdLocationOn className="text-blue-300 mt-0.5 shrink-0" />
                <span>USA | UK | INDIA </span>
                {/* <span>UK Office<br /></span>
                <span>India Office</span> */}
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-200 hover:translate-x-1">
                <MdEmail className="text-blue-300" />
                <a href="mailto:info@vmhgroupsmr.com" className="hover:underline break-all">
                  info@vmhgroupsmr.com
                </a>
              </div>
            </div>

          </div>
        </div>
        {/* Copyright Section */}
        <div className="mt-10 border-t border-white/40  bg-white/20 pb-8 pt-6 text-center">
          <h3 className="text-md text-white">
            © {currentYear} VMH GLOBAL INSIGHTS. All Rights Reserved
          </h3>
        </div>
      </div>

      {/* Back to Top Button - Simple hover motion */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 h-11 w-11 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all duration-200"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}
