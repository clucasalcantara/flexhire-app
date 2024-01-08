import FlexhireAPI from "@/lib/flexhire-api";

export async function POST(request: Request) {
    const res = await request.json()
    const { apiKey } = res;

    if (!apiKey) return;

    const userData = await FlexhireAPI.fetchLatestJobs(apiKey);

    return Response.json({ userData })
  }