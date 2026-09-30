import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rkdm_admin";

function expectedPasscode(): string {
  return process.env.ADMIN_PASSCODE || "rkdm-admin-2024";
}

export function verifyPasscode(input: string): boolean {
  return input.length > 0 && input === expectedPasscode();
}

export function makeToken(): string {
  return createHash("sha256")
    .update(`${expectedPasscode()}|rkdm-admin-salt`)
    .digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === makeToken();
}
