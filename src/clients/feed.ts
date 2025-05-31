import dayjs from "dayjs";
import "dotenv/config";

export const DEFAULT_DAYS = 180;

export async function getCasts(fid: number, days: number = DEFAULT_DAYS) {
  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return [];
  }

  const startDate = dayjs().subtract(days, "d").format("YYYY-MM-DD");
  let allCasts: any[] = [];
  let cursor: string | undefined = undefined;

  while (true) {
    const url = new URL("https://api.neynar.com/v2/farcaster/cast/search");
    url.searchParams.set("author_fid", String(fid));
    url.searchParams.set("q", `* before:${startDate}`);
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);

    const response = await fetch(url.toString(), {
      headers: {
        "x-api-key": process.env.NEYNAR_API_KEY,
      },
    });

    const data = await response.json();
    if (data.result?.casts?.length) {
      allCasts = allCasts.concat(data.result.casts);
    }

    if (data.result?.next?.cursor) {
      cursor = data.result.next.cursor;
    } else {
      break;
    }
  }

  return allCasts;
}

export async function deleteCast(signer_uuid: string, cast_id: string) {
  console.log("deleteCast", cast_id);

  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return null;
  }

  const res = await fetch(`https://api.neynar.com/v2/farcaster/cast`, {
    method: "DELETE",
    headers: {
      "x-api-key": process.env.NEYNAR_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signer_uuid: signer_uuid,
      target_hash: cast_id,
    }),
  });

  const data = await res.json();
  return data.success;
}
