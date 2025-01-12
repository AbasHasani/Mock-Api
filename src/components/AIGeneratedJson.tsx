import React, { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { model } from "@/lib/geminiConfig";
import { Loader2 } from "lucide-react";
import Editor from "./Editor";
import { useAIJson } from "@/store/aiJson";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/clientAuth";
import { getFormattedDateTime } from "@/lib/utils";

const AiGeneratedJson = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const changeJson = useAIJson((state) => state.changeJson);
  const result = useAIJson((state) => state.json);
  const addApi = trpc.apisRouter.addApi.useMutation();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = inputRef?.current?.value;
    if (!prompt) return;
    setLoading(true);
    setError(false);
    try {
      const resultAll = await model.generateContent([
        prompt +
          "Respond only with json and no json``` at the start and ``` at the end and do not stop early. finish all requied items (give a usble json object)",
      ]);
      let res = resultAll.response.text();
      console.log(res.length);

      res = res.replace("```json", "").replace("```", "");
      changeJson(res);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  const { data: session } = authClient.useSession();
  const { toast } = useToast();
  const isValidJson = useAIJson((state) => state.isValidJson);
  const handleAddApi = async () => {
    const name = nameInputRef?.current?.value;
    if (!name || !isValidJson) return;
    try {
      addApi.mutate({ content: result, userId: session?.user.id!, name });
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
    <div className="flex flex-col gap-2 mt-3">
      <form
        onSubmit={handleSubmit}
        className="w-full p-2 bg-gray-900/40 flex flex-col gap-4 rounded-sm mb-2"
      >
        <Label htmlFor="prompt" className="font-mono">
          Generate your json data with AI ✨
        </Label>
        <Input
          name="prompt"
          type="text"
          ref={inputRef}
          className="w-full"
          placeholder="ex. generate 10 products"
        />
        <div className="flex flex-col items-start gap-3">
          <Button type="submit">Generate</Button>
          {result && isValidJson ? (
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
            result &&
            !isValidJson && (
              <div className="h-[3rem] text-red-700 border-l pl-2 flex items-center font-bold">
                You should enter valid json format.
              </div>
            )
          )}
        </div>
      </form>
      <div>
        {loading && <Loader2 className="animate-spin" />}{" "}
        {error && <p>Some error occured!</p>}
        {result && <Editor content={result} generatorType="ai" />}
      </div>
    </div>
  );
};

export default AiGeneratedJson;
