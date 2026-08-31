# Athenix — Lovable Build Prompt

Paste this into a **new** Lovable project chat to build it there. Lovable
builds on React + Vite + Tailwind + shadcn/ui, with "Lovable Cloud" as
the backend (database, edge functions) — use those instead of Next.js
patterns.

---

Build a premium, cinematic, dark-themed marketing website for
**Athenix** — a brand with two divisions:

- **Athenix Learning**: trains individuals and professionals in Data
  Analytics, Data Science and applied AI, live and trainer-led.
- **Athenix Consultancy**: helps businesses use AI, data and automation
  to work more efficiently.

## Brand facts (do not invent additional ones)

- Stats: **2,500+ learners trained**, **50+ corporates**, **4.8★ rating**.
- Philosophy: "Create an impact by training, not just provide training."
- Founder & lead trainer: **Hitesh Purohit** — Corporate AI, Data
  Analytics & Business Intelligence Trainer, Founder of Athenix
  Learning. 15+ years of business leadership experience. Bio: "Hitesh
  brings 15+ years of business leadership experience to Athenix
  Learning, training professionals and corporate teams in Advanced
  Excel, Power Query, Power BI, Generative AI, AI Automation and
  Agentic AI. His approach favors practical, business-first learning
  built around real use cases, dashboards and AI-driven workflows over
  theory — and he has delivered executive AI mentoring and training to
  senior leadership, including CXOs and academic faculty, at
  organizations he has worked with." LinkedIn:
  linkedin.com/in/-hitesh-purohit
- Trainer expertise tags: Advanced Excel, Power BI & Business
  Intelligence, Generative AI for Business, Data Science, Power Query
  (ETL), Dashboard Design & KPI Reporting, Data Storytelling, AI Prompt
  Engineering, AI Automation & Agentic AI, Microsoft Copilot for
  Business, Executive AI Adoption, Business Process Automation.
- Corporate clients trained: Anchor Group, Radhakrishna Foodland Pvt.
  Ltd., Greatwhite Global Pvt. Ltd., Canara Bank, GNIMS, SBI, Ira
  Skills, and others.
- Courses (Athenix Learning) — **no pricing, no full curriculum shown
  publicly** for any of these:
  - **Data Analytics + AI** — "Learn to work with data while using
    modern AI capabilities to improve analysis, productivity and
    decision-making." For: professionals and analysts wanting
    AI-assisted decision-making skills. Tags: Analytics, AI Tools,
    Business Insights, Practical Projects.
  - **Data Analytics + SQL + AI** — "Combine SQL fundamentals with
    AI-assisted analytics to query, interpret and present data with
    confidence." For: learners wanting a stronger data foundation
    alongside AI fluency. Tags: SQL, AI Tools, Dashboards, Practical
    Projects.
  - **Data Science** — "Build practical data science skills grounded in
    real projects, from data preparation to model-informed insight."
    For: learners moving from analytics into data science fundamentals.
    Tags: Data Science, Applied Projects, Statistics, AI Tools.
  - **AI Mentorship Program** (flagship) — "Practical AI mastery with
    guided implementation and professional application — Athenix's
    flagship program." For: professionals ready to apply AI directly to
    their work and career. Tags: AI Mastery, Mentorship, Implementation,
    Career Growth.
- Webinars — **the only two items with public prices**:
  - **Excel Webinar — ₹199**: "A focused, practical session on getting
    more out of Excel — built for real work, not theory." Bullets:
    practical Excel techniques usable immediately; live session with
    Q&A; beginner-friendly, professional-focused.
  - **Mastery in Claude — ₹499**: "A hands-on session on working with
    Claude effectively for real professional tasks." Bullets: practical
    applied Claude workflows; LinkedIn profile analysis; Claude resource
    document; GitHub resources & links.
- Consultancy services (9): AI Business Solutions, Data Analytics
  Dashboards, Data Automation, AI Workflow Automation, Website
  Development, AI Voice Agents, Customer Support Automation, Appointment
  Booking Automation, Everyday Business Automation — each with a short
  one-line description (practical, not hypey).
- Consultancy process: 01 Understand → 02 Identify Opportunities → 03
  Design the Solution → 04 Build & Automate → 05 Improve Efficiency.

## Design system

- **Dark theme.** Near-black background (`#05060a`–`#0a0c12`), off-white
  text, deep charcoal card surfaces (`rgba(255,255,255,0.03)` on dark).
- **Signature gradient**: indigo → magenta/fuchsia → amber
  (`#4b2fe0 → #e024c0 → #ffb020`) — used for primary buttons (animated,
  slowly shifting), glow effects, and gradient-clipped stat numbers.
  Deliberately NOT the generic blue→violet→cyan "AI startup" gradient.
- Large, bold display typography for headings; generous whitespace;
  soft glowing blurred orbs in hero/background sections; subtle grain
  texture overlay.
- Rounded-full pill buttons and nav; rounded-2xl/3xl cards with soft
  borders (`border-white/10`) that brighten on hover.

