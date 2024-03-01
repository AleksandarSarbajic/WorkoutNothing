import {
  compareAsc,
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  formatDistance,
  isSameDay,
  isSameMonth,
  parse,
  parseISO,
  subDays,
  subMonths,
} from "date-fns";
// import { differenceInDays } from "date-fns/esm";
import { Database } from "../services/supabase";
import {
  BestPerformaceRecordsType,
  BestPerformaceType,
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

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const compareTimes = (time1: string | null) => {
  if (time1 === null) {
    return 0;
  }

  const currentDate = new Date();
  const date = parse(time1, "HH:mm:ss", new Date());

  const comparisonResult = compareAsc(date, currentDate);

  return comparisonResult;
};
export function sortByStatus(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"]
) {
  if (a.status === "completed" && b.status === "incomplete") {
    return 1;
  } else if (a.status === "incomplete" && b.status === "completed") {
    return -1;
  } else {
    return 0;
  }
}
export function sortByName(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  type: boolean
) {
  if (type) {
    return a.task_name.localeCompare(b.task_name);
  } else {
    if (a.task_name > b.task_name) {
      return -1;
    } else if (a.task_name < b.task_name) {
      return 1;
    } else {
      return 0;
    }
  }
}

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

export function sortByDueDate(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  ascending: boolean = true
) {
  const timestampA = calculateTimestamp(a.due_date, a.end_time);
  const timestampB = calculateTimestamp(b.due_date, b.end_time);

  return ascending ? timestampA - timestampB : timestampB - timestampA;
}

function calculateTimestamp(date: string | null, time: string | null): number {
  const combinedDateTime = date && time ? `${date}T${time}` : null;
  return combinedDateTime ? parseISO(combinedDateTime).getTime() : 0;
}

export function sortByPriority(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  settings?: Database["public"]["Tables"]["settings"]["Row"],
  type?: boolean
) {
  if (settings?.primaryTaskOnTop) {
    return comparePriority(a.priority, b.priority);
  } else {
    if (type) {
      return comparePriority(a.priority, b.priority);
    } else {
      return comparePriority(b.priority, a.priority);
    }
  }
}

function comparePriority(
  priorityA: boolean | null,
  priorityB: boolean | null
): number {
  if (priorityA === null && priorityB === null) {
    return 0;
  } else if (priorityA === null) {
    return 1;
  } else if (priorityB === null) {
    return -1;
  } else {
    return priorityA ? -1 : priorityB ? 1 : 0;
  }
}

export function sortByProgress(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  tasks: Database["public"]["Tables"]["Tasks"]["Row"][],
  completedStatus: string = "completed",
  descending: boolean = false
): number {
  const calculateProgress = (
    task: Database["public"]["Tables"]["Tasks"]["Row"]
  ): number => {
    const numberOfTasks = tasks.filter((t) => t.category === task.category);
    const completed = numberOfTasks.filter(
      (item) => item.status === completedStatus
    );
    return (completed.length / numberOfTasks.length) * 100;
  };

  const progressA = calculateProgress(a);
  const progressB = calculateProgress(b);

  return (progressB - progressA) * (descending ? -1 : 1);
}

export function sortByCategory(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  descending: boolean
): number {
  const categoryA = a.category || "";
  const categoryB = b.category || "";

  return descending
    ? categoryB.localeCompare(categoryA)
    : categoryA.localeCompare(categoryB);
}

export function analyticsInterval(numIntervals: number, type: string = "days") {
  if (type === "month") {
    const allMonths = eachMonthOfInterval({
      start: subMonths(new Date(), numIntervals - 1),
      end: new Date(),
    });

    return allMonths;
  } else {
    const allDates = eachDayOfInterval({
      start: subDays(new Date(), numIntervals - 1),
      end: new Date(),
    });
    return allDates;
  }
}

export function completedTasksForInterval(
  completedArray: string[] | null,
  numIntervals: number,
  type: string = "days"
) {
  const intervalStart =
    type === "month"
      ? subMonths(new Date(), numIntervals - 1)
      : subDays(new Date(), numIntervals - 1);
  const allIntervals =
    type === "month"
      ? eachMonthOfInterval({ start: intervalStart, end: new Date() })
      : eachDayOfInterval({ start: intervalStart, end: new Date() });

  const completedTasksPerInterval: number[] = allIntervals.map((interval) => {
    const tasksCompletedInInterval = completedArray
      ? completedArray.filter((completedDate) => {
          const completedDateObj = new Date(completedDate);
          return type === "month"
            ? isSameMonth(completedDateObj, interval)
            : isSameDay(completedDateObj, interval);
        })
      : [];

    return tasksCompletedInInterval.length;
  });

  return completedTasksPerInterval;
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
    return +(weight / (1.0278 - 0.0278 * reps)).toFixed(2);
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
