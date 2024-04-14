import { supabase } from "./supabase";

export async function getSkills() {
  const { data, error } = await supabase
      .from("skills")
      .select(`*, techDetails(*)`)
      .eq("isPublished", true)
      .order("order", { ascending: true });
  if (error) {
    console.error("Error fetching skills", error);
    throw new Error;
  }
  return data;
}