import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user: fetchedUsed },
        } = await supabase.auth.getUser();
        setUser(fetchedUsed);
      } catch (error) {
        return
      }
      setIsLoading(false);
    }
    fetchUser();
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (isLoading) return (<div>Loading...</div>);

  return user ? (
    <div>
      Hey, {user?.user_metadata?.full_name || user?.email}!
      <form action={signOut}>
        <button>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
    >
      Login
    </Link>
  );
}
