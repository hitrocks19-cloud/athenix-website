import { NextRequest, NextResponse } from "next/server";
import { webinarRegistrationSchema, corporateTrainingSchema } from "@/lib/validation";
import { deliverLead, isLeadSaved, isRateLimited } from "@/lib/leadDelivery";
import { companyInfo } from "@/content/company";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`leads:${ip}`)) {
    return NextResponse.json({ message: "You've sent a few requests in a row. Please wait a moment and try again." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "We couldn't read that request. Please refresh the page and try again." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot filled the whole form.
  if (body.company_website) {
    return NextResponse.json({ message: "You're registered." }, { status: 200 });
  }

  const isCorporate = body.formType === "corporate-training";
  const schema = isCorporate ? corporateTrainingSchema : webinarRegistrationSchema;
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ message: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const result = await deliverLead({
    formType: isCorporate ? "corporate-training" : "webinar",
    submittedAt: new Date().toISOString(),
    data: parsed.data,
    // Webinar sign-ups normally use /api/payments/order; this path is the corporate form.
    status: isCorporate ? undefined : "Registered (payment not collected)",
  });

  if (!isLeadSaved(result)) {
    return NextResponse.json(
      { message: `We couldn't save your details just now. Please try again, or write to us at ${companyInfo.email}.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
