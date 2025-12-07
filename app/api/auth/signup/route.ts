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

    await sql`INSERT INTO users (name, email, pass) VALUES (${name}, ${email}, ${hashPass})`;

    return NextResponse.json({ success: "Account created successfully!" });
  } catch (err: any) {
    if (err.code === "23505") {
      return NextResponse.json(
        { error: "This email is already registered!" },
        { status: 409 },
      );
    } else {
      return NextResponse.json(
        { error: "Something went wrong! Try again later." },
        { status: 500 },
      );
    }
  }
}
