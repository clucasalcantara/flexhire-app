import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import AuthButton from "./AuthButton";

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
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <span className="uppercase bold text-xl">Flexhire</span>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
}
