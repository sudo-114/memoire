import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Credentials required" },
        { status: 400 },
      );
    }

    const ok = true;
    if (ok) {
      return NextResponse.json({ success: "Account created successfully!" });
    }
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
