let budget = 1000000; // sementara hardcoded

export async function GET() {
  return Response.json({ budget });
}