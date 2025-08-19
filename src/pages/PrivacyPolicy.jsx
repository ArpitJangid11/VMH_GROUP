// src/pages/PrivacyPolicy.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState("overview");
  const containerRef = useRef(null);

  const sections = [
    { id: "overview", label: t("privacy.toc.overview") },
    { id: "org-info", label: t("privacy.toc.orgInfo") },
    { id: "anonymous-access", label: t("privacy.toc.anonymousAccess") },
    { id: "services-links", label: t("privacy.toc.servicesLinks") },
    { id: "auto-collection", label: t("privacy.toc.autoCollection") },
    { id: "data-purpose", label: t("privacy.toc.dataPurpose") },
    { id: "cookies", label: t("privacy.toc.cookies") },
    { id: "children", label: t("privacy.toc.children") },
    { id: "disclosure", label: t("privacy.toc.disclosure") },
    { id: "ads", label: t("privacy.toc.ads") },
    { id: "security", label: t("privacy.toc.security") },
    { id: "rights", label: t("privacy.toc.rights") },
    { id: "intl-transfers", label: t("privacy.toc.intlTransfers") },
    { id: "compliance", label: t("privacy.toc.compliance") },
    { id: "ccpa", label: t("privacy.toc.ccpa") },
    { id: "support", label: t("privacy.toc.support") }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 0.5] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const copyAnchor = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).catch(() => {});
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <header
        className="relative h-64 sm:h-56 md:h-72 lg:h-80 bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://vmhgroup.com/assets/images/privacy-bg.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-blue-900/70 backdrop-blur-[1px]"></div>
        <div className="relative text-center px-4">
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow">
            {t("privacy.hero.title")}
          </h1>
          <nav className="mt-2 text-xs sm:text-sm text-blue-100/90">
            <a
              href="/"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            >
              {t("privacy.hero.breadcrumbHome")}
            </a>
            <span className="mx-1">-</span>
            <span className="opacity-90">{t("privacy.hero.breadcrumbHere")}</span>
          </nav>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
      </header>

      <main
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
          <aside className="lg:block hidden">
            <div className="sticky top-24">
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 backdrop-blur p-4">
                <h2 className="text-sm font-semibold text-slate-700 mb-3">
                  {t("privacy.toc.title")}
                </h2>
                <nav className="space-y-1 max-h-[70vh] overflow-auto pr-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`block text-sm rounded px-2 py-1 transition-colors ${
                        activeId === s.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <article className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 -mt-2 lg:mt-0">
              {t("privacy.intro")}
            </p>

            <Section
              id="overview"
              title={t("privacy.sections.overview.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.overview.p1")}</p>
            </Section>

            <Section
              id="org-info"
              title={t("privacy.sections.orgInfo.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.orgInfo.p1")}</p>
              <p>{t("privacy.sections.orgInfo.p2")}</p>
              <address className="not-italic bg-slate-50 rounded-lg p-4 border border-slate-200">
                {t("privacy.sections.orgInfo.address.line1")}
                <br />
                {t("privacy.sections.orgInfo.address.line2")}
                <br />
                {t("privacy.sections.orgInfo.address.line3")}
              </address>
              <p>
                {t("privacy.sections.orgInfo.contact")}{" "}
                <a href="mailto:info@vmhgroupsmr.com">info@vmhgroupsmr.com</a>
              </p>
            </Section>

            <Section
              id="anonymous-access"
              title={t("privacy.sections.anonymousAccess.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.anonymousAccess.p1")}</p>
            </Section>

            <Section
              id="services-links"
              title={t("privacy.sections.servicesLinks.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.servicesLinks.p1")}</p>
            </Section>

            <Section
              id="auto-collection"
              title={t("privacy.sections.autoCollection.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.autoCollection.p1")}</p>
            </Section>

            <Section
              id="data-purpose"
              title={t("privacy.sections.dataPurpose.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.dataPurpose.p1")}</p>
              <p>{t("privacy.sections.dataPurpose.p2")}</p>
              <ul>
                <li>{t("privacy.sections.dataPurpose.list1")}</li>
                <li>{t("privacy.sections.dataPurpose.list2")}</li>
                <li>{t("privacy.sections.dataPurpose.list3")}</li>
                <li>{t("privacy.sections.dataPurpose.list4")}</li>
              </ul>
              <p>{t("privacy.sections.dataPurpose.p3")}</p>
              <p>{t("privacy.sections.dataPurpose.p4")}</p>
              <p>{t("privacy.sections.dataPurpose.p5")}</p>
            </Section>

            <Section
              id="cookies"
              title={t("privacy.sections.cookies.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.cookies.p1")}</p>
            </Section>

            <Section
              id="children"
              title={t("privacy.sections.children.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.children.p1")}</p>
            </Section>

            <Section
              id="disclosure"
              title={t("privacy.sections.disclosure.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.disclosure.p1")}</p>
            </Section>

            <Section
              id="ads"
              title={t("privacy.sections.ads.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.ads.p1")}</p>
              <p>{t("privacy.sections.ads.p2")}</p>
            </Section>

            <Section
              id="security"
              title={t("privacy.sections.security.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.security.p1")}</p>
              <p>{t("privacy.sections.security.p2")}</p>
              <p>{t("privacy.sections.security.p3")}</p>
              <p>{t("privacy.sections.security.p4")}</p>
            </Section>

            <Section
              id="rights"
              title={t("privacy.sections.rights.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.rights.p1")}</p>
              <p>{t("privacy.sections.rights.p2")}</p>
              <ul>
                <li>{t("privacy.sections.rights.r1")}</li>
                <li>{t("privacy.sections.rights.r2")}</li>
                <li>{t("privacy.sections.rights.r3")}</li>
                <li>{t("privacy.sections.rights.r4")}</li>
                <li>{t("privacy.sections.rights.r5")}</li>
                <li>{t("privacy.sections.rights.r6")}</li>
                <li>{t("privacy.sections.rights.r7")}</li>
                <li>{t("privacy.sections.rights.r8")}</li>
              </ul>
              <p>{t("privacy.sections.rights.p3")}</p>
              <p>{t("privacy.sections.rights.p4")}</p>
              <p>{t("privacy.sections.rights.p5")}</p>
              <p>{t("privacy.sections.rights.p6")}</p>
              <ol>
                <li>{t("privacy.sections.rights.basis1")}</li>
                <li>{t("privacy.sections.rights.basis2")}</li>
              </ol>
              <p>{t("privacy.sections.rights.p7")}</p>
              <p>{t("privacy.sections.rights.p8")}</p>
              <p>{t("privacy.sections.rights.p9")}</p>
              <p>{t("privacy.sections.rights.p10")}</p>
            </Section>

            <Section
              id="intl-transfers"
              title={t("privacy.sections.intlTransfers.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.intlTransfers.p1")}</p>
              <p>{t("privacy.sections.intlTransfers.p2")}</p>
              <p>{t("privacy.sections.intlTransfers.p3")}</p>
            </Section>

            <Section
              id="compliance"
              title={t("privacy.sections.compliance.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.compliance.p1")}</p>
              <ul>
                <li>{t("privacy.sections.compliance.c1")}</li>
                <li>{t("privacy.sections.compliance.c2")}</li>
                <li>{t("privacy.sections.compliance.c3")}</li>
                <li>{t("privacy.sections.compliance.c4")}</li>
                <li>{t("privacy.sections.compliance.c5")}</li>
              </ul>
              <p>{t("privacy.sections.compliance.p2")}</p>
            </Section>

            <Section
              id="ccpa"
              title={t("privacy.sections.ccpa.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.ccpa.p1")}</p>
              <p>{t("privacy.sections.ccpa.p2")}</p>
              <p>{t("privacy.sections.ccpa.p3")}</p>
              <ol>
                <li>{t("privacy.sections.ccpa.sold1")}</li>
                <li>{t("privacy.sections.ccpa.sold2")}</li>
                <li>{t("privacy.sections.ccpa.sold3")}</li>
                <li>{t("privacy.sections.ccpa.sold4")}</li>
                <li>{t("privacy.sections.ccpa.sold5")}</li>
                <li>{t("privacy.sections.ccpa.sold6")}</li>
                <li>{t("privacy.sections.ccpa.sold7")}</li>
              </ol>
              <p>{t("privacy.sections.ccpa.p4")}</p>
              <ol>
                <li>{t("privacy.sections.ccpa.disclosed1")}</li>
                <li>{t("privacy.sections.ccpa.disclosed2")}</li>
                <li>{t("privacy.sections.ccpa.disclosed3")}</li>
                <li>{t("privacy.sections.ccpa.disclosed4")}</li>
                <li>{t("privacy.sections.ccpa.disclosed5")}</li>
                <li>{t("privacy.sections.ccpa.disclosed6")}</li>
                <li>{t("privacy.sections.ccpa.disclosed7")}</li>
              </ol>
              <p>{t("privacy.sections.ccpa.rightsIntro")}</p>
              <h3>{t("privacy.sections.ccpa.rightKnowTitle")}</h3>
              <p>{t("privacy.sections.ccpa.rightKnowP1")}</p>
              <p>{t("privacy.sections.ccpa.rightKnowP2")}</p>
              <p>{t("privacy.sections.ccpa.rightKnowP3")}</p>
              <h3>{t("privacy.sections.ccpa.optOutTitle")}</h3>
              <p>{t("privacy.sections.ccpa.optOutP")}</p>
              <h3>{t("privacy.sections.ccpa.nonDiscriminationTitle")}</h3>
              <p>{t("privacy.sections.ccpa.nonDiscriminationP")}</p>
              <p>
                <strong>{t("privacy.sections.ccpa.verificationTitle")}</strong>{" "}
                {t("privacy.sections.ccpa.verificationP")}
              </p>
            </Section>

            <Section
              id="support"
              title={t("privacy.sections.support.title")}
              copyAnchor={copyAnchor}
            >
              <p>{t("privacy.sections.support.p1")}</p>
              <address className="not-italic bg-slate-50 rounded-lg p-4 border border-slate-200">
                {t("privacy.sections.support.address.line1")}
                <br />
                {t("privacy.sections.support.address.line2")}
                <br />
                {t("privacy.sections.support.address.line3")}
                <br />
                {t("privacy.sections.support.address.line4")}{" "}
                <a href="mailto:info@vmhgroupsmr.com">info@vmhgroupsmr.com</a>
              </address>
            </Section>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 active:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                  <path fill="currentColor" d="M10 19l-7-7l7-7v4h8v6h-8v4z" />
                </svg>
                {t("privacy.backHome")}
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

function Section({ id, title, children, copyAnchor }) {
  return (
    <section id={id} className="scroll-mt-24 pt-6">
      <div className="flex items-start gap-2 group">
        <h2 className="!mt-0 text-slate-900">{title}</h2>
        <button
          aria-label="Copy link to section"
          onClick={() => copyAnchor(id)}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 transition mt-1 focus:opacity-100 focus:outline-none"
          title={title}
        >
          #
        </button>
      </div>
      <div className="mt-2 space-y-4">{children}</div>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8" />
    </section>
  );
}
