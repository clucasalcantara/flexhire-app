import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
// UI Elements
import { default as ProfileView } from '@/components/Profile';
import FlexhireAPI from "@/lib/flexhire-api";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // FLEXHIRE User Request
  const userData =  await FlexhireAPI.fetchCurrentUserProfile();
  
  console.log({ userData });

  return <ProfileView user={userData} />
}
