"use client";
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { json } from "@codemirror/lang-json";
import useManualJson from "@/store/manualJson";
import { useAIJson } from "@/store/aiJson";

function Editor({
  content,
  generatorType,
}: {
  content?: string;
  generatorType: "ai" | "manual";
}) {
  const manualValue = useManualJson((state) => state.json);
  const changeManualValue = useManualJson((state) => state.changeJson);
  const ManualValid = useManualJson((state) => state.isValidJson);
  const changeManualValid = useManualJson((state) => state.changeIsValidJson);

  const aiValue = useAIJson((state) => state.json);
  const changeAiValue = useAIJson((state) => state.changeJson);
  const aiValid = useAIJson((state) => state.isValidJson);
  const changeAiValid = useAIJson((state) => state.changeIsValidJson);

  const value = generatorType == "ai" ? aiValue : manualValue;
  const [isValidJson, setIsValidJson] = useState(
    generatorType == "ai" ? false : true
  );
  const onChange = React.useCallback((val: any, viewUpdate: any) => {
    generatorType == "ai" ? changeAiValue(val) : changeManualValue(val);
  }, []);
  useEffect(() => {
    try {
      JSON.parse(value);
      generatorType == "ai" ? changeAiValid(true) : changeManualValid(true);
    } catch (error) {
      generatorType == "ai" ? changeAiValid(false) : changeManualValid(false);
    }
  }, [value]);
  return (
    <div
      className={`border rounded-sm ${
        (generatorType == "ai" ? aiValid : ManualValid) ? "" : "border-red-700"
      }`}
    >
      <CodeMirror
        value={value}
        theme={tokyoNight}
        extensions={[json()]}
        onChange={onChange}
      />
    </div>
  );
}
export default Editor;
