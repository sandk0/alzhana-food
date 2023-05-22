import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const rawBody = await request.json();

  const res = await fetch("http://45.142.213.132:8000/zakaz/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawBody),
  });
  const data = await res.json();

  if (res.status !== 200 && res.status !== 201) {
    return NextResponse.json({ result: false, data });
  }

  return NextResponse.json({ result: true });
}
