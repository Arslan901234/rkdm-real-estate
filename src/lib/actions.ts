"use server";

import { db } from "@/db";
import { inquiries } from "@/db/schema";
import type { FormState } from "@/lib/form-state";

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitInquiry(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const type = clean(formData.get("type")) === "site-visit" ? "site-visit" : "contact";
    const name = clean(formData.get("name"));
    const phone = clean(formData.get("phone")).replace(/[^\d+]/g, "");
    const email = clean(formData.get("email"));
    const projectName = clean(formData.get("projectName"));
    const preferredDate = clean(formData.get("preferredDate"));
    const preferredTime = clean(formData.get("preferredTime"));
    const message = clean(formData.get("message"));

    if (name.length < 2 || name.length > 80) {
      return { status: "error", message: "Please enter your full name." };
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return { status: "error", message: "Please enter a valid 10-digit phone number." };
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { status: "error", message: "Please enter a valid email address." };
    }
    if (type === "site-visit" && !preferredDate) {
      return { status: "error", message: "Please choose a preferred visit date." };
    }

    await db.insert(inquiries).values({
      type,
      name,
      phone,
      email,
      projectName,
      preferredDate,
      preferredTime,
      message: message.slice(0, 2000),
    });

    return {
      status: "success",
      message:
        type === "site-visit"
          ? "Thank you! Your site visit request has been received. Our team will call you shortly to confirm the schedule."
          : "Thank you! Your enquiry has been received. Our team will reach out to you shortly.",
    };
  } catch (error) {
    console.error("submitInquiry failed:", error);
    return {
      status: "error",
      message: "Something went wrong while submitting. Please call us directly at 8866000677.",
    };
  }
}
