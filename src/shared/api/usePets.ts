import { supabase } from "./supabase";

export async function getPets() {
  const { data, error } = await supabase
      .from("pets")
      .select('*')
      .eq("isPublished", true)
      .order("order", { ascending: true });
  if (error) {
    console.error("Error fetching skills", error);
    throw new Error;
  }
  return data;
}