import { NextRequest, NextResponse } from "next/server";
import { createAccount, getAccount, updateAccount } from "@/clients/account";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get("fid");

  if (!fid) {
    return NextResponse.json({ error: "fid is required" }, { status: 400 });
  }

  try {
    const account = await getAccount(Number(fid));
    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const { fid, signer_uuid } = await request.json();

  try {
    const account = await createAccount({ fid, signer_uuid });
    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get("fid");

  if (!fid) {
    return NextResponse.json({ error: "fid is required" }, { status: 400 });
  }

  const data = await request.json();

  try {
    const account = await updateAccount(Number(fid), data);
    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }
}
