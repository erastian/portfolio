import { supabase } from "./supabase";

export async function getContacts() {
  const { data, error } = await supabase
      .from("contacts")
      .select('*')
      .eq("isPublished", true)
      .order("order", { ascending: true });
  if (error) {
    console.error("Error fetching contacts", error);
    throw new Error;
  }
  return data;
}