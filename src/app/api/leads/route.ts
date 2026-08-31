import { NextRequest, NextResponse } from "next/server";
import { webinarRegistrationSchema, corporateTrainingSchema } from "@/lib/validation";
import { deliverLead, isRateLimited } from "@/lib/leadDelivery";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`leads:${ip}`)) {
    return NextResponse.json({ message: "Too many submissions. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
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
  });

  return NextResponse.json({ message: "Success", delivery: result }, { status: 200 });
}
