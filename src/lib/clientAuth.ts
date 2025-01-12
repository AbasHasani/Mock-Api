import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
});

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data);
};

export const signOut = async () => {
  const data = await authClient.signOut()
};
