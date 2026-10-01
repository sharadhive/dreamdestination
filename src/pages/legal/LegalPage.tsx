import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { SITE, CONTACT, LEGAL_ROUTES } from "@/config/site";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: LegalSection[];
}

/** Update this whenever the wording of any policy below changes. */
export const LEGAL_LAST_UPDATED = "10 September 2026";

const contactLine = CONTACT.emailVerified && CONTACT.email
  ? `You can reach us at ${CONTACT.email} or ${CONTACT.phoneDisplay}.`
  : `You can reach us at ${CONTACT.phoneDisplay} or via WhatsApp.`;

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    metaTitle: `Privacy Policy | ${SITE.name}`,
    metaDescription: `How ${SITE.name} collects, uses, stores and protects the personal information of students who use our study abroad services.`,
    intro: `This policy explains what personal information ${SITE.name} collects from students and their families, why we collect it, how we use it, and the choices you have. It applies to ${SITE.domain} and to the counselling services we provide.`,
    sections: [
      {
        heading: "Information we collect",
        paragraphs: ["We collect information you give us directly when you fill in an enquiry or assessment form, speak to a counsellor, or send us documents:"],
        bullets: [
          "Contact details — name, mobile number, email address and city",
          "Academic details — qualifications, marks or CGPA, graduation year, test scores",
          "Professional details — work experience, where relevant to your application",
          "Study preferences — preferred course, destination, intake and budget",
          "Application documents you choose to share, such as transcripts, your CV, SOP or passport copy",
          "Basic technical data your browser sends, such as device type and pages visited",
        ],
      },
      {
        heading: "Why we use it",
        bullets: [
          "To assess your profile and suggest suitable courses, universities and destinations",
          "To prepare and submit university applications on your instruction",
          "To help you understand scholarship, education loan and visa requirements",
          "To contact you about your enquiry and the progress of your applications",
          "To improve our services and website",
        ],
      },
      {
        heading: "Who we share it with",
        paragraphs: [
          "We share your information only where it is needed to deliver the service you have asked for, and only with your knowledge:",
        ],
        bullets: [
          "Universities and their authorised representatives, when submitting your application",
          "Banks, NBFCs and other lenders, where you ask us to help with an education loan",
          "Scholarship providers, where you apply through us",
          "Service providers who help us operate our website and communications",
          "Authorities, where we are required to disclose information by law",
        ],
      },
      {
        heading: "We do not sell your data",
        paragraphs: [
          "We do not sell, rent or trade your personal information to third parties for their own marketing purposes.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep your information for as long as needed to provide our services and to meet any legal or record-keeping obligations. If you ask us to delete your data and we are not required to retain it, we will do so.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: ["Under Indian data protection law, including the Digital Personal Data Protection Act, 2023, you can ask us to:"],
        bullets: [
          "Confirm what personal data of yours we hold and how it is being used",
          "Correct information that is inaccurate or incomplete",
          "Delete information we no longer need to keep",
          "Withdraw a consent you previously gave",
          "Nominate someone to exercise these rights on your behalf",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We take reasonable technical and organisational measures to protect the information you share with us. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "Where a student is under 18, we expect a parent or legal guardian to be involved in the enquiry and to consent to our processing of that student's information.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The date at the top of this page shows when it was last revised.",
        ],
      },
      { heading: "Contact us", paragraphs: [`If you have a question about this policy or want to exercise any of your rights, please get in touch. ${contactLine}`] },
    ],
  },

  /*
   * Renamed from "Terms of Service" at /terms-of-service.
   *
   * "Terms and Conditions" is the phrase Indian users actually search for, and
   * the one Indian consumer law uses — the Consumer Protection (E-Commerce)
   * Rules refer to terms and conditions, not terms of service. The old URL 301s
   * here (see App.tsx). Safe to rename now because nothing is indexed yet; after
   * launch this would cost whatever link equity the old URL had earned.
   */
  "terms-and-conditions": {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    metaTitle: `Terms and Conditions | ${SITE.name}`,
    metaDescription: `The terms that apply when you use the ${SITE.name} website and study abroad advisory services.`,
    intro: `These terms apply when you use ${SITE.domain} or engage ${SITE.name} for study abroad guidance. By using our website or services, you agree to them.`,
    sections: [
      {
        heading: "What we provide",
        paragraphs: [
          "We provide advisory and support services for students planning to study abroad. This includes career counselling, course and university selection, application support, guidance on scholarships and education loans, student visa preparation, and accommodation guidance.",
          "We are an independent consultancy. We are not a university, a lender, an insurer, or an immigration authority.",
        ],
      },
      {
        heading: "What we cannot promise",
        paragraphs: ["Certain decisions are made entirely by third parties, and no consultancy can control or guarantee them:"],
        bullets: [
          "Admission decisions are made by universities under their own criteria",
          "Visa decisions are made by the relevant immigration authority",
          "Education loan approvals, amounts, interest rates and terms are set by the lender",
          "Scholarship awards are decided by the scholarship provider",
          "Employment outcomes after your studies depend on your skills, the labour market and employer requirements",
        ],
      },
      {
        heading: "Your responsibilities",
        bullets: [
          "Give us accurate, complete and honest information about your profile",
          "Provide genuine documents — we will not submit fabricated or altered documents on your behalf, and doing so can result in permanent bans from universities and immigration authorities",
          "Meet deadlines we communicate to you",
          "Verify requirements independently on official university and government websites, as these change",
          "Make your own final decisions about where to apply, borrow and travel",
        ],
      },
      {
        heading: "Fees",
        paragraphs: [
          "Where a service carries a fee, the amount, scope and payment terms will be shared with you in writing before you commit. Third-party costs such as application fees, test fees, visa fees, university deposits and courier charges are separate and payable by you.",
        ],
      },
      {
        heading: "Third-party content and links",
        paragraphs: [
          "Our website may link to university, government or lender websites. We do not control those sites and are not responsible for their content, accuracy or availability.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent permitted by law, our liability in connection with our services is limited to the fees you have paid us for the specific service concerned. We are not liable for decisions taken by universities, lenders, insurers or immigration authorities.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, and the courts of India shall have jurisdiction over any dispute arising from them.",
        ],
      },
      { heading: "Contact us", paragraphs: [`If anything here is unclear, please ask before engaging our services. ${contactLine}`] },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    metaTitle: `Disclaimer | ${SITE.name}`,
    metaDescription: `Important information about the accuracy and limits of the study abroad guidance published on the ${SITE.name} website.`,
    intro: `The information on ${SITE.domain} is provided for general guidance to students considering studying abroad. Please read the following before relying on it.`,
    sections: [
      {
        heading: "Information may change",
        paragraphs: [
          "Tuition fees, living costs, entry requirements, English-language score requirements, visa rules, financial thresholds, scholarship availability and post-study work rights all change — sometimes at short notice, and sometimes differently between departments of the same university.",
          "Always confirm current requirements on the official university website and the official immigration website of your destination before making any decision or payment.",
        ],
      },
      {
        heading: "No guarantee of outcomes",
        bullets: [
          "We do not guarantee admission to any university or programme",
          "We do not guarantee that a student visa will be granted",
          "We do not guarantee education loan approval, or any particular loan amount or interest rate",
          "We do not guarantee any scholarship",
          "We do not guarantee any job, salary or permanent residency outcome after your studies",
        ],
      },
      {
        heading: "Not professional advice",
        paragraphs: [
          "Nothing on this website is legal, immigration, financial or tax advice. Education loan information is general in nature and is not a recommendation to borrow from any particular lender. For advice on your specific circumstances, please consult a qualified professional.",
        ],
      },
      {
        heading: "Examples and estimates",
        paragraphs: [
          "Any figures, cost breakdowns or worked examples on this website are illustrative only. Your actual costs will depend on your destination, city, university, course, lifestyle and prevailing exchange rates.",
        ],
      },
      {
        heading: "Third-party names",
        paragraphs: [
          "University, government, lender and test provider names are used for identification and descriptive purposes only. Their use does not imply any endorsement of or affiliation with us unless we state a partnership explicitly.",
        ],
      },
      { heading: "Questions", paragraphs: [`If you would like clarification on anything published here, please contact us. ${contactLine}`] },
    ],
  },

  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    metaTitle: `Cookie Policy | ${SITE.name}`,
    metaDescription: `How ${SITE.name} uses cookies and similar technologies on its website, and how you can control them.`,
    intro: "This policy explains what cookies are, how our website uses them, and the choices available to you.",
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to remember your preferences, and to understand how a site is being used.",
        ],
      },
      {
        heading: "How we use them",
        bullets: [
          "Essential — needed for the website to function, such as remembering your language preference",
          "Preference — remembering choices you have made so you do not have to set them again",
          "Analytics — helping us understand which pages are useful so we can improve them",
        ],
      },
      {
        heading: "Third-party cookies",
        paragraphs: [
          "Some cookies may be set by third-party services we use, such as web analytics or embedded content. These providers set their own cookies under their own policies.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can control or delete cookies through your browser settings, and set your browser to warn you before a cookie is stored. Blocking some cookies may affect how parts of this website work.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: ["We may update this policy as our website changes. The date above shows the most recent revision."],
      },
      { heading: "Contact us", paragraphs: [`If you have a question about our use of cookies, please get in touch. ${contactLine}`] },
    ],
  },
};

