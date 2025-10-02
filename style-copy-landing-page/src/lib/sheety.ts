import { z } from "zod";
import { validateAndSanitizeName, validateAndSanitizeEmail } from "@/utils/sanitize";

// Schema for waitlist entry
export const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  createdAt: z.string().optional(),
});

export type WaitlistEntry = z.infer<typeof waitlistSchema>;

// Internal API endpoint (serverless) to protect secrets
const INTERNAL_WAITLIST_API = "/api/waitlist";

export async function addToWaitlist(entry: Omit<WaitlistEntry, "createdAt">) {
  try {
    // Sanitize inputs
    const sanitizedName = validateAndSanitizeName(entry.name);
    const sanitizedEmail = validateAndSanitizeEmail(entry.email);
    
    if (!sanitizedName || !sanitizedEmail) {
      throw new Error("Invalid input data");
    }

    const response = await fetch(INTERNAL_WAITLIST_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sanitizedName,
        email: sanitizedEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to waitlist");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    throw error;
  }
} 