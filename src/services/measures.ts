import { SingleMeasure } from "../types/MeasureTableTypes";
import supabase, { Database } from "./supabase";

export async function getMeasures(): Promise<
  Database["public"]["Tables"]["measures"]["Row"][]
> {
  const { data, error } = await supabase.from("measures").select("*");

  if (error) if (error) throw new Error("Measures could not be loaded");
  return data as Database["public"]["Tables"]["measures"]["Row"][];
}

export async function getMeasure(
  field: string
): Promise<Database["public"]["Tables"]["measures"]["Row"]> {
  const { data, error } = await supabase
    .from("measures")
    .select(field)
    .single();

  if (error) {
    throw new Error("Measure could not be loaded");
  }

  if ("error" in data) {
    throw new Error("Measure could not be loaded");
  }

  return data as Database["public"]["Tables"]["measures"]["Row"];
}

interface MeasureObject {
  data_key: string;
  data?: {
    value: number | null;
    added_at: string;
    unit: string | undefined;
  };
}
export async function addMeasure({
  measureObject,
  oldArray,
}: {
  measureObject: MeasureObject;
  oldArray: SingleMeasure[];
}) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  const { data, error } = await supabase
    .from("measures")
    .update([
      {
        [measureObject.data_key]: measureObject.data
          ? [...oldArray, measureObject.data]
          : [...oldArray],
      },
    ])
    .eq("user_id", userData.user.id);

  if (error) throw new Error("Measure could not be inserted");

  return data;
}

export async function createMeasures(id?: string | undefined) {
  if (id === undefined) return null;

  const { data: userData } = await supabase
    .from("measures")
    .select()
    .eq("user_id", id);

  if (userData && userData.length > 0) {
    return null;
  }

  const { data, error } = await supabase
    .from("measures")
    .insert([{ created_at: new Date().toISOString(), user_id: id }])
    .select();

  if (error) throw new Error("Measures could not be created");

  return data;
}