## Motion (this matters — make it feel alive)

- **Scroll-triggered fade-up reveals** on every card grid (courses,
  services, gallery, testimonials) — staggered by ~80–100ms per item.
- **Count-up numbers** for the 2,500+ / 50+ / 4.8★ stats, animating from
  0 when scrolled into view.
- **Word-by-word scroll-scrubbed text reveal**: a full-bleed pinned
  section (sticky, ~200vh tall) where a mission-statement paragraph
  lights up word by word, tied continuously to scroll position (not a
  one-shot trigger) — e.g. "Athenix exists to create an impact by
  training, not just provide training. We turn AI and data into
  practical skills for individuals, and into working systems for
  businesses — taught live, applied immediately, built to actually get
  used." Use this technique in 1–2 places (homepage + Consultancy page).
- Buttons: animated shifting gradient background, hover lift
  (translate-y + glow shadow).
- Cards: hover lift + border/shadow glow.
- Corporate client list: infinite horizontal marquee, pauses on hover.
- Hero: staggered entrance animation (badge → headline → subhead →
  buttons → stats), plus 1–2 slow-floating blurred gradient orbs in the
  background.
- Respect `prefers-reduced-motion`: skip/short-circuit all of the above
  to the final state for users who have it enabled.

## Pages

- **Home**: Hero → cinematic video slot (poster-only placeholder, see
  below) → trust stats → manifesto scroll-reveal → Learning/Consultancy
  split → Why Athenix → Courses grid → Trainer profile → Corporate
  training → Corporate client marquee → Corporate experience gallery →
  Testimonials carousel → Training gallery → Webinars → Consultancy
  teaser → Final CTA (two paths: individuals → book webinar; businesses
  → get consultation).
- **About**: philosophy, stats, Why Athenix, trainer profile, gallery.
- **Courses**: course grid (no pricing) + webinars section.
- **Trainers**: trainer card(s) — built to support adding more trainers
  later.
- **Testimonials**: image-gallery style (see Testimonials note below),
  filterable by category (Learner Reviews / Professional Training /
  Corporate Training / AI-Data Training).
- **Corporate Training**: focus areas, client marquee, experience
  gallery, lead form (Name, Work Email, Phone/WhatsApp, Company,
  Designation, Team Size, Training Requirement, Preferred Format,
  Message).
- **Consultancy**: hero, manifesto-style scroll reveal, services grid,
  process, use cases, lead form (Name, Business Email, Phone/WhatsApp,
  Company, Industry, Business Size, What do you want to improve?,
  Current Challenges, Preferred Contact Method).
- **Contact**: three quick paths (book webinar / corporate training /
  consultancy) + public FAQ accordion.

## Webinar registration (the primary individual-conversion action)

Persistent "Book a Webinar" in the nav and a floating pill CTA that
appears on scroll. Opens a modal with a form: Full Name, Email,
WhatsApp Number, Date of Birth, Occupation (Student / Working
Professional / Business Owner / Freelancer / Job Seeker / Educator /
Other), Course Interest (the 4 courses + "Not Sure Yet"), Webinar
(Excel Webinar / Mastery in Claude), consent checkbox. On success show:
"You're registered. We'll send the webinar details to your registered
contact." Include a honeypot field for spam.

## Lead delivery (use Lovable Cloud)

All three forms (webinar, corporate training, consultancy) should save
submissions via a Lovable Cloud table/edge function, and optionally
forward to an external Google Sheet via a webhook URL stored as a
secret. Validate every field server-side, not just client-side. Rate
limit submissions per IP. Never expose any secret to the client.

## Cinematic video

Don't generate video per-visitor. Add a lazy-loaded, poster-first video
component (muted, autoplay, loop, `playsInline`) that gracefully shows
just the poster image with a "Cinematic video coming soon" badge until
a real video file is provided later. Store video references in one
central config object, not hardcoded per component.

## Images

Use a fallback-safe image component: if a real photo hasn't been
uploaded yet, render a labeled gradient placeholder instead of a broken
image — never a broken `<img>`. Real assets to plan for: trainer
portrait + 2 stage photos, 4 corporate training photos, corporate
testimonial/poll screenshots (treat as a gallery, do not transcribe
their text as separate written testimonials), and the Athenix logo
mark (circuit-styled "A").

## Hard rules

- **No pricing anywhere except the two webinars** (₹199, ₹499). No
  course pricing, no curricula, no guarantees.
- **No fabricated stats, testimonials, credentials, or clients** beyond
  what's listed above.
- **No AI voice/chat assistant** — this project explicitly does not use
  one.
- **No internal marketing funnel logic anywhere in copy or code** —
  public positioning is simply: education → trust → webinar →
  conversation.
- Full SEO metadata, semantic HTML, alt text, sitemap; accessible forms
  and modals (focus trap, Escape to close, labeled inputs); responsive
  down to mobile.

---

Once built, publish it and connect a custom domain via
**Project Settings → Domains** in Lovable.
