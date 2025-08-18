import React, { useEffect, useRef, useState } from 'react';
import { IconContext } from "react-icons";
import {
  FaUserCheck,
  FaDollarSign,
  FaLock,
  FaBolt,
  FaComments,
  FaSlidersH,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaExpand,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";  // ✅ i18n hook

export default function WhyChooseUs() {
  const { t } = useTranslation();   // ✅ Fetch translations
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const features = [
    { icon: FaUserCheck, title: t("whyChooseUs.title1"), desc: t("whyChooseUs.desc1") },
    { icon: FaDollarSign, title: t("whyChooseUs.title2"), desc: t("whyChooseUs.desc2") },
    { icon: FaLock, title: t("whyChooseUs.title3"), desc: t("whyChooseUs.desc3") },
    { icon: FaBolt, title: t("whyChooseUs.title4"), desc: t("whyChooseUs.desc4") },
    { icon: FaComments, title: t("whyChooseUs.title5"), desc: t("whyChooseUs.desc5") },
    { icon: FaSlidersH, title: t("whyChooseUs.title6"), desc: t("whyChooseUs.desc6") },
  ];

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes slideInUp { from {opacity: 0; transform: translateY(50px) scale(0.95);} 
                              to {opacity: 1; transform: translateY(0) scale(1);} }
      @keyframes slideLeftRight {
        0% {transform: translateX(-100%); opacity: 0;}
        15% {opacity: 1;} 85% {opacity: 1;}
        100% {transform: translateX(100%); opacity: 0;}
      }
      .animate-slide-in { animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .why-content { opacity: 0; transform: translateY(50px) scale(0.95); }
      .animated-underline { position: relative; overflow: hidden; background: rgba(37, 99, 235, 0.2); }
      .animated-underline::before {
        content: ''; position: absolute; top: 0; left: 0; width: 40%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(37,99,235,0.8), rgba(37,99,235,1), rgba(37,99,235,0.8), transparent);
        animation: slideLeftRight 2.5s ease-in-out infinite; border-radius: inherit;
      }
      .feature-icon-glow { position: relative; overflow: hidden; }
      .feature-icon-glow::before {
        content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0;
        background: radial-gradient(circle, rgba(37,99,235,0.3), transparent 70%);
        border-radius: 50%; transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
        transform: translate(-50%, -50%); z-index: 0;
      }
      .feature-icon-glow:hover::before { width: 100px; height: 100px; }
    `;
    document.head.appendChild(styleSheet);

    const elements = document.querySelectorAll('.why-content');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('animate-slide-in'), index * 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (document.head.contains(styleSheet)) document.head.removeChild(styleSheet);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const goFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
    else if (videoRef.current.webkitRequestFullscreen) videoRef.current.webkitRequestFullscreen();
    else if (videoRef.current.msRequestFullscreen) videoRef.current.msRequestFullscreen();
  };

  return (
    <section id="why-choose" aria-labelledby="why-title" className="relative bg-gradient-to-b from-white to-blue-50/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

        {/* Header */}
        <header className="why-content text-center mb-12">
          <h2 id="why-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-4 hover:scale-105 hover:text-blue-600 transition-all">
            {t("whyChooseUs.heading")}
          </h2>
          <div className="mt-6 flex items-center justify-center group">
            <span className="h-1 w-24 rounded-full animated-underline group-hover:w-32 transition-all duration-500" />
          </div>
          <p className="mt-6 text-slate-700 text-lg hover:text-slate-900 hover:scale-[1.02] transition-all">
            {t("whyChooseUs.description")}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

          {/* Left - Video */}
          <div className="why-content">
            <div className="group relative rounded-2xl overflow-hidden ring-1 ring-gray-200 bg-gray-50 h-full shadow-lg hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/20 hover:ring-blue-300 transition-all flex items-center justify-center">
              <div className="w-full">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <div className="relative w-full h-full max-h-[260px] sm:max-h-[320px] md:max-h-[380px] lg:max-h-[420px]">
                    <video
                      ref={videoRef}
                      src="/videos/login-bg.mp4"
                      autoPlay muted loop playsInline
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Video Controls */}
                  <IconContext.Provider value={{ className: "h-5 w-5" }}>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-20">
                      <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        className="inline-flex items-center justify-center rounded-full bg-blue-600/90 hover:bg-blue-700 text-white h-10 w-10 shadow-lg">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      <button onClick={goFullscreen} aria-label="Enter fullscreen"
                         className="inline-flex items-center justify-center rounded-full bg-gray-900/90 hover:bg-black text-white h-10 w-10 shadow-lg">
                        <FaExpand />
                      </button>
                    </div>
                  </IconContext.Provider>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Feature list */}
          <div className="why-content flex flex-col h-full">
            <div className="relative">
              <ul className="space-y-6 flex-1">
                <IconContext.Provider value={{ className: "h-6 w-6 text-blue-600 relative z-10" }}>
                  {features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <li key={f.title} className="group flex items-start gap-4 rounded-xl p-3 -m-3 hover:bg-blue-50/80 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all">
                        <span className="feature-icon-glow inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 group-hover:bg-blue-100 group-hover:ring-blue-200 group-hover:scale-110 transition-all">
                          <Icon className="group-hover:scale-110 transition-all" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {f.title}
                          </h3>
                          <p className="mt-1 text-slate-600 group-hover:text-slate-700">{f.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </IconContext.Provider>
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Link to="why-choose-us">
                <button type="button"
                        className="group inline-flex items-center gap-2 rounded-xl px-6 py-4 text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-110 hover:-translate-y-2 transition-all">
                  <span className="group-hover:translate-x-1 transition-transform">
                    {t("whyChooseUs.readMore")}
                  </span>
                  <FaArrowRight className="group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
