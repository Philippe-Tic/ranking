"use client"

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const signIn = async () =>  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${origin}/auth/callback`
    }
  });

  return (
    <div>
      <Link
        href="/"
      >
        Back
      </Link>

      <button
        type="button"
        onClick={signIn}
      >
          Sign In
      </button>
      {searchParams?.message && (
        <p>
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
