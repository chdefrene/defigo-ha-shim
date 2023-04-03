import fetch from "node-fetch";
import type { IncomingHttpHeaders } from "http";

const API_BASE_URL = "https://admin.defigohome.com/api";
const API_VERSION = "3.0";

export async function openDoor(
  doorbellId: string,
  { authorization: Authorization = "" }: IncomingHttpHeaders
) {
  const { status } = await fetch(
    `${API_BASE_URL}/doorbells/${doorbellId}/open`,
    {
      method: "GET",
      headers: {
        Authorization,
        "x-api-version": API_VERSION,
      },
    }
  );

  return status;
}
