import { Button } from "@/components/ui/button";
import { trpc } from "./_trpc/client";
import CreateNew from "@/components/CreateNew";
import { authClient } from "@/lib/clientAuth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className="md:px-10">
      <CreateNew />
    </section>
  );
}
