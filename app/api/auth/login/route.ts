import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    const { email, pass, persist } = user;

    if (!email || !pass) {
      return NextResponse.json({ error: "Credentials required!" });
    }

    if (!persist) return;

    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT pass FROM users WHERE email = ${email}`;

    if (data.length === 0) {
      return NextResponse.json({ error: "Incorrect email or password!" });
    }

    const hashPass = data[0].pass;
    if (await bcrypt.compare(pass, hashPass)) {
      return NextResponse.json({ success: "Log in successfull!" });
    } else {
      return NextResponse.json({ error: "Incorrect email or password!" });
    }
  } catch {
    return NextResponse.json(
      { error: "Something went wrong! Try again later." },
      { status: 500 },
    );
  }
}
