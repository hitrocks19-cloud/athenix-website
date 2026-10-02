import { deliverLead, DeliveryResult } from "@/lib/leadDelivery";

/**
 * Marks a webinar registration as Paid. Shared by the browser verify step and
 * the payment webhook so both write the same thing. Idempotent: the sheet
 * script updates the row for this order id, and reports `alreadyPaid` so the
 * second caller does not send a duplicate notification email.
 */
export async function recordPaidOrder(input: {
  orderId: string;
  paymentId: string;
  /** Rupees. */
  amountRupees: number;
  notes?: Record<string, string>;
}): Promise<DeliveryResult> {
  const notes = input.notes ?? {};
  return deliverLead({
    formType: "webinar",
    action: "update",
    submittedAt: new Date().toISOString(),
    status: "Paid",
    orderId: input.orderId,
    paymentId: input.paymentId,
    amount: input.amountRupees,
    paidAt: new Date().toISOString(),
    // Details come from the Cashfree order tags (server-trusted), used only
    // if the "Payment pending" row is missing and a fresh row has to be added.
    data: {
      fullName: notes.fullName ?? "",
      email: notes.email ?? "",
      whatsapp: notes.whatsapp ?? "",
      occupation: notes.occupation ?? "",
      courseInterest: notes.courseInterest ?? "",
      webinar: notes.webinar ?? "",
      webinarTitle: notes.webinarTitle ?? "",
    },
  });
}
