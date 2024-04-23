import {
  compareAsc,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  format,
  formatDistance,
  isSameDay,
  isSameWeek,
  parse,
  parseISO,
  subDays,
  subWeeks,
} from "date-fns";
// import { differenceInDays } from "date-fns/esm";
import { Database } from "../services/supabase";
import { v4 as uuidv4 } from "uuid";
import {
  BestPerformaceRecordsType,
  ExerciseType,
  SetType,
  WorkoutSupabase,
} from "../types/WorkoutTypes";

// We want to make this function work for both Date objects and strings (which come from Supabase)
// export const subtractDates = (
//   dateStr1: string | null,
//   dateStr2: string | null
// ) => differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export function isSameAsCurrentDate(dateToCheck: string | null): boolean {
  if (dateToCheck === null) {
    return false;
  }
  const currentDate = new Date();
  const parsedDateToCheck = parseISO(dateToCheck);

  return isSameDay(parsedDateToCheck, currentDate);
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
interface Options {
  end?: boolean;
}

export const formatTime = (timeString: string | null) => {
  if (timeString === null) {
    return timeString;
  }
  const date = new Date(`2000-01-01T${timeString}`);
  return format(date, "h:mm a");
};

export const getToday = function (options: Options = {}): string {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase because it is not at 0.0.0.0,
  // so we need to set the date to be END of the day when we compare it with earlier dates
  if (options && options.end) {
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};
export function formatTimeToDate(time: string) {
  const [hours, minutes, seconds] = time.split(":");

  const currentDate = new Date();
  currentDate.setHours(Number(hours));
  currentDate.setMinutes(Number(minutes));
  currentDate.setSeconds(Number(seconds));

  return currentDate;
}

export const compareTimes = (time1: string | null) => {
  if (time1 === null) {
    return 0;
  }

  const currentDate = new Date();
  const date = parse(time1, "HH:mm:ss", new Date());

  const comparisonResult = compareAsc(date, currentDate);

  return comparisonResult;
};

interface SortByAddedAtProps {
  value: string;
  added_at: string;
  unit: string;
  id: string;
}

export function sortByAddedAt(a: SortByAddedAtProps, b: SortByAddedAtProps) {
  const dateA = a.added_at ? new Date(a.added_at).getTime() : 0;
  const dateB = b.added_at ? new Date(b.added_at).getTime() : 0;

  return dateA - dateB;
}

export function analyticsInterval(numIntervals: number) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numIntervals - 1),
    end: new Date(),
  });
  return allDates;
}

export function workoutsForInterval(
  workouts: WorkoutSupabase[],
  numIntervals: number
) {
  const intervalStart = subDays(new Date(), numIntervals - 1);
  const allIntervals = eachDayOfInterval({
    start: intervalStart,
    end: new Date(),
  });

  const completedTasksPerInterval: number[] = allIntervals.map((interval) => {
    const tasksCompletedInInterval = workouts
      ? workouts.filter((completedDate) => {
          const completedDateObj = new Date(completedDate.end_time);
          return isSameDay(completedDateObj, interval);
        })
      : [];

    return tasksCompletedInInterval.length;
  });

  return completedTasksPerInterval;
}

export function workoutsForLast7Weeks(workouts: WorkoutSupabase[]) {
  const last7WeeksStartDates = eachWeekOfInterval({
    start: subWeeks(new Date(), 6),
    end: new Date(),
  });

  const completedTasksPerWeek = last7WeeksStartDates.map((weekStartDate) => {
    const weekEndDate = endOfWeek(weekStartDate);

    const tasksCompletedInWeek = workouts
      ? workouts.filter((workout) => {
          const completedDateObj = new Date(workout.end_time);
          return isSameWeek(completedDateObj, weekStartDate);
        })
      : [];

    return {
      workouts: tasksCompletedInWeek.length,
      startDate: format(new Date(weekStartDate), "M"),
      endDate: format(new Date(weekEndDate), "d"),
    };
  });

  return completedTasksPerWeek;
}

export const getParamsArray = (param: string) => param.split(",");

