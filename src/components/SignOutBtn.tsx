"use client";

import { authClient } from "@/lib/clientAuth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const SignOutBtn = () => {
  const router = useRouter();

  const signOut = async (e: any) => {
    await authClient.signOut();
    router.replace("/login");
  };
  return <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>;
};

export default SignOutBtn;
