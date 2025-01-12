"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { json } from "@codemirror/lang-json";
import { getArrayPaths, getFormattedDateTime, toKebabCase } from "@/lib/utils";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface props {
  value: string;
  api: {
    id: number;
    content: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const ApiEditor: FC<props> = ({ value, api }) => {
  const [code, setCode] = useState(value);
  const [validJson, setValidJson] = useState(true);
  const updateApi = trpc.apisRouter.updateApi.useMutation();
  const deletepi = trpc.apisRouter.deleteApi.useMutation();
  const router = useRouter();
  const { toast } = useToast();
  const onChange = useCallback((val: string) => {
    setCode(val);
  }, []);
  const handleApiUpdate = async () => {
    try {
      JSON.parse(code);
      updateApi.mutate({ content: code, id: api.id });
      toast({
        title: "Api Updated.",
        description: getFormattedDateTime(),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Either inproper json or something else.",
        description: getFormattedDateTime(),
      });
    }
  };
  const handleApiDeletion = async () => {
    try {
      deletepi.mutate({ id: api.id });
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: getFormattedDateTime(),
      });
    }
  };
  useEffect(() => {
    try {
      JSON.parse(code);
      setValidJson(true);
    } catch (error) {
      setValidJson(false);
    }
  }, [code]);
  const arrayPaths = getArrayPaths(JSON.parse(api.content));
  return (
    <>
      <div className="bg-slate-900/40 p-2 mb-2">
        <div className="flex justify-between ">
          <h1 className="capitalize text-2xl font-bold text-violet-200">
            {api.name}
          </h1>
          <p className="text-violet-800">
            {getFormattedDateTime(api.updatedAt)}
          </p>
        </div>
        <ul>
          <li>
            <Link
              target="_blank"
              href={`/api/${toKebabCase(api.name)}/${api.id}`}
            >
              <Button variant={"link"}>Entire data url (api)</Button>
            </Link>
          </li>
          {arrayPaths.map((path) => (
            <li key={path}>
              <Link
                target="_blank"
                href={`/api/${toKebabCase(api.name)}/${api.id}/${path}/0`}
              >
                <Button variant={"link"}>Access the {path} with id of 0</Button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleApiUpdate}
            variant="outline"
            disabled={code === value}
            className="mt-3"
          >
            Update
          </Button>
          <Button
            onClick={handleApiDeletion}
            variant="destructive"
            className="mt-3"
          >
            Delete
          </Button>
        </div>
      </div>
      <div className={`border rounded-sm ${validJson ? "" : "border-red-500"}`}>
        <CodeMirror
          value={code}
          theme={tokyoNight}
          extensions={[json()]}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default ApiEditor;
