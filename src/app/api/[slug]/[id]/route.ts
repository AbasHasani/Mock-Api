import { serverClient } from "@/app/_trpc/serverClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  let api = (await serverClient.apisRouter.api({ id: Number(id) })).content;
  api = JSON.parse(api);
  return Response.json({ api });
}
