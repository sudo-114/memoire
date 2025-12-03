import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const email = await req.json();
    if (email) {
      return NextResponse.json({ success: "Reset" });
    }
  } catch {
    return NextResponse.json(
      { error: "Unexpected error occured! Try again later." },
      { status: 500 },
    );
  }
}
