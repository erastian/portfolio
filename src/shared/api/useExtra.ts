import { supabase } from "./supabase";

export async function getExtra() {
  const { data, error } = await supabase
      .from("extra")
      .select('*')
      .eq("isPublished", true)
      .order("order", { ascending: true });
  if (error) {
    console.error("Error fetching Extra", error);
    throw new Error;
  }
  return data;
}