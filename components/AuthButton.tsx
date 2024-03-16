"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user: fetchedUsed },
      } = await supabase.auth.getUser();
      setUser(fetchedUsed);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (isLoading) return (<div>Loading...</div>);

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user?.user_metadata?.full_name || user?.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
