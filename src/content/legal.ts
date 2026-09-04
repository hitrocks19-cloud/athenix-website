export type LegalSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

/**
 * Carried over verbatim (Terms gets one addition — see below) from the
 * previous site, athenixlearning.com, so these aren't placeholder text.
 */
export const privacyPolicySections: LegalSection[] = [
  {
    heading: "",
    body: [
      "Athenix Learning respects the privacy of its learners and is committed to protecting personal information.",
    ],
  },
  {
    heading: "Information We Collect",
    body: ["We may collect:"],
    bullets: [
      "Name, email address, phone number, qualification, date of birth",
      "Payment-related details (processed securely via payment gateways)",
      "Course participation and communication records",
    ],
  },
  {
    heading: "",
    body: ["We do not store card, UPI, or banking details on our servers."],
  },
  {
    heading: "Use of Information",
    body: ["Collected information is used to:"],
    bullets: ["Deliver educational services", "Communicate course updates", "Provide support", "Meet legal and regulatory requirements"],
  },
  {
    heading: "Data Sharing",
    body: ["Information may be shared only with:"],
    bullets: ["Payment gateway providers (e.g., Razorpay)", "Legal or regulatory authorities if required by law"],
  },
  {
    heading: "",
    body: ["We do not sell or misuse personal data."],
  },
  {
    heading: "Data Security",
    body: ["Reasonable technical and organizational safeguards are used to protect personal information."],
  },
  {
    heading: "User Rights",
    body: [
      "Learners may request access, correction, or deletion of their personal data by contacting us at support@athenixlearning.com.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "",
    body: ["These Terms & Conditions govern the use of services provided by Athenix Learning."],
  },
  {
    heading: "Services Offered",
    body: ["Athenix Learning offers:"],
    bullets: [
      "Live online training sessions",
      "Access to session recordings",
      "One-on-one mentorship programs",
      "Offline training, workshops, and corporate programs",
    ],
  },
  {
    heading: "",
    body: ["All services are delivered through scheduled sessions and defined learning formats."],
  },
  {
    heading: "Enrolment & Payments",
    bullets: [
      "Enrolment is confirmed only after successful payment.",
      "Fees must be paid in full unless otherwise specified.",
      "Payments are processed securely through authorized payment gateways.",
      "If any part of the course fee remains pending or unpaid after the agreed schedule, Athenix Learning reserves the right to suspend or remove access to the course, live sessions, and related materials within 15 days of non-payment.",
    ],
  },
  {
    heading: "No Job Guarantee",
    body: [
      "Athenix Learning does not guarantee job placement, employment, or specific career outcomes. Results depend on individual effort, background, and market conditions.",
    ],
  },
  {
    heading: "User Responsibility",
    body: ["Learners are responsible for:"],
    bullets: [
      "Providing accurate personal information",
      "Attending sessions on time",
      "Using learning materials for personal use only",
    ],
  },
  {
    heading: "",
    body: ["Unauthorized sharing or misuse of content is prohibited."],
  },
  {
    heading: "Limitation of Liability",
    body: ["Athenix Learning shall not be held liable for:"],
    bullets: ["Internet or technical issues beyond our control", "Personal outcomes resulting from course participation"],
  },
  {
    heading: "Policy Updates",
    body: [
      "Athenix Learning reserves the right to update these terms at any time. Continued use of services implies acceptance of updated terms.",
    ],
  },
];

export const refundPolicySections: LegalSection[] = [
  {
    heading: "",
    body: [
      "Athenix Learning provides professional education, training, mentorship, and skill-development programs through live online sessions, recorded content, and offline training programs.",
    ],
  },
  {
    heading: "No Refund Policy",
    body: [
      "All course fees paid to Athenix Learning are non-refundable once enrollment is confirmed. As our services involve immediate access to digital resources, scheduled live sessions, mentorship support, and limited-seat programs, refunds are not offered after course access has been provided or sessions have commenced.",
    ],
  },
  {
    heading: "Exceptional Cases",
    body: ["Refunds may be considered only in the following situations:"],
    bullets: [
      "Duplicate payment made by the learner",
      "Payment deducted but enrollment not confirmed due to a technical error",
      "Course cancelled by Athenix Learning due to unforeseen circumstances",
    ],
  },
  {
    heading: "",
    body: ["If approved, refunds will be processed within 7–10 business days to the original mode of payment."],
  },
  {
    heading: "Course Transfers",
    body: [
      "At the sole discretion of Athenix Learning, learners may be allowed to transfer their enrollment to a future batch or adjust the fee toward another program. This is not guaranteed and is evaluated case-by-case.",
    ],
  },
  {
    heading: "International Payments",
    body: [
      "For international transactions, payment gateway charges, currency conversion fees, and taxes are non-refundable.",
    ],
  },
  {
    heading: "",
    body: ["By completing a payment, the learner agrees to this Refund & Cancellation Policy."],
  },
];
