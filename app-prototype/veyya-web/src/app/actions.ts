"use server";

export async function createBooking(payload: any) {
  // TODO: write to DB, call Stripe, send email
  console.log("Booking payload (server):", payload);
  return { ok: true };
}
