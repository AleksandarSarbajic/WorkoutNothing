import { ExerciseType, SuperSetType } from "../types/WorkoutTypes";
import supabase from "./supabase";

interface WorkoutProps {
  workout: {
    end_time: string;
    start_time: string;
    name: string;
    note: string;
    workout_time: string;
    superSets: SuperSetType[];
    exercises: ExerciseType[];
    unit: string;
    last_performed?: string;
    id?: number;
  };
  time?: boolean;
  id?: number;
}

export async function insertTemplate({ workout }: WorkoutProps) {
  const item = {
    name: workout.name,
    note: workout.note,
    superSets: workout.superSets,
    exercises: workout.exercises,
    unit: workout.unit,
    last_performed: new Date().toISOString(),
    type: "custom",
  };

  const { data, error } = await supabase
    .from("Templates")
    .insert([{ ...item }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTemplates() {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await supabase
    .from("Templates")
    .select()
    .eq("user_id", userData?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function deleteTemplate(id: number) {
  const { data, error } = await supabase
    .from("Templates")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTemplate(id: number) {
  if (isNaN(id)) return [];

  const { data, error } = await supabase
    .from("Templates")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTemplate({
  workout,
  id,
  time = false,
}: WorkoutProps) {
  const item = {
    name: workout.name,
    note: workout.note,
    superSets: workout.superSets,
    exercises: workout.exercises,
    unit: workout.unit,
    last_performed: !time ? workout.start_time : new Date().toISOString(),
    type: "custom",
  };

  const { data, error } = await supabase
    .from("Templates")
    .update([{ ...item }])
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
