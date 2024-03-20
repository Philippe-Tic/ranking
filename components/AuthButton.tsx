import { useUserContext } from "@/app/layout";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const { user, setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user: fetchedUsed },
        } = await supabase.auth.getUser();
      } catch (error) {
        return
      }
      setIsLoading(false);
    }
    fetchUser();
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    return redirect("/login");
  };

  if (isLoading) return (<div>Loading...</div>);

  return user ? (
    <div>
      Hey, {user?.user_metadata?.full_name || user?.email}!
      <form action={signOut}>
        <button className="btn btn-primary">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="btn btn-primary"
    >
      Login
    </Link>
  );
}
