import { v4 as uuidv4 } from "uuid";
import { BestPerformaceRecordsType, SetType } from "./WorkoutTypes";

export interface TemplateExercise {
  name: string;
  id: number;
  uniqueId: string;
  sets: SetType[];
  records?: BestPerformaceRecordsType[];
}

export interface TemplateTypes {
  created_at?: string;
  name: string;
  exercises: TemplateExercise[];
  last_performed: string;
  id: string | number;
  type: "sample" | "custom";
}

const createExercise = (name: string, id: number): TemplateExercise => ({
  name,
  id,
  uniqueId: uuidv4(),
  sets: Array.from({ length: 2 }, (_, index) => ({
    set: index + 1,
    reps: null,
    weight: null,
    type: "straight",
    id: uuidv4(),
    selected: false,
    uniqueId: uuidv4(),
    previous: null,
  })),
});

const createTemplate = (
  name: string,
  exercises: TemplateExercise[],
  last_performed: string,
  id: string
): TemplateTypes => ({
  name,
  exercises,
  last_performed,
  id: id,
  type: "sample",
});

const Templates: TemplateTypes[] = [
  createTemplate(
    "Chest and Biceps",
    [
      createExercise("Leverage Incline Chest Press", 26),
      createExercise("Machine chest press", 30),
      createExercise("Low-cable cross-over", 17),
      createExercise("Lateral Raise", 168),
      createExercise("Preacher Curl", 169),
      createExercise("Hammer Curls", 5),
    ],
    new Date().toISOString(),
    "018e1e2e-eb53-77ca-aec2-511d1f3b325a"
  ),
  createTemplate(
    "Back and triceps",
    [
      createExercise("Wide grip Lat Pulldown", 172),
      createExercise("T-Bar Row with Handle", 157),
      createExercise("Standing dumbbell shrug", 130),
      createExercise("One-Arm Dumbbell Row", 159),
      createExercise("Weighted pull-up", 110),
      createExercise("Triceps extension", 173),
      createExercise("EZ-Bar Skullcrusher", 142),
    ],
    new Date().toISOString(),
    "018e1e2e-eb53-78c2-a94d-ae497da06e03"
  ),
  createTemplate(
    "Legs",
    [
      createExercise("Romanian Deadlift With Dumbbells", 101),
      createExercise("Leg Press", 170),
      createExercise("Lying Leg Curl", 171),
      createExercise("Thigh adductor", 60),
      createExercise("Standing Calf Raises", 71),
    ],
    new Date().toISOString(),
    "018e1e2e-eb53-7fd6-aa47-5b7c77b8458d"
  ),
];

export default Templates;
