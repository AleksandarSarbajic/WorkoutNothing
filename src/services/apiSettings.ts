import supabase, { Database } from "./supabase";

export async function getSettings(): Promise<
  Database["public"]["Tables"]["settings"]["Row"]
> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data as Database["public"]["Tables"]["settings"]["Row"];
}

interface UpdateSettingProps {
  [x: number]: string | number | boolean | null;
}

export async function updateSetting(newSetting: UpdateSettingProps) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("user_id", userData.user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
