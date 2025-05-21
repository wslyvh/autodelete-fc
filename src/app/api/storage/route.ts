import { getStorageInfo } from "@/clients/neynar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const fid = request.nextUrl.searchParams.get("fid");
  if (!fid) {
    return NextResponse.json({ error: "fid is required" }, { status: 400 });
  }

  const data = await getStorageInfo(Number(fid));

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
