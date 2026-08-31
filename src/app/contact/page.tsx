import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { faqs } from "@/content/faqs";
import BookWebinarButton from "@/components/webinar/BookWebinarButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Athenix about learning, corporate training or consultancy.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk"
            description="Tell us what you're looking for and we'll point you to the right next step."
            align="center"
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            <ContactPath
              title="Learning"
              description="Explore courses or book a live webinar."
              action={<BookWebinarButton source="contact" className="mt-4 inline-flex items-center justify-center rounded-full bg-athenix-line px-5 py-2.5 text-sm font-semibold text-white shadow-glow" />}
            />
            <ContactPath
              title="Corporate Training"
              description="Bring practical AI and data training to your team."
              action={
                <ButtonLink href="/corporate-training#corporate-form" variant="secondary" className="mt-4">
                  Discuss Corporate Training
                </ButtonLink>
              }
            />
            <ContactPath
              title="Consultancy"
              description="Automate work and build smarter systems for your business."
              action={
                <ButtonLink href="/consultancy#consultancy-form" variant="secondary" className="mt-4">
                  Get a Free Consultation
                </ButtonLink>
              }
            />
          </div>

          <p className="mt-12 text-center text-sm text-white/50">
            Or write to us at{" "}
            <a href="mailto:support@athenixlearning.com" className="text-flare-400 hover:text-flare-300">
              support@athenixlearning.com
            </a>
          </p>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Common questions" align="center" />
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-white/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white">
                  {faq.question}
                  <span className="ml-4 text-white/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-white/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactPath({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
      <h3 className="font-display text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{description}</p>
      {action}
    </div>
  );
}
