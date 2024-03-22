import { ExerciseType, SuperSetType } from "../types/WorkoutTypes";
import { countNonNullValues } from "../utils/helpers";
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
    records: number;
  };
  id?: number;
}

export async function insertWorkout({ workout }: WorkoutProps) {
  const filteredRecords = workout.exercises.flatMap((exercise) =>
    exercise.records.filter((record) => record.current)
  );
  const totalCount = countNonNullValues(filteredRecords);
  const item = {
    name: workout.name,
    note: workout.note,
    workout_time: workout.workout_time,
    start_time: workout.start_time,
    end_time: workout.end_time,
    superSets: workout.superSets,
    exercises: workout.exercises.map((exercise) => {
      const changedRecords = exercise.records.map((record) => {
        return {
          ...record,
          current: false,
        };
      });
      return { ...exercise, records: changedRecords, id: exercise.real_id };
    }),
    unit: workout.unit,
    records: totalCount,
  };
  console.log(item);
  const { data, error } = await supabase
    .from("Workouts")
    .insert([{ ...item }])
    .select();

  if (error) {
    throw new Error("Workout could not be added");
  }

  return data;
}

export async function getWorkouts() {
  const { data, error } = await supabase
    .from("Workouts")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Workouts could not be fetched");
  }

  return data;
}

export async function getWorkout(id: number) {
  const { data, error } = await supabase
    .from("Workouts")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Workout could not be fetched");
  }

  return data;
}

export async function deleteWorkout(id: number) {
  const { data, error } = await supabase
    .from("Workouts")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Workout could not be deleted");
  }

  return data;
}
export async function getWorkoutRange({
  startDate = "",
  endDate = "",
}: {
  startDate: string;
  endDate: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from("Workouts").select();

  if (startDate && endDate) {
    query = query
      .lte("end_time", endDate)
      .gte("end_time", startDate)
      .order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Workout could not be fetched");
  }

  return data;
}

export async function updateWorkout({ workout, id }: WorkoutProps) {
  const item = {
    name: workout.name,
    note: workout.note,
    workout_time: workout.workout_time,
    start_time: workout.start_time,
    end_time: workout.end_time,
    superSets: workout.superSets,
    exercises: workout.exercises,
    unit: workout.unit,
  };

  const { data, error } = await supabase
    .from("Workouts")
    .update([{ ...item }])
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Workout could not be updated try again!");
  }

  return data;
}