const LegalPage = ({ doc }: { doc: LegalDoc }) => (
  <div className="min-h-screen bg-background text-foreground flex flex-col">
    <SEOHead
      title={doc.metaTitle}
      description={doc.metaDescription}
      canonicalUrl={`/${doc.slug}`}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: doc.metaTitle,
          description: doc.metaDescription,
          url: `${SITE.domain}/${doc.slug}`,
          inLanguage: "en-IN",
          dateModified: "2026-09-10",
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
        },
      ]}
    />
    <Header />

    <main className="flex-1">
      <div className="bg-gradient-subtle border-b pt-20">
        <div className="container mx-auto px-4 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{doc.title}</span>
          </nav>
        </div>
      </div>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{doc.title}</h1>
            <p className="text-xs text-muted-foreground mb-8">Last updated: {LEGAL_LAST_UPDATED}</p>
            <p className="text-muted-foreground leading-relaxed mb-10">{doc.intro}</p>

            <div className="space-y-10">
              {doc.sections.map(section => (
                <section key={section.heading}>
                  <h2 className="text-xl font-extrabold mb-3">{section.heading}</h2>
                  {section.paragraphs?.map(p => (
                    <p key={p} className="text-sm text-muted-foreground leading-relaxed mb-3">{p}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 mt-3">
                      {section.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t">
              <h2 className="text-sm font-bold mb-3">Other policies</h2>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {LEGAL_ROUTES.filter(r => r.to !== `/${doc.slug}`).map(r => (
                  <Link key={r.to} to={r.to} className="text-sm text-primary hover:underline">{r.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default LegalPage;
