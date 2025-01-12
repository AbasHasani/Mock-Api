import { serverClient } from "@/app/_trpc/serverClient";

export async function GET(
  request: Request,
  {
    params,
  }: { params: Promise<{ id: number; itemId: number; nestings: string }> }
) {
  const { id, itemId, nestings } = await params;

  let api = (await serverClient.apisRouter.api({ id: Number(id) })).content;
  api = JSON.parse(api);
  const result =
    nestings == "_"
      ? api.find((item) => item.id == itemId)
      : api[nestings].find((item) => item.id == itemId);
  return Response.json({ result });
}
