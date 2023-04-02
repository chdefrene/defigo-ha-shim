import fetch from "node-fetch";
import type { IncomingHttpHeaders } from "http";

const API_BASE_URL = "https://admin.defigohome.com/api";

// The Defigo lock will only stay open for ~6 seconds
export const AUTO_LOCK_TIMEOUT = 6000;

export async function openDoor(
  doorbellId: string,
  { authorization = "" }: IncomingHttpHeaders
) {
  const { status } = await fetch(
    `${API_BASE_URL}/doorbells/${doorbellId}/open`,
    {
      headers: {
        authorization,
        "x-api-version": "3.0",
      },
    }
  );

  return status;
}
