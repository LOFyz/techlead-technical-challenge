import { createAuthClient } from "better-auth/react";

const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3001",
});

export const authClient: any = client;
export const signIn: any = client.signIn;
export const signOut: any = client.signOut;
export const signUp: any = client.signUp;
export const useSession: any = client.useSession;