export function adjustMeasurement(
  value: string | number,
  unit: string,
  settings: Database["public"]["Tables"]["settings"]["Row"] | undefined
) {
  let adjustedValue = value;
  let adjustedUnit = unit;

  if (settings?.weight === "lbs" && unit === "kg") {
    adjustedValue = (Number(value) * 2.20462).toFixed(1);
    adjustedUnit = "lbs";
  }
  if (settings?.weight === "kg" && unit === "lbs") {
    adjustedValue = (Number(value) / 2.20462).toFixed(1);
    adjustedUnit = "kg";
  }
  if (settings?.size === "cm" && unit === "in") {
    adjustedValue = (Number(value) / 0.393701).toFixed(1);
    adjustedUnit = "cm";
  }
  if (settings?.size === "in" && unit === "cm") {
    adjustedValue = (Number(value) * 0.393701).toFixed(1);
    adjustedUnit = "in";
  }

  return { value: adjustedValue, unit: adjustedUnit };
}

export function formatTimeWorkout(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}

export function convertSecondsToTime(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

export function calculateTotalWeightLifted({
  workout,
  exercises,
}: {
  workout?: WorkoutSupabase;
  exercises?: ExerciseType[];
}) {
  if (workout)
    return workout.exercises.map((exercise) => {
      const weight = exercise.sets.reduce(
        (acc, set) => acc + (set.reps ?? 0) * (set.weight ?? 0),
        0
      );
      return weight;
    });
  if (exercises)
    return exercises.map((exercise) => {
      const weight = exercise.sets.reduce(
        (acc, set) => acc + (set.reps ?? 0) * (set.weight ?? 0),
        0
      );
      return weight;
    });
}

export const totalWeightLiftedBySet = ({
  workout,
  exercises,
}: {
  workout?: WorkoutSupabase;
  exercises?: ExerciseType[];
}): number[][] => {
  const totalWeights: number[][] = [];

  if (workout)
    workout.exercises.forEach((exercise) => {
      const exerciseWeights: number[] = [];

      exercise.sets.forEach((set) => {
        const weight: number = (set.reps ?? 0) * (set.weight ?? 0);
        exerciseWeights.push(weight);
      });

      totalWeights.push(exerciseWeights);
    });

  if (exercises)
    exercises.forEach((exercise) => {
      const exerciseWeights: number[] = [];

      exercise.sets.forEach((set) => {
        const weight: number = (set.reps ?? 0) * (set.weight ?? 0);
        exerciseWeights.push(weight);
      });

      totalWeights.push(exerciseWeights);
    });

  return totalWeights;
};

export const findIndexOfHighestItem = (arr: number[][]): number[] => {
  const maxIndexes: number[] = [];

  arr.forEach((innerArray) => {
    let maxIndex = 0;
    let maxValue = innerArray[0];

    for (let i = 1; i < innerArray.length; i++) {
      if (innerArray[i] > maxValue) {
        maxValue = innerArray[i];
        maxIndex = i;
      }
    }

    maxIndexes.push(maxIndex);
  });

  return maxIndexes;
};

export const oneRepMax = (weight: number | null, reps: number | null) => {
  if (reps !== null && weight !== null) {
    return Math.round(+(weight * (1 + 0.0333 * reps)).toFixed(2));
  }
  return null;
};

export const findHighestWeight = (exercise: ExerciseType) => {
  let highestWeight = 0;
  exercise.sets.forEach((set) => {
    if (set.weight !== null && set.weight > highestWeight) {
      highestWeight = set.weight;
    }
  });
  return highestWeight;
};

export const findBestSetOneRepMax = (exercise: ExerciseType) => {
  let bestSetOneRepMax = 0;
  exercise.sets.forEach((set) => {
    const oneRepMaxs = oneRepMax(set.weight, set.reps);
    if (oneRepMaxs !== null && oneRepMaxs > bestSetOneRepMax) {
      bestSetOneRepMax = oneRepMaxs;
    }
  });
  return bestSetOneRepMax;
};

export const findBestSetForOneRepMax = (
  exercise: ExerciseType
): { set: SetType | null; oneRep: number } => {
  let bestSet = null;

  let bestSetOneRepMax = 0;
  exercise.sets.forEach((set) => {
    const oneRepMaxs = oneRepMax(set.weight, set.reps);
    if (oneRepMaxs !== null && oneRepMaxs > bestSetOneRepMax) {
      bestSetOneRepMax = oneRepMaxs;
      bestSet = set;
    }
  });
  return { set: bestSet, oneRep: bestSetOneRepMax };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findBestSet(sets: any[]): SetType | null {
  let bestSet = null;
  let maxProduct = Number.MIN_VALUE;

  sets.forEach((set) => {
    const product = set.weight * set.reps;
    if (product > maxProduct) {
      maxProduct = product;
      bestSet = set;
    }
  });

  return bestSet;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findBestWeightSet(sets: SetType[]): SetType | null {
  if (sets.length === 0) return null; // handle empty sets array

  let bestSet = sets[0]; // initialize with the first set
  let maxWeight = bestSet.weight ?? Number.NEGATIVE_INFINITY;

  for (let i = 1; i < sets.length; i++) {
    const currentWeight = sets[i].weight ?? 0;
    if (currentWeight > maxWeight) {
      maxWeight = currentWeight;
      bestSet = sets[i];
    }
  }

  return bestSet;
}

export function findBestRepsForEachItem(
  user_exercise: ExerciseType[]
): number[] {
  const findHighestReps = (sets: SetType[]): number => {
    let highestReps = 0;
    sets.forEach((set) => {
      if (set.reps && set.reps > highestReps) {
        highestReps = set.reps;
      }
    });
    return highestReps;
  };

  return user_exercise.map((item: ExerciseType) => {
    if (item.sets.length === 0) return 0;
    return findHighestReps(item.sets);
  });
}

export function calculateBestOneRepMaxForEachItem(
  user_exercise: ExerciseType[]
) {
  return user_exercise.map((exercise) => {
    const sets = exercise.sets;
    const oneRepMaxes = sets
      .map((set) => oneRepMax(set.weight, set.reps))
      .filter((value): value is number => value !== null);
    return Math.max(...oneRepMaxes);
  });
}

export function groupExercises(userExercises: ExerciseType[]): {
  [exerciseId: string]: ExerciseType[];
} {
  return userExercises.reduce((acc, exercise) => {
    acc[exercise.exercise_id!] = acc[exercise.exercise_id!] || [];
    acc[exercise.exercise_id!].push(exercise);
    return acc;
  }, {} as { [exerciseId: string]: ExerciseType[] });
}

export function findClosestExercises(groupedExercises: {
  [exerciseId: string]: ExerciseType[];
}): ExerciseType[] {
  return Object.values(groupedExercises).map((exercises) => {
    exercises.sort((a, b) => {
      const dateA = new Date(a.created_at || "").getTime();
      const dateB = new Date(b.created_at || "").getTime();
      const diffA = Math.abs(dateA - new Date().getTime());
      const diffB = Math.abs(dateB - new Date().getTime());
      return diffA - diffB;
    });
    return exercises[0];
  });
}

export function findBestRecordByProperty(
  records: BestPerformaceRecordsType[],
  property: keyof BestPerformaceRecordsType
): BestPerformaceRecordsType | null {
  let bestRecord = null;
  let maxValue = Number.MIN_VALUE;

  records.forEach((record) => {
    const item = record[property];
    if (
      item !== null &&
      typeof item === "object" &&
      "value" in item &&
      typeof item.value === "number" &&
      item.value > maxValue
    ) {
      maxValue = item.value;
      bestRecord = record;
    }
  });

  return bestRecord;
}

export function countNonNullValues(
  records: BestPerformaceRecordsType[]
): number {
  // Count non-null RM, VOLUME, and WEIGHT values for each record
  const counts = records.map((record) => {
    let count = 0;
    if (record.RM !== null) count++;
    if (record.volume !== null) count++;
    if (record.weight !== null) count++;
    return count;
  });

  // Sum up the counts
  const totalCount = counts.reduce((total, count) => total + count, 0);

  return totalCount;
}

export function generateNumericUUID() {
  const uuid = uuidv4();
  // Remove dashes and convert to a base 10 number
  const numericUUID = parseInt(uuid.replace(/-/g, ""), 16);
  return numericUUID;
}
