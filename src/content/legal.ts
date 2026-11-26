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
      "Athenix Learning respects the privacy of its learners and customers and is committed to protecting personal information.",
      "This policy covers athenixlearning.com and the services of Athenix Learning, including Athenix Consultancy. Our software subscription product, Athenix Consultancy LinkedIn Automation (sociallink.athenixlearning.com), has its own detailed privacy policy at sociallink.athenixlearning.com/privacy.",
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
    heading: "Website Analytics",
    body: [
      "We use Google Analytics to understand how visitors use our website, for example which pages are viewed and which buttons are clicked. It uses cookies and similar technologies and collects usage information such as pages visited, device and approximate location. We do not send your name, email address or phone number to Google Analytics.",
    ],
  },
  {
    heading: "Data Sharing",
    body: ["Information may be shared only with:"],
    bullets: ["Payment gateway providers (e.g., Cashfree)", "Analytics providers (Google Analytics), limited to anonymous usage data", "Legal or regulatory authorities if required by law"],
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
      "Learners and customers may request access, correction, or deletion of their personal data, or withdraw consent, by contacting us at support@athenixlearning.com. We handle personal data in line with the Digital Personal Data Protection Act, 2023 and other applicable Indian laws.",
    ],
  },
  {
    heading: "Grievance Officer",
    body: [
      "For any privacy concern or complaint, contact our Grievance Officer: Hitesh Purohit, Head Trainer and Consultant, Athenix Learning. Email: hiteshpurohit@athenixlearning.com. Phone: +91 86900 27191. Address: 701, Parijat Arcade, Vikram Nagar, Kalwa West, Thane – 400605, Maharashtra, India.",
      "We acknowledge complaints within 48 hours and aim to resolve them within one month.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "",
    body: [
      "These Terms & Conditions govern the use of services provided by Athenix Learning, a sole proprietorship (proprietor: Jaya Purohit) based in Thane, Maharashtra, India, including its consultancy brand Athenix Consultancy.",
    ],
  },
  {
    heading: "Services Offered",
    body: ["Athenix Learning offers:"],
    bullets: [
      "Live online training sessions",
      "Access to session recordings",
      "One-on-one mentorship programs",
      "Offline training, workshops, and corporate programs",
      "AI automation and consultancy services (Athenix Consultancy)",
      "Software subscriptions, including Athenix Consultancy LinkedIn Automation (sociallink.athenixlearning.com)",
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
    heading: "Software Subscriptions & Autopay",
    body: [
      "Athenix Consultancy LinkedIn Automation is a monthly or quarterly software subscription (SaaS) sold by Athenix Learning at sociallink.athenixlearning.com. Plans, prices (in INR) and limits are shown on its pricing page.",
    ],
    bullets: [
      "New customers may get a 7-day free trial. To start it, the customer chooses a plan and sets up autopay (UPI Autopay, card or eNACH) through our payment partner Cashfree Payments; a ₹2 set-up amount is charged and refunded automatically.",
      "Unless cancelled before the trial ends, the chosen plan starts automatically and is charged on the same day each month or quarter until cancelled.",
      "The customer's bank or UPI app sends a notification at least 24 hours before each autopay charge, as required by the Reserve Bank of India.",
      "Customers can cancel anytime from the Billing page of the product, from their UPI app, or by writing to support@athenixlearning.com. After cancellation, no further charges are made and access continues until the end of the period already paid for.",
      "Plan prices may change with at least 30 days' notice; active subscribers keep their current price while their subscription stays active.",
      "Full subscription terms are published at sociallink.athenixlearning.com/terms.",
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
  {
    heading: "Governing Law & Grievances",
    body: [
      "These terms are governed by the laws of India. Any dispute is subject to the exclusive jurisdiction of the courts at Thane, Maharashtra.",
      "Grievance Officer: Hitesh Purohit, Head Trainer and Consultant. Email: hiteshpurohit@athenixlearning.com. Phone: +91 86900 27191. Complaints are acknowledged within 48 hours and resolved within one month.",
    ],
  },
];

export const refundPolicySections: LegalSection[] = [
  {
    heading: "",
    body: [
      "Athenix Learning provides professional education, training, mentorship, and skill-development programs through live online sessions, recorded content, and offline training programs. It also sells software subscriptions under its Athenix Consultancy brand.",
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
    heading: "Software Subscriptions (Athenix Consultancy LinkedIn Automation)",
    body: ["For subscriptions bought at sociallink.athenixlearning.com:"],
    bullets: [
      "A 7-day free trial is offered in place of a refund window. The ₹2 autopay set-up amount is refunded automatically.",
      "Cancel anytime before the trial ends and you will not be charged.",
      "You can cancel a paid subscription at any time from the Billing page or your UPI app. No further autopay charges are made after cancellation, and access continues until the end of the period already paid for.",
      "Subscription payments are non-refundable once charged, except for a duplicate charge, a charge made after a confirmed cancellation, or a technical fault on our side that prevented use of the service for most of the billing period.",
      "One-time add-ons such as the ATS Resume Builder are non-refundable once the resume has been generated, and are refunded if generation fails.",
      "Approved refunds are made to the original payment method within 7–10 business days. The full policy is at sociallink.athenixlearning.com/refunds.",
    ],
  },
  {
    heading: "How to Request a Refund or Cancellation",
    body: [
      "Email support@athenixlearning.com or call +91 86900 27191 with your registered email or mobile number and the payment reference. Grievances can be raised with our Grievance Officer, Hitesh Purohit (hiteshpurohit@athenixlearning.com).",
    ],
  },
  {
    heading: "",
    body: ["By completing a payment, the learner or customer agrees to this Refund & Cancellation Policy."],
  },
];
