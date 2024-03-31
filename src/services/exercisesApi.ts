import {
  ExerciseType,
  SuperSetType,
  WorkoutSupabase,
} from "../types/WorkoutTypes";
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

export async function insertExercise(exercise: {
  name: string;
  body: string;
  category: string;
}) {
  const updatedExercise = {
    name: exercise.name,
    muscle: exercise.body,
    equipment: exercise.category,
    type: "strength",
    difficulty: "beginner",
  };

  const { data, error } = await supabase
    .from("exercises")
    .insert([updatedExercise])
    .select();

  if (error) throw new Error("Exercise could not be added");

  return data;
}
export async function updateExercise(exercise: {
  name: string;
  body: string;
  category: string;
  id: number;
}) {
  const updatedExercise = {
    name: exercise.name,
    muscle: exercise.body,
    equipment: exercise.category,
  };

  const { data, error } = await supabase
    .from("exercises")
    .update([updatedExercise])
    .eq("id", exercise.id)
    .select();

  if (error) throw new Error("Exercise could not be updated");

  return data;
}

export async function insertExercises({
  exercises,
}: {
  exercises: ExerciseType[];
}) {
  const changedExercises = exercises.map((exercise) => {
    return {
      exercise_id: exercise.real_id,
      name: exercise.name,
      uniqueId: exercise.uniqueId,
      time: exercise.time,
      sets: exercise.sets,
      note: exercise.note,
      unit: exercise.unit,
      records: exercise.records.map((record) => {
        return {
          ...record,
          current: false,
        };
      }),
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
  const { data, error } = await supabase
    .from("user_exercises")
    .select()
    .order("created_at", { ascending: true });

  if (error) throw new Error("Exercises could not be loaded");

  return data;
}

export async function updateUserExercise() {}

export async function deleteExercise(id: number) {
  const { data, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error("User could not be loaded");

  const { data: workoutData, error: workoutError } = await supabase
    .from("Workouts")
    .select()
    .eq("user_id", data.user.id);

  if (workoutError) throw new Error("Workouts could not be loaded");

  const filteredWorkouts = workoutData.map((workout: WorkoutSupabase) => {
    const removedExercises = workout.exercises.filter(
      (exercise: ExerciseType) => exercise.id === id
    );

    const filteredSuperSets = workout.superSets.filter(
      (superSet: SuperSetType) =>
        superSet.items.every(
          (itemId) =>
            !removedExercises.some((exercise) => exercise.uniqueId === itemId)
        )
    );

    const filteredExercises = workout.exercises.filter(
      (exercise: ExerciseType) => exercise.id !== id
    );

    return {
      ...workout,
      exercises: filteredExercises,
      superSets: filteredSuperSets,
    };
  });

  const { error: userExerciseError } = await supabase
    .from("user_exercises")
    .delete()
    .eq("exercise_id", id)
    .eq("user_id", data.user.id);

  if (userExerciseError) throw new Error("Exercise could not be deleted");

  const { error: exerciseError } = await supabase
    .from("exercises")
    .delete()
    .eq("id", id)
    .eq("user_id", data.user.id);

  if (exerciseError) throw new Error("Exercise could not be deleted");

  for (const filteredWorkout of filteredWorkouts) {
    const { error: updateError } = await supabase
      .from("Workouts")
      .update(filteredWorkout)
      .eq("id", filteredWorkout.id);

    if (updateError) {
      throw new Error("Workouts could not be updated");
    }
  }
}
