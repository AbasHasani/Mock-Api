"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/clientAuth";
import React from "react";

const Login = () => {
  return (
    <div className="bg-slate-900 p-5 rounded-sm max-w-[20rem] mx-auto flex flex-col items-center justify-center gap-3">
      <h1 className="text-center">To Start using our services you should be logged in</h1>
      <Button onClick={signInWithGoogle}>Login</Button>
    </div>
  );
};

export default Login;
