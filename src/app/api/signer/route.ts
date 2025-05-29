import { createSigner, getSigner, registerSigner } from "@/clients/neynar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const signer_uuid = request.nextUrl.searchParams.get("signer_uuid");
  if (!signer_uuid) {
    return NextResponse.json(
      { error: "signer_uuid is required" },
      { status: 400 }
    );
  }

  const data = await getSigner(signer_uuid);

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}

export async function POST() {
  const data = await createSigner();

  return NextResponse.json(data, {
    status: 200,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  if (!body.public_key || !body.signature || !body.fid || !body.deadline) {
    return NextResponse.json(
      { error: "public_key, signature, fid, and deadline are required" },
      { status: 400 }
    );
  }

  const data = await registerSigner(body);

  return NextResponse.json(data, {
    status: 200,
  });
}
