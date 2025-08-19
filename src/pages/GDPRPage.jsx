import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const rawSections = [
  { id: "overview", labelKey: "gdpr.toc.overview" },
  { id: "principles", labelKey: "gdpr.toc.principles" },
  { id: "consent", labelKey: "gdpr.toc.consent" },
  { id: "research", labelKey: "gdpr.toc.research" },
  { id: "cloud", labelKey: "gdpr.toc.cloud" },
  { id: "data", labelKey: "gdpr.toc.data" },
  { id: "use", labelKey: "gdpr.toc.use" },
  { id: "legal", labelKey: "gdpr.toc.legal" },
  { id: "sharing", labelKey: "gdpr.toc.sharing" },
  { id: "cookies", labelKey: "gdpr.toc.cookies" },
  { id: "intl", labelKey: "gdpr.toc.intl" },
  { id: "retention", labelKey: "gdpr.toc.retention" },
  { id: "rights", labelKey: "gdpr.toc.rights" },
  { id: "security", labelKey: "gdpr.toc.security" },
  { id: "contact", labelKey: "gdpr.toc.contact" }
];

export default function GDPRPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState("overview");

  const sections = rawSections.map(s => ({ id: s.id, label: t(s.labelKey) }));

  useEffect(() => {
    if (!document.documentElement.style.scrollBehavior) {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="relative isolate align-center overflow-hidden">
        <header
          className="relative h-64 sm:h-56 md:h-72 lg:h-80 bg-cover bg-center flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              "url('https://vmhgroup.com/assets/images/privacy-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-blue-900/70 backdrop-blur-[1px]"></div>
          <div className="relative text-center px-4">
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow">
              {t("gdpr.hero.title")}
            </h1>
            <nav className="mt-2 text-xs sm:text-sm text-blue-100/90">
              <a
                href="/"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              >
                {t("gdpr.hero.home")}
              </a>
              <span className="mx-1">-</span>
              <span className="opacity-90">{t("gdpr.hero.here")}</span>
            </nav>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
        </header>
      </section>

      {/* Content grid */}
      <div className="mx-auto grid mt-20 max-w-6xl grid-cols-1 md:mt-10 sm:mt-10 gap-8 px-6 pb-20 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="-mt-10  md:pt-8">
          <nav className="sticky top-28 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t("gdpr.sidebar.sections")}
              </p>
              <a
                href="#contact"
                className="rounded-md bg-slate-900 px-2 py-1 text-xs text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {t("gdpr.sidebar.contactCta")}
              </a>
            </div>
            <ul className="space-y-1.5">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main */}
        <article className="max-w-none pt-8">
          <Card>
            <Section id="overview" title={t("gdpr.sections.overview.title")}>
              {t("gdpr.sections.overview.body")}
            </Section>
          </Card>

          <Card>
            <Section id="principles" title={t("gdpr.sections.principles.title")}>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("gdpr.sections.principles.items.purpose")}</li>
                <li>{t("gdpr.sections.principles.items.minimization")}</li>
                <li>{t("gdpr.sections.principles.items.accuracy")}</li>
                <li>{t("gdpr.sections.principles.items.storage")}</li>
                <li>{t("gdpr.sections.principles.items.integrity")}</li>
                <li>{t("gdpr.sections.principles.items.accountability")}</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="consent" title={t("gdpr.sections.consent.title")}>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("gdpr.sections.consent.items.clearConsent")}</li>
                <li>{t("gdpr.sections.consent.items.cookieBanner")}</li>
                <li>{t("gdpr.sections.consent.items.collectionNotice")}</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="research" title={t("gdpr.sections.research.title")}>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("gdpr.sections.research.items.optInLawful")}</li>
                <li>{t("gdpr.sections.research.items.legalBasis")}</li>
                <li>{t("gdpr.sections.research.items.purposeLimitation")}</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="cloud" title={t("gdpr.sections.cloud.title")}>
              {t("gdpr.sections.cloud.body")}
            </Section>
          </Card>

          <Card>
            <Section id="data" title={t("gdpr.sections.data.title")}>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("gdpr.sections.data.items.account")}</li>
                <li>{t("gdpr.sections.data.items.preferences")}</li>
                <li>{t("gdpr.sections.data.items.usage")}</li>
                <li>{t("gdpr.sections.data.items.cookies")}</li>
                <li>{t("gdpr.sections.data.items.research")}</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="use" title={t("gdpr.sections.use.title")}>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("gdpr.sections.use.items.provide")}</li>
                <li>{t("gdpr.sections.use.items.authSecure")}</li>
                <li>{t("gdpr.sections.use.items.personalize")}</li>
                <li>{t("gdpr.sections.use.items.measure")}</li>
                <li>{t("gdpr.sections.use.items.communicate")}</li>
                <li>{t("gdpr.sections.use.items.comply")}</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="legal" title={t("gdpr.sections.legal.title")}>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("gdpr.sections.legal.items.contract")}</li>
                <li>{t("gdpr.sections.legal.items.consent")}</li>
                <li>{t("gdpr.sections.legal.items.legitInterests")}</li>
                <li>{t("gdpr.sections.legal.items.legalObligation")}</li>
                <li>{t("gdpr.sections.legal.items.vitalPublic")}</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="sharing" title={t("gdpr.sections.sharing.title")}>
              {t("gdpr.sections.sharing.body")}
            </Section>
          </Card>

          <Card>
            <Section id="cookies" title={t("gdpr.sections.cookies.title")}>
              {t("gdpr.sections.cookies.body")}
            </Section>
          </Card>

          <Card>
            <Section id="intl" title={t("gdpr.sections.intl.title")}>
              {t("gdpr.sections.intl.body")}
            </Section>
          </Card>

          <Card>
            <Section id="retention" title={t("gdpr.sections.retention.title")}>
              {t("gdpr.sections.retention.body")}
            </Section>
          </Card>

          <Card>
            <Section id="rights" title={t("gdpr.sections.rights.title")}>
              {t("gdpr.sections.rights.body")}
            </Section>
          </Card>

          <Card>
            <Section id="security" title={t("gdpr.sections.security.title")}>
              {t("gdpr.sections.security.body")}
            </Section>
          </Card>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-600">
                {t("gdpr.footer.updated")}
              </p>
              <div className="flex gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {t("gdpr.footer.back")}
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {t("gdpr.footer.home")}
                </a>
              </div>
            </div>
          </div>

          <Card>
            <Section id="contact" title={t("gdpr.sections.contact.title")}>
              {t("gdpr.sections.contact.body")}
            </Section>
          </Card>
        </article>
      </div>
    </main>
  );
}

function Card({ children }) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="relative">{children}</div>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-3 text-xl font-semibold text-slate-900">{title}</h2>
      <div className="prose prose-slate max-w-none leading-relaxed">{children}</div>
      <hr className="my-8 border-slate-200" />
    </section>
  );
}
