import { ExerciseType } from "../types/WorkoutTypes";
import supabase from "./supabase";
import { Database } from "./supabase";
interface GetExercisesProps {
  filter: {
    method?: string;
    fields: string[];
    value: { body?: string[]; category?: string[] };
    search?: string;
  } | null;
}
export async function getExercises({
  filter,
}: GetExercisesProps): Promise<
  Database["public"]["Tables"]["exercises"]["Row"][]
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from("exercises").select();

  if (filter) {
    if (filter.value.body?.length !== 0)
      query = query[filter.method || "eq"](filter.fields[0], filter.value.body);

    if (filter.value.category?.length !== 0)
      query = query[filter.method || "eq"](
        filter.fields[1],
        filter.value.category
      );
    if (filter.search) query = query.ilike("name", `%${filter.search}%`);
  }

  const { data, error } = await query.order("name", { ascending: true });

  if (error) throw new Error("Exercises could not be loaded");

  return data as Database["public"]["Tables"]["exercises"]["Row"][];
}

export async function getExercise(
  id: number
): Promise<Database["public"]["Tables"]["exercises"]["Row"]> {
  const { data, error } = await supabase
    .from("exercises")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error("Exercise could not be loaded");

  return data as Database["public"]["Tables"]["exercises"]["Row"];
}

export async function insertExercises({
  exercises,
}: {
  exercises: ExerciseType[];
}) {
  const changedExercises = exercises.map((exercise) => {
    return {
      exercise_id: exercise.id,
      name: exercise.name,
      uniqueId: exercise.uniqueId,
      time: exercise.time,
      sets: exercise.sets,
      note: exercise.note,
      unit: exercise.unit,
      records: exercise.records,
    };
  });

  const { data, error } = await supabase
    .from("user_exercises")
    .insert(changedExercises)
    .select();
  if (error) throw new Error("Exercise could not be added");

  return data;
}
export async function getUserExercise(id: number) {
  const { data, error } = await supabase
    .from("user_exercises")
    .select()
    .eq("exercise_id", id);
  if (error) throw new Error("Exercise could not be loaded");

  return data;
}
export async function getUserExercises() {
  const { data, error } = await supabase.from("user_exercises").select();

  if (error) throw new Error("Exercises could not be loaded");

  return data;
}

export async function updateUserExercise() {}
