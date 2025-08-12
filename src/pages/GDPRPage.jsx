import React, { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "principles", label: "Principles" },
  { id: "consent", label: "Consent & Transparency" },
  { id: "research", label: "Research Outreach" },
  { id: "cloud", label: "Cloud & Storage" },
  { id: "data", label: "Data We Collect" },
  { id: "use", label: "How We Use Data" },
  { id: "legal", label: "Legal Bases" },
  { id: "sharing", label: "Sharing & Processors" },
  { id: "cookies", label: "Cookies" },
  { id: "intl", label: "International Transfers" },
  { id: "retention", label: "Retention" },
  { id: "rights", label: "Your Rights" },
  { id: "security", label: "Security" },
  { id: "contact", label: "Contact" },
];

export default function GDPRPage() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    // Smooth scroll if not globally enabled
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
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
   <section className="relative isolate align-center overflow-hidden">
    <div className="relative mx-auto max-w-6xl px-1 py-1 sm:py-20">
        <h1 className="text-4xl font-semibold leading-tight text-blue-600 sm:text-5xl">
        GDPR Compliance
        </h1>
    </div>
    
    </section>




      {/* Content grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="-mt-10 md:pt-8">
          <nav className="sticky top-28 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sections</p>
              <a
                href="#contact"
                className="rounded-md bg-slate-900 px-2 py-1 text-xs text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Contact
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
            <Section id="overview" title="Overview">
              We process personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable local laws. Since methods of data collection, storage, processing, and analysis have evolved, we follow stricter standards to protect individuals’ privacy and be transparent about our practices.
            </Section>
          </Card>

          <Card>
            <Section id="principles" title="Key principles we follow">
              <ul className="list-disc pl-5 space-y-1">
                <li>Purpose limitation: specific, explicit, and legitimate purposes only.</li>
                <li>Data minimization: only what is necessary.</li>
                <li>Accuracy: keep data accurate and up to date where required.</li>
                <li>Storage limitation: retain only as long as necessary.</li>
                <li>Integrity and confidentiality: appropriate technical and organizational measures.</li>
                <li>Accountability: document processing and demonstrate compliance.</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="consent" title="Consent and transparency">
              <ul className="list-disc pl-5 space-y-1">
                <li>We obtain clear, informed consent when required (marketing, optional analytics, certain research).</li>
                <li>Cookie use is disclosed via a banner/pop‑up with options to accept, reject, or manage categories.</li>
                <li>When collecting data directly, we explain purpose, storage, retention where applicable, and any sharing with third parties.</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="research" title="When contacting people for research">
              <ul className="list-disc pl-5 space-y-1">
                <li>We ensure the audience has opted in or can lawfully be contacted.</li>
                <li>We rely on a valid legal basis (consent, contract, legitimate interests, legal obligation).</li>
                <li>Data is used solely for the stated research purpose.</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="cloud" title="Cloud and storage">
              We may store research responses and operational data in databases or trusted cloud providers under data processing agreements. We ensure access controls, encryption in transit (and at rest where applicable), backups with rolling purges, vendor due diligence, and clear responsibility allocation between us and processors.
            </Section>
          </Card>

          <Card>
            <Section id="data" title="Data we collect">
              <ul className="list-disc pl-5 space-y-1">
                <li>Account data: name, email, role, password hash.</li>
                <li>Preferences/profile: language, communication preferences.</li>
                <li>Usage/device: pages viewed, actions, IP, user agent, approximate location from IP.</li>
                <li>Cookies/tech: necessary, preferences, analytics (subject to consent).</li>
                <li>Research/surveys: voluntary responses; special categories only with explicit consent.</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="use" title="How we use data">
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide, operate, and improve services and research.</li>
                <li>Authenticate users, prevent fraud, and secure systems.</li>
                <li>Personalize content and remember preferences.</li>
                <li>Measure performance and analyze product usage.</li>
                <li>Communicate service updates and, where permitted, marketing.</li>
                <li>Comply with legal obligations and enforce terms.</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="legal" title="Legal bases">
              <ul className="list-disc pl-5 space-y-1">
                <li>Contract</li>
                <li>Consent</li>
                <li>Legitimate interests</li>
                <li>Legal obligation</li>
                <li>Vital interests/public task (where applicable)</li>
              </ul>
            </Section>
          </Card>

          <Card>
            <Section id="sharing" title="Sharing and processors">
              We share data with vetted service providers acting as processors (hosting, analytics, email, customer support) under written contracts with confidentiality, security, and GDPR-compliant processing terms. We may disclose data to comply with law or protect rights, safety, or property.
            </Section>
          </Card>

          <Card>
            <Section id="cookies" title="Cookies">
              We use strictly necessary cookies to operate the site and optional analytics cookies subject to consent. Visitors can accept, reject, or manage categories via the cookie banner or settings.
            </Section>
          </Card>

          <Card>
            <Section id="intl" title="International transfers">
              If data is transferred outside the EEA/UK, we use appropriate safeguards such as the European Commission’s Standard Contractual Clauses and supplementary measures where needed.
            </Section>
          </Card>

          <Card>
            <Section id="retention" title="Retention">
              We keep personal data only as long as necessary for the purposes described or as required by law. Backups are purged on a rolling basis, and data is deleted or anonymized at the end of retention periods.
            </Section>
          </Card>

          <Card>
            <Section id="rights" title="Your rights (EU/EEA)">
              Subject to conditions and exemptions, individuals may request access, rectification, erasure, restriction, objection, portability, withdraw consent at any time without affecting prior processing, and lodge a complaint with a supervisory authority.
            </Section>
          </Card>

          <Card>
            <Section id="security" title="Security">
              We implement layered security: encryption in transit, hardened infrastructure, role‑based access, monitoring, least‑privilege practices, and incident response procedures including notification where required.
            </Section>
          </Card>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-600">Last updated: 10 Aug 2025</p>
              <div className="flex gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Back
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>

          <Card>
            <Section id="contact" title="Contact">
              To ask questions or exercise your rights, contact: privacy@vmhgroup.example. Postal: VMH GROUP, 123 Market Street, City, Country.
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
