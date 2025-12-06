import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    const { name, email, pass } = user;

    if (!name || !email || !pass) {
      return NextResponse.json({ error: "Credentials required" });
    }

    const hashPass = await bcrypt.hash(pass, 10);

    const sql = neon(process.env.DATABASE_URL!);

    try {
      await sql`INSERT INTO users (name, email, pass) VALUES (${name}, ${email}, ${hashPass})`;
    } catch {
      return NextResponse.json({ error: "This email is already registered" });
    }

    return NextResponse.json({ success: "Account created successfully!" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
