import { companyInfo } from "@/content/company";

/** Legal business identity, contact and grievance details, shown on the contact and policy pages. */
export default function BusinessDetails({ lastUpdated }: { lastUpdated?: string }) {
  const g = companyInfo.grievanceOfficer;
  return (
    <div className="mt-12 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
      <h2 className="font-display text-base font-semibold text-white">Business details</h2>
      <dl className="mt-3 space-y-1.5">
        <div>
          <dt className="inline text-white/80">Legal name: </dt>
          <dd className="inline">{companyInfo.legalName} ({companyInfo.businessType})</dd>
        </div>
        <div>
          <dt className="inline text-white/80">Proprietor: </dt>
          <dd className="inline">{companyInfo.proprietor}</dd>
        </div>
        <div>
          <dt className="inline text-white/80">Brands &amp; products: </dt>
          <dd className="inline">
            Athenix Learning, Athenix Consultancy, and {companyInfo.products.linkedinAutomation.name} (
            <a href={companyInfo.products.linkedinAutomation.url} className="text-flare-400 hover:text-flare-300">
              {companyInfo.products.linkedinAutomation.host}
            </a>
            )
          </dd>
        </div>
        <div>
          <dt className="inline text-white/80">Address: </dt>
          <dd className="inline">
            {companyInfo.address.line1} {companyInfo.address.line2} {companyInfo.address.line3}
          </dd>
        </div>
        <div>
          <dt className="inline text-white/80">Phone: </dt>
          <dd className="inline">
            <a href={companyInfo.phoneHref} className="hover:text-white">
              {companyInfo.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="inline text-white/80">Email: </dt>
          <dd className="inline">
            <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
              {companyInfo.email}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${companyInfo.altEmail}`} className="hover:text-white">
              {companyInfo.altEmail}
            </a>
          </dd>
        </div>
        <div>
          <dt className="inline text-white/80">Grievance Officer: </dt>
          <dd className="inline">
            {g.name}, {g.designation} ·{" "}
            <a href={`mailto:${g.email}`} className="hover:text-white">
              {g.email}
            </a>{" "}
            · {g.phone}. Complaints are acknowledged within 48 hours and resolved within one month.
          </dd>
        </div>
      </dl>
      {lastUpdated ? <p className="mt-4 text-xs text-white/40">Last updated: {lastUpdated}</p> : null}
    </div>
  );
}
