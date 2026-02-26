import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!email || !isValidEmail(email))
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { error: "Server not configured (missing GOOGLE_APPS_SCRIPT_URL)." },
        { status: 500 }
      );
    }

    const forwardRes = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name,
        email,
        source: "reelfocus-landing",
      }),
    });

    if (!forwardRes.ok) {
      const text = await forwardRes.text().catch(() => "");
      return NextResponse.json(
        { error: "Failed to write to Google Sheet.", details: text.slice(0, 500) },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

