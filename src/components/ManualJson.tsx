import React, { useRef } from "react";
import JsonEditor from "./Editor";
import useManualJson from "@/store/manualJson";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";
import { Input } from "./ui/input";
import { authClient } from "@/lib/clientAuth";
import { useToast } from "@/hooks/use-toast";
import { getFormattedDateTime } from "@/lib/utils";

const ManualJson = () => {
  const value = useManualJson((state) => state.json);
  const isValidJson = useManualJson((state) => state.isValidJson);
  const addApi = trpc.apisRouter.addApi.useMutation();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();
  const { toast } = useToast();
  const handleAddApi = async () => {
    const name = nameInputRef?.current?.value;
    if (!name) return;
    try {
      addApi.mutate({ content: value, userId: session?.user.id!, name });
      toast({
        title: "You successfully added the api",
        description: getFormattedDateTime(),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: getFormattedDateTime(),
      });
    }
  };
  return (
    <div className="mt-3">
      <div className="bg-gray-900/40 p-2 mb-2">
        <h2 className="font-mono mb-2">Write your own json</h2>
        {isValidJson ? (
          <div className="flex items-center gap-3 h-[3rem]">
            <Input
              placeholder="Name of the api"
              ref={nameInputRef}
              className="max-w-[20rem]"
            />
            <Button onClick={handleAddApi} className="my-3">
              Add to database
            </Button>
          </div>
        ) : (
          <div className="h-[3rem] text-red-700 border-l pl-2 flex items-center font-bold">
            You should enter valid json format.
          </div>
        )}
      </div>
      <JsonEditor generatorType="manual" />
    </div>
  );
};

export default ManualJson;
