"use client";
import React, { useState } from "react";
import { Tabs } from "./Tabs";
import AiGeneratedJson from "./AIGeneratedJson";
import ManualJson from "./ManualJson";
import { motion } from "motion/react";

const CreateNew = () => {
  const [tab, setTab] = useState("AI");
  return (
    <div className="p-2 rounded-sm shadow min-w-[25rem]">
      <Tabs tab={tab} setTab={setTab} />
      <motion.div
        key={tab} // Ensures a new motion.div is rendered when the tab changes
        initial={{ opacity: 0, x: -10 }} // Start at 0 opacity
        animate={{ opacity: 1, x: 0 }} // Animate to 1 opacity
        exit={{ opacity: 0, x: -10 }} // Optional: fade out if the component is removed
        transition={{ duration: 0.5 }} // Control animation speed
      >
        {tab === "AI" ? <AiGeneratedJson /> : <ManualJson />}
      </motion.div>
    </div>
  );
};

export default CreateNew;
