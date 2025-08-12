// src/pages/PrivacyPolicy.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const sections = [
  { id: "overview", label: "1. Overview" },
  { id: "org-info", label: "2. Organization Information" },
  { id: "anonymous-access", label: "3. Anonymous Access" },
  { id: "services-links", label: "4. Services and Links" },
  { id: "auto-collection", label: "5. Automatic Data Collection" },
  { id: "data-purpose", label: "6. Data Collection and Purpose" },
  { id: "cookies", label: "7. Sharing and Cookies" },
  { id: "children", label: "8. Children's Privacy" },
  { id: "disclosure", label: "9. Disclosure" },
  { id: "ads", label: "10. Third Party Advertisements" },
  { id: "security", label: "11. Confidentiality and Security" },
  { id: "rights", label: "12. Your Rights" },
  { id: "intl-transfers", label: "13. International Data Transfers" },
  { id: "compliance", label: "14. Privacy Compliance" },
  { id: "ccpa", label: "15. Notice to California Residents (CCPA)" },
  { id: "support", label: "16. Privacy Support" },
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const containerRef = useRef(null);

  const readingTime = useMemo(() => {
    const minutes = 12; // rough estimate
    return `${minutes} min read`;
  }, []);

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
  }, []);

  const copyAnchor = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).catch(() => {});
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Hero */}
      <header
        className="relative h-64 sm:h-56 md:h-72 lg:h-80 bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://vmhgroup.com/assets/images/privacy-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-blue-900/70 backdrop-blur-[1px]"></div>
        <div className="relative text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 rounded-full px-3 py-1 text-xs sm:text-sm backdrop-blur ring-1 ring-white/20">
            <span className="opacity-90">Last updated: May 10, 2022</span>
            <span className="opacity-50">-</span>
            <span className="opacity-90">{readingTime}</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow">
            Privacy Policy
          </h1>
          <nav className="mt-2 text-xs sm:text-sm text-blue-100/90">
            <a
              href="/"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            >
              Home
            </a>
            <span className="mx-1">-</span>
            <span className="opacity-90">Privacy Policy</span>
          </nav>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
      </header>

      {/* Main */}
      <main
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
          {/* Sticky TOC */}
          <aside className="lg:block hidden">
            <div className="sticky top-24">
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 backdrop-blur p-4">
                <h2 className="text-sm font-semibold text-slate-700 mb-3">
                  On this page
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

          {/* Content */}
          <article className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 -mt-2 lg:mt-0">
              This policy explains how VMH Group Market Research handles your data across our
              websites and apps.
            </p>

            <Section id="overview" title="1. Overview" copyAnchor={copyAnchor}>
              <p>
                This document establishes the privacy policies of VMH Group Market Research, its
                websites and mobile applications, as well as its compliance with specific
                national and international jurisdictions (including the privacy regulations
                and laws thereof). The publication of this document rescinds all previous
                privacy policies – implied, spoken or written –
              </p>
            </Section>

            <Section
              id="org-info"
              title="2. Organization Information"
              copyAnchor={copyAnchor}
            >
              <p>
                Modern information and communication technologies play a fundamental role in
                the activities of VMH Group Market Research.
              </p>
              <p>
                VMH Group Market Research is based in United States and at the following postal
                address:
              </p>
              <address className="not-italic bg-slate-50 rounded-lg p-4 border border-slate-200">
                110, Houston St San Antonio,
                <br />
                TX 78205,
                <br />
                United States
              </address>
              <p>
                VMH Group Market Research can be reached via e-mail at{" "}
                <a href="mailto:support@vmhgroup.com">
                  support@vmhgroup.com
                </a>
              </p>
            </Section>

            <Section
              id="anonymous-access"
              title="3. Anonymous Access"
              copyAnchor={copyAnchor}
            >
              <p>
                Visitors can access the website/application home pages and browse
                sites/applications without disclosing personal data.
              </p>
            </Section>

            <Section
              id="services-links"
              title="4. Services and Links"
              copyAnchor={copyAnchor}
            >
              <p>
                VMH Group Market Research websites allow communication with other visitors and post
                information that can be accessed by other visitors. Communication via these
                posts is voluntary. All information communicated is the responsibility and
                discretion of the individual and may be collected by other visitors. The
                Rewards Nation sites may include links to third-party web/mobile service
                providers. VMH Group Market Research is not responsible for the content, accuracy,
                or privacy policies of third-party web/mobile services
              </p>
            </Section>

            <Section
              id="auto-collection"
              title="5. Automatic Data Collection"
              copyAnchor={copyAnchor}
            >
              <p>
                VMH Group Market Research may collect information from your computer, mobile phone
                or other access device. The information sent to us includes, but is not
                limited to, data on the pages you access, your computer IP address, referral
                data, device identifiers, the type of operating system you’re using, your
                location (GPS), mobile network information, standard web log data and other
                information. Web log data includes the browser type you’re using and traffic
                to and from our site to determine trends, administer the site, track user
                movement in the aggregate, and gather broad demographic information for
                aggregate use. Automated decision-making is used to determine the
                likelihood of fraudulent activity to include duplication of respondent(s)
                and proxy usage. Automatically collected data may be sent to 3rd party data
                processors for the purpose of fraud prevention.
              </p>
            </Section>

            <Section
              id="data-purpose"
              title="6. Data Collection and Purpose"
              copyAnchor={copyAnchor}
            >
              <p>
                We may use the personal data supplied or provided by you to send you emails
                notifications containing invitations for participation in promotions,
                including, but not limited to, offers and market research survey
                opportunities offered by our clients and/or partners. Your participation in
                these opportunities is completely voluntary and you can opt-out at any time
                of promotional emails, VMH Group Market Research employs a strict email policy
                against sending unsolicited emails. You may opt out by changing your email
                settings in the Edit Account/Edit Preferences section. Please note that
                opting out from promotional emails does not exempt you from receiving
                administrative emails about your account status and membership status
                changes, Privacy Policy and Terms & Conditions updates.
              </p>

              <p>
                Additionally, we may share personal data and social-demographic information
                we collect from you with Third Party Market Research Companies for the
                purpose of:
              </p>

              <ul>
                <li>Facilitating your participation in a survey(s); and</li>
                <li>
                  Disclosing such data elements to clients of the Third Party Market Research
                  Companies for audience measurement services; and
                </li>
                <li>
                  Appending such data elements to completed client surveys and delivering
                  the appended survey data to clients of the Third Party Market Research
                  Companies for analytical or research purposes; and
                </li>
                <li>Other uses as set forth in their privacy policy.</li>
              </ul>

              <p>
                We may also share personal data and social-demographic information with
                partners for several purposes, including, without limitation, fraud
                detection and prevention, copyright infringement, data validation, incentive
                or reward fulfilment (if applicable), identifying respondents for re-contact
                surveys, or communications, database matching, data append, coding, data
                segmentation, and/or developing data insights regarding survey participants,
                but not for marketing purposes.
              </p>

              <p>
                If you are eligible for a client survey opportunity offered through a client,
                the client will not contact you directly but will provide your unique
                identification number and a survey link to us and we will allow you to
                participate in the specific client survey. In connection with the sharing of
                your information with a client, your information may be transferred and
                stored outside of your country of residence, including, without limitation,
                in the United States, and by agreeing to this privacy policy you are agreeing
                to the processing and exportation of your personal information as set forth
                in this Section. If you have any questions about this data sharing please
                send in a support ticket through our support system. Access to collected
                personal data is available upon request by sending in a support ticket
                through our support system. You can opt-out by selecting the privacy
                category on our support page and submitting your request. If you opt-out,
                it is the responsibility of us to inform the specific Third Party Market
                Research Companies. Please note that VMH Group Market Research is solely liable and
                responsible for managing all opt-out requests.
              </p>

              <p>
                We reserve the right to share your identity with others within the
                stipulations of data protection in an attempt to prevent further fraudulent
                activity. We may also obtain information about you from third parties such
                as identity verification services.
              </p>
            </Section>

            <Section id="cookies" title="7. Sharing and Cookies" copyAnchor={copyAnchor}>
              <p>
                VMH Group Market Research uses cookies and similar technologies to recognize you
                when you visit our websites. Our cookie policy explains what these
                technologies are and why we use them, as well as your rights to control our
                use of them. Read our cookie policy.
              </p>
            </Section>

            <Section id="children" title="8. Children's Privacy" copyAnchor={copyAnchor}>
              <p>
                VMH Group Market Research does not knowingly collect personal data from
                individuals under the age of 16 in the EU and 13 outside of the EU. Minors
                16 to 18 in the EU and 13 to 18 outside the EU are permitted to access the
                services of the site only with parental permission. It is the responsibility
                of the individual and the parent to ensure such permissions are obtained. It
                is possible that by fraud or deception we may receive information given to
                us or pertaining to children under 16 in the EU and 13 outside the EU. If we
                are notified of this and as soon as we verify the information, we will
                immediately delete the information from our servers.
              </p>
            </Section>

            <Section id="disclosure" title="9. Disclosure" copyAnchor={copyAnchor}>
              <p>
                Except as set forth herein, VMH Group Market Research does not disclose personal
                data to subsidiaries or other organizations without your permission or where
                it can reasonably be inferred from the circumstances that you consent to the
                disclosure to the third parties. VMH Group Market Research tries to limit the
                information it provides to third parties to the information they need to
                help VMH Group Market Research provide goods and services to you.
              </p>
            </Section>

            <Section
              id="ads"
              title="10. Third Party Advertisements"
              copyAnchor={copyAnchor}
            >
              <p>
                VMH Group Market Research websites and emails contain links to various other sites
                that are not owned by us. While VMH Group Market Research makes every effort to
                ensure that our advertisers post clear and complete Privacy Policies and
                observe appropriate data practices, each of these sites/applications has a
                privacy policy that may differ from that of VMH Group Market Research. The privacy
                practices of other websites/applications and companies are not covered by
                this policy. Please be aware that we are not responsible for the privacy
                practices of such other sites/applications. We encourage you to be aware
                when you leave our site/application and to read the privacy statements of
                each and every website that collect personally identifiable information.
              </p>

              <p>
                VMH Group Market Research may share non-personally identifiable information
                collected via the service in aggregate, anonymous form with advertisers or
                other third parties so that they may better evaluate what products and
                services are most appealing to different segments of the user base. The
                Rewards Nation does not disclose your first name/last name, address, email
                address or any other Personal Information to these third parties unless you
                give your express consent.
              </p>
            </Section>

            <Section
              id="security"
              title="11. Confidentiality and Security"
              copyAnchor={copyAnchor}
            >
              <p>
                VMH Group Market Research does not employ the use of secure transmission methods to
                send personal data.
              </p>
              <p>
                VMH Group Market Research has implemented security policies, rules and technical
                measures to protect the personal data from unauthorized access, improper use
                or disclosure, unauthorized modification and unlawful destruction or
                accidental loss.
              </p>
              <p>
                VMH Group Market Research employees and data processors with access or association
                to the processing of personal data are obliged to respect the confidentiality
                of visitor personal data.
              </p>
              <p>
                VMH Group Market Research does not disclose personal data to State institutions and
                authorities unless required by law.
              </p>
            </Section>

            <Section id="rights" title="12. Your Rights" copyAnchor={copyAnchor}>
              <p>
                <strong>12.1</strong> We have summarized the rights that you have under GDPR
                for EU data subjects. Some of the rights are complex, and not all of the
                details have been included in our summaries. Accordingly, you should read
                the relevant laws and guidance from the regulatory authorities for a full
                explanation of these rights. Your data is not part of a statutory or
                contractual requirement, or a requirement necessary to enter into a
                contract.
              </p>

              <p>
                <strong>12.2</strong> Your principal rights under data protection law are:
              </p>
              <ul>
                <li>(a) the right to access;</li>
                <li>(b) the right to rectification;</li>
                <li>(c) the right to erasure;</li>
                <li>(d) the right to restrict processing;</li>
                <li>(e) the right to object to processing;</li>
                <li>(f) the right to data portability;</li>
                <li>(g) the right to complain to a supervisory authority; and</li>
                <li>(h) the right to withdraw consent.</li>
              </ul>

              <p>
                <strong>12.3</strong> You have the right to confirmation as to whether or not we
                process your personal data and, where we do, access to the personal data,
                together with certain additional information. That additional information
                includes details of the purposes of the processing, the categories of
                personal data concerned and the recipients of the personal data. Providing
                the rights and freedoms of others are not affected. You can access your
                personal data by visiting{" "}
                <a href="https://vmhgroup.com/login/">
                  https://vmhgroup.com/login/
                </a>
                .
              </p>

              <p>
                <strong>12.4</strong> You have the right to have any inaccurate personal data
                about you rectified and, taking into account the purposes of the processing,
                to have any incomplete personal data about you completed.
              </p>

              <p>
                <strong>12.5</strong> In some circumstances you have the right to the erasure
                of your personal data without undue delay. Those circumstances include: a)
                the personal data are no longer necessary in relation to the purposes for
                which they were collected or otherwise processed; b) you withdraw consent to
                consent-based processing; c) you object to the processing under certain
                rules of applicable data protection law; d) the processing is for direct
                marketing purposes; e) and the personal data have been unlawfully processed.
                However, there are exclusions of the right to erasure. The general
                exclusions include where processing is necessary: a) for the purpose of
                market research purposes you have participated in; b) for compliance with a
                legal obligation; c) for the purpose of fraud prevention; or d) for the
                establishment, exercise or defence of legal claims.
              </p>

              <p>
                <strong>12.6</strong> In some circumstances you have the right to restrict
                the processing of your personal data. Those circumstances are: you contest
                the accuracy of the personal data; processing is unlawful but you oppose
                erasure; we no longer need the personal data for the purposes of our
                processing, but you require personal data for the establishment, exercise or
                defence of legal claims; and you have objected to processing, pending the
                verification of that objection. Where processing has been restricted on this
                basis, we may continue to store your personal data. However, we will only
                otherwise process it: with your consent; for the establishment, exercise or
                defence of legal claims; for the protection of the rights of another natural
                or legal person; or for reasons of important public interest.
              </p>

              <p>
                <strong>12.7</strong> You have the right to object to our processing of your
                personal data on grounds relating to your particular situation, but only to
                the extent that the legal basis for the processing is that the processing is
                necessary for: the performance of a task carried out in the public interest
                or in the exercise of any official authority vested in us; or the purposes of
                the legitimate interests pursued by us or by a third party. If you make such
                an objection, we will cease to process the personal information unless we can
                demonstrate compelling legitimate grounds for the processing which override
                your interests, rights and freedoms, or the processing is for the
                establishment, exercise or defence of legal claims.
              </p>

              <p>
                <strong>12.8</strong> You have the right to object to our processing of your
                personal data for direct marketing purposes (including profiling for direct
                marketing purposes). If you make such an objection, we will cease to process
                your personal data for this purpose.
              </p>

              <p>
                <strong>12.9</strong> You have the right to object to our processing of your
                personal data for scientific or historical research purposes or statistical
                purposes on grounds relating to your particular situation, unless the
                processing is necessary for the performance of a task carried out for reasons
                of public interest.
              </p>

              <p>
                <strong>12.10</strong> To the extent that the legal basis for our processing
                of your personal data is:
              </p>
              <ol>
                <li>(a) consent; or</li>
                <li>
                  (b) that the processing is necessary for the performance of a contract to
                  which you are party or in order to take steps at your request prior to
                  entering into a contract, and such processing is carried out by automated
                  means, you have the right to receive your personal data from us in a
                  structured, commonly used and machine-readable format. However, this right
                  does not apply where it would adversely affect the rights and freedoms of
                  others.
                </li>
              </ol>

              <p>
                <strong>12.11</strong> If you consider that our processing of your personal
                information infringes data protection laws, you have a legal right to lodge a
                complaint with a supervisory authority responsible for data protection. You
                may do so in the EU member state of your habitual residence, your place of
                work or the place of the alleged infringement.
              </p>

              <p>
                <strong>12.12</strong> To the extent that the legal basis for our processing of
                your personal information is consent, you have the right to withdraw that
                consent at any time. Withdrawal will not affect the lawfulness of processing
                before the withdrawal.
              </p>

              <p>
                <strong>12.13</strong> You may exercise any of your rights in relation to your
                personal data by sending in a support ticket after being logged in.
              </p>

              <p>
                Visitors from areas other than the EU may request access to their own
                specific personal information collected by VMH Group Market Research by visiting the
                member account information section of the VMH Group Market Research website:{" "}
                <a href="https://vmhgroup.com/profile/">
                  https://vmhgroup.com/profile/
                </a>
              </p>

              <p>
                Access to personal information may require proof of identity. Access to
                personal data is provided without charge. Personal data may be challenged or
                updated and, where appropriate, data will be completed, erased, rectified or
                amended. VMH Group Market Research reserves the right to refuse access to personal
                data. In such a case, reasons will be given for refusal.
              </p>

              <p>
                You can close your account through our website. If you close your account,
                we will mark your account in our database as "Closed," but will keep your
                account information in our database. This is necessary to deter fraud or
                abuse of the site, by ensuring that persons who try to commit fraud or abuse
                of the site will not be able to avoid detection simply by closing their
                account and opening a new account. However, if you close your account, your
                personally-identifiable information will not be used by us for any further
                purposes, nor sold to or shared with third parties, except as necessary to
                prevent fraud and assist law enforcement or as required by law.
              </p>
            </Section>

            <Section
              id="intl-transfers"
              title="13. International Data Transfers"
              copyAnchor={copyAnchor}
            >
              <p>
                We operate internationally and may transfer information about you to any
                jurisdiction where we do business, including the United States. When you use
                our websites, you acknowledge that we may transfer information about you as
                described in this policy.
              </p>

              <p>
                We will transfer your personal information for any of the purposes identified
                in this policy to any of our subsidiaries, affiliates, service providers,
                and business partners that may be located outside of the jurisdiction where
                you are located. The laws in those jurisdictions may not provide the same
                level of data protection compared to the laws in your country. However, we
                will treat your personal information as subject to the protections described
                in this policy.
              </p>

              <p>
                When we transfer personal information subject to the General Data Protection
                Regulation to entities located outside of the European Economic Area ("EEA"),
                we will rely on an appropriate legal basis, such as appropriate safeguards,
                which could include the standard contractual clauses, binding corporate
                rules, the EU-US Privacy Shield program, or another framework deemed adequate
                by the European Commission, or as otherwise permitted by applicable law,
                such as pursuant to your consent or in order to perform our contractual
                agreements with you.
              </p>
            </Section>

            <Section
              id="compliance"
              title="14. Privacy Compliance"
              copyAnchor={copyAnchor}
            >
              <p>
                The VMH Group Market Research privacy policy is compliant with the following
                international and national regulations:
              </p>

              <ul>
                <li>
                  Global: OECD Privacy Guidelines on the Protection of Privacy and
                  Transborder Flows of Personal Data Guidelines
                </li>
                <li>
                  Global: United Nations Guidelines for the Regulation of Personal Data Files
                  Adopted by General Assembly Resolution 45/95 of 14 December 1990
                </li>
                <li>United States: Privacy Act of 1974</li>
                <li>
                  European Union: European Convention on Human Rights and General Data
                  Protection Regulation (GDPR)
                </li>
                <li>
                  Canada: Personal Information Protection and Electronic Documents Act
                </li>
              </ul>

              <p>Privacy compliance is ensured by periodic self-assessment.</p>
            </Section>

            <Section id="ccpa" title="15. Notice to California Residents (CCPA)" copyAnchor={copyAnchor}>
              <p>
                CCPA defines the term “sell” broadly. Its meaning includes “renting, releasing,
                disclosing, disseminating, making available, [and] transferring…for monetary
                or other valuable consideration.”
              </p>

              <p>
                Under this definition, and the CCPA’s broad definition of “personal information,”
                we may “sell personal information” about you to our vendors or other partners,
                such as your contact information or certain combinations of anonymized or
                pseudonymized demographic and other information.
              </p>

              <p>Categories of information we’ve “sold” in the previous 12 months include:</p>

              <ol>
                <li>Name, email address, mailing address, phone number</li>
                <li>
                  Log files, including Internet Protocol (IP) address, browser type, ISP,
                  browser language, the date and time of your request, operating system,
                  referring/exiting pages, clickstream data, plug-in etc.
                </li>
                <li>
                  Browsing information, such as date and time you visited our website, number
                  of pages you viewed, time in seconds you spend on each page, and details of
                  the any website you visited before and/or after participation in one of our
                  surveys or other research program
                </li>
                <li>Self-reported demographics (i.e. age, gender, education, etc.)</li>
                <li>
                  Self-reported firmographics (i.e. employment-related information such as
                  title and profession etc.)
                </li>
                <li>
                  Self-reported profile information (i.e. political affiliation, technology
                  usage, consumer preferences and ownership etc.)
                </li>
                <li>
                  System Metrics inclusive of survey status (completed survey, terminated
                  etc.) Length of time spent in a survey.
                </li>
              </ol>

              <p>
                Categories of information we’ve otherwise disclosed for a business or commercial
                purpose (for example, for confidential use by our service providers) in the
                previous 12 months include:
              </p>

              <ol>
                <li>Name, email address, mailing address, phone number</li>
                <li>
                  Log files, including Internet Protocol (IP) address, browser type, ISP,
                  browser language, the date and time of your request, operating system,
                  referring/exiting pages, clickstream data, plug-in etc.
                </li>
                <li>
                  Browsing information, such as date and time you visited our website, number
                  of pages you viewed, time in seconds you spend on each page, and details of
                  the any website you visited before and/or after participation in one of our
                  surveys or other research program
                </li>
                <li>Self-reported demographics (i.e. age, gender, education, etc.)</li>
                <li>
                  Self-reported firmographics (i.e. employment-related information such as
                  title and profession etc.)
                </li>
                <li>
                  Self-reported profile information (i.e. political affiliation, technology
                  usage, consumer preferences and ownership etc.)
                </li>
                <li>
                  System Metrics inclusive of survey status (completed survey, terminated
                  etc.) Length of time spent in a survey.
                </li>
              </ol>

              <p>If you are a California resident, you also have the following special rights:</p>

              <h3>Your Right to “Know” and to Request Deletion</h3>
              <p>
                You have the right to know the categories and specific pieces of personal
                information we have collected about you. You have the right to know the
                categories of sources from which the personal information has been collected,
                the business or commercial purpose for collecting or selling personal
                information, and the categories of third parties with whom we share personal
                information.
              </p>

              <p>
                You have the right to request deletion of personal information we’ve collected
                or maintain. To exercise these rights contact us at{" "}
                <a href="mailto:support@vmhgroup.com">
                  support@vmhgroup.com
                </a>
                .
              </p>

              <p>
                Please note that any requested disclosures will only apply to the 12-month
                period preceding the request, and you are entitled to request disclosure
                regarding your personal information twice in any 12-month period.
              </p>

              <h3>Your Right to Opt Out of the “Sale” of Your Information</h3>
              <p>You have the right to opt out of the sale of your personal information.</p>

              <h3>Your Right to Non-Discrimination</h3>
              <p>
                You have the right not to receive discriminatory treatment by The Rewards
                Nation for the exercise of the privacy rights conferred by the CCPA...
              </p>

              <p>
                <strong>Verification Process:</strong> If you make a request to access or
                delete your information, or to opt out of the sale of your personal
                information, we may ask you for additional information to verify your
                identity. This information may include: your full name, birth date, phone
                number, email address, or other basic personal information about you that
                we already have on file.
              </p>
            </Section>

            <Section id="support" title="16. Privacy Support" copyAnchor={copyAnchor}>
              <p>
                Enquiries or concerns about the VMH Group Market Research privacy policy can be
                directed to:
              </p>
              <address className="not-italic bg-slate-50 rounded-lg p-4 border border-slate-200">
                VMH Group Market Research
                <br />
                110, Houston St San Antonio,
                <br />
                TX 78205,
                <br />
                United States
                <br />
                E-mail:{" "}
                <a href="mailto:support@vmhgroup.com">
                  support@vmhgroup.com
                </a>
              </address>
            </Section>

            {/* Back / Home */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 active:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="opacity-90"
                >
                  <path
                    fill="currentColor"
                    d="M10 19l-7-7l7-7v4h8v6h-8v4z"
                  />
                </svg>
                Back to Home
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
          title="Copy link"
        >
          #
        </button>
      </div>
      <div className="mt-2 space-y-4">{children}</div>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8" />
    </section>
  );
}
