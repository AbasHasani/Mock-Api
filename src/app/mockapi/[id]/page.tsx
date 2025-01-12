import { serverClient } from "@/app/_trpc/serverClient";
import ApiEditor from "@/components/ApiEditor";
import Editor from "@/components/Editor";
import { getFormattedDateTime } from "@/lib/utils";
import React, { FC } from "react";

interface props {
  params: Promise<{
    id: number;
  }>;
}

const MockApi: FC<props> = async ({ params }) => {
  const { id } = await params;
  const api = await serverClient.apisRouter.api({ id: Number(id) });

  return (
    <div className="md:px-10">
      <ApiEditor value={api.content} api={api} />
    </div>
  );
};

export default MockApi;
