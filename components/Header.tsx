import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import AuthButton from "./AuthButton";
import Link from "next/link";

export default function Header() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full px-6 lg:px-32 flex justify-between items-center p-3 text-sm">
        <Link href='/'>
          <span className="uppercase bold text-xl">Flexhire</span>
        </Link>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
}
