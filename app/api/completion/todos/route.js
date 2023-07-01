import { NextResponse } from "next/server";

export async function GET() {
  const todos = { done: false, messnage: " do it now" };

  return new NextResponse(JSON.stringify(todos));
}
