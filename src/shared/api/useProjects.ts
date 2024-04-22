import { supabase } from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase
      .from("projects")
      .select('*')
      .eq("isPublished", true)
      .order("order", { ascending: true });
  if (error) {
    console.error("Error fetching Projects", error);
    throw new Error;
  }
  return data;
}