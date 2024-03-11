import { v4 as uuidv4 } from "uuid";
import { TemplateTypes } from "./TemplateTypes";
import { adjustMeasurement } from "../utils/helpers";
import { Database } from "../services/supabase";

export interface NoteType {
  id: string | number;
  uniqueId: string;
  value: string;
  isOpen: boolean;
  isPinned: boolean;
  type: "workout" | "exercise" | "set" | string;
}

export interface BestPerformaceRecordsTypeObject {
  value: number;
  setId: string;
}

export interface BestPerformaceRecordsType {
  weight: BestPerformaceRecordsTypeObject;
  volume: BestPerformaceRecordsTypeObject;
  RM: BestPerformaceRecordsTypeObject;
  at: string;
  id: string;
  unit: string;
  current?: boolean;
}

export interface ExerciseType {
  exercise_id?: number;
  created_at?: string | number | Date;
  sets: SetType[];
  previousSets: SetType[];
  id: number;
  name: string;
  uniqueId: string;
  note: NoteType;
  time: { value: number | null; isOpen: boolean; enable: boolean };
  unit: string;
  records: BestPerformaceRecordsType[];
}

export interface SetType {
  id: string;
  uniqueId: string;
  reps: number | null;
  weight: number | null;
  previous: string | null;
  set: number | null;
  type: "straight" | "warmup" | "drop" | "failure";
  selected: boolean;
}

export interface WorkoutSupabase {
  id: number;
  created_at: string;
  end_time: string;
  start_time: string;
  name: string;
  note: string;
  workout_time: string;
  superSets: SuperSetType[];
  exercises: ExerciseType[];
  unit: string;
  records: number;
}

export interface SuperSetType {
  items: string[];
  color: string;
  id: string;
}

export interface BestPerformaceType {
  reps: number;
  maxWeight: number;
  exercise: ExerciseType;
  id: string;
  name?: string;
}

export interface InitialStateType {
  id?: number;
  exercises: ExerciseType[];
  selectedExercises: ExerciseType[];
  superSets: SuperSetType[];
  selectedSuperSets: string[];
  status: "idle" | "running" | "success" | "error" | string;
  name: string;
  start_time: string;
  end_time: string;
  workout_time: number | string;
  timer: boolean;
  open: boolean;
  selectIsOpen: boolean;
  note: string;
  unit: string;
  edit: boolean;
  template: boolean;
  templateId?: number;
}

export const SuperSetsColors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "cyan",
  "magenta",
  "teal",
  "maroon",
  "navy",
  "olive",
  "gray",
  "black",
  "white",
  "silver",
  "gold",
  "indigo",
];

export interface ActionType {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export const InitialState: InitialStateType = {
  exercises: [],
  selectedExercises: [],
  superSets: [],
  selectedSuperSets: [],
  status: "idle",
  name: "Workout",
  start_time: "",
  end_time: "",
  workout_time: 0,
  timer: false,
  open: false,
  selectIsOpen: false,
  note: "",
  unit: "kg",
  edit: false,
  template: false,
};

export const ActionTypes = {
  START_WORKOUT: "START_WORKOUT",
  PERFORM_AGAIN: "PERFORM_AGAIN",
  START_TEMPLATE: "START_TEMPLATE",
  EDIT_TEMPLATE: "EDIT_TEMPLATE",
  CREATE_TEMPLATE: "CREATE_TEMPLATE",
  END_WORKOUT: "END_WORKOUT",
  EDIT_WORKOUT: "EDIT_WORKOUT",
  ADD_EXERCISE: "ADD_EXERCISE",
  OPEN_CLOSE: "OPEN_CLOSE",
  CHANGE_NAME: "CHANGE_NAME",
  CHANGE_NOTE: "CHANGE_NOTE",
  RESTART_WORKOUT: "RESTART_WORKOUT",
  CLOSE_SELECT_EXERCISE: "CLOSE_SELECT_EXERCISE",
  SELECT_EXERCISES: "SELECT_EXERCISES",
  SELECT_EXERCISE: "SELECT_EXERCISE",
  ADD_SET: "ADD_SET",
  REMOVE_EXERCISE: "REMOVE_EXERCISE",
  REPLACE_EXERCISE: "REPLACE_EXERCISE",
  UPDATE_SET: "UPDATE_SET",
  DELETE_SET: "DELETE_SET",
  UPDATE_PREVIOUS: "UPDATE_PREVIOUS",
  UPDATE_TIME: "UPDATE_TIME",
  CREATE_SUPER_SET: "CREATE_SUPER_SET",
};

export type ActionTypes = (typeof ActionTypes)[keyof typeof ActionTypes];

interface AddSetPayload {
  exerciseId: string;
  set: SetType;
}

interface UpdateSetPayload {
  setId: string;
  exerciseId: string;
  type?: SetType["type"];
  weight?: number | null;
  reps?: number | null;
  select?: boolean;
}

interface ChangeNotePayload {
  type: "workout" | "exercise";
  id: string;
  note?: string;
  open?: boolean;
  pin?: boolean;
}

export function WORKOUT_REDUCER(
  state: InitialStateType,
  action: ActionType
): InitialStateType {
  switch (action.type) {
    case ActionTypes.START_WORKOUT:
      return startWorkout(state, action.payload);
    case ActionTypes.PERFORM_AGAIN:
      return performWorkoutAgain(state, action.payload);
    case ActionTypes.START_TEMPLATE:
      return startTemplate(state, action.payload);
    case ActionTypes.EDIT_TEMPLATE:
      return editTemplate(state, action.payload);
    case ActionTypes.CREATE_TEMPLATE:
      return createTemplate();
    case ActionTypes.EDIT_WORKOUT:
      return editWorkout(state, action.payload);
    case ActionTypes.END_WORKOUT:
      return endWorkout();
    case ActionTypes.RESTART_WORKOUT:
      return { ...InitialState };
    case ActionTypes.OPEN_CLOSE:
      return openClose(state, action.payload);
    case ActionTypes.ADD_EXERCISE:
      return addExercise(state);
    case ActionTypes.SELECT_EXERCISES:
      return selectExercises(state, action.payload);
    case ActionTypes.SELECT_EXERCISE:
      return selectExercise(state, action.payload);
    case ActionTypes.CLOSE_SELECT_EXERCISE:
      return closeSelectExercise(state);
    case ActionTypes.CHANGE_NAME:
      return changeName(state, action.payload);
    case ActionTypes.CHANGE_NOTE:
      return changeNote(state, action.payload);
    case ActionTypes.ADD_SET:
      return addSet(state, action.payload);
    case ActionTypes.REMOVE_EXERCISE:
      return removeExercise(state, action.payload);
    case ActionTypes.REPLACE_EXERCISE:
      return replaceExercise(state, action.payload);
    case ActionTypes.UPDATE_SET:
      return updateSet(state, action.payload);
    case ActionTypes.DELETE_SET:
      return deleteSet(state, action.payload);
    case ActionTypes.UPDATE_PREVIOUS:
      return updatePreviousSet(state, action.payload);
    case ActionTypes.UPDATE_TIME:
      return updateTime(state, action.payload);
    case ActionTypes.CREATE_SUPER_SET:
      return createSuperSet(state, action.payload);

    default:
      return state;
  }
}

function startWorkout(
  _: InitialStateType,
  payload: { unit: string }
): InitialStateType {
  const unit = payload.unit;
  return {
    ...InitialState,
    status: "running",
    open: true,
    start_time: new Date().toISOString(),
    unit,
  };
}

function performWorkoutAgain(_: InitialStateType, payload: WorkoutSupabase) {
  const { exercises, name, note, superSets, unit } = payload;

  return {
    ...InitialState,
    exercises: exercises.map((exercise) => {
      return {
        ...exercise,
        sets: exercise.sets.map((set) => {
          return { ...set, id: uuidv4() };
        }),
        previousSets: exercise.sets.map((set) => {
          return {
            ...set,
            id: uuidv4(),
          };
        }),
      };
    }),
    name: name,
    note: note,
    superSets,
    unit,
    status: "running",
    open: true,
    start_time: new Date().toISOString(),
  };
}

function startTemplate(
  _: InitialStateType,
  payload: {
    item: TemplateTypes;
    unit: string;
    settings: Database["public"]["Tables"]["settings"]["Row"];
  }
) {
  const { item, unit, settings } = payload;

  return {
    ...InitialState,
    exercises: item.exercises.map((exercise) => {
      return {
        ...exercise,
        note: {
          id: exercise.id,
          uniqueId: uuidv4(),
          value: "",
          isOpen: false,
          isPinned: false,
          type: "exercise",
        },
        sets: exercise.sets.map((set) => {
          return {
            ...set,
            id: uuidv4(),
            weight: +adjustMeasurement(set.weight ?? 0, unit, settings).value,
          };
        }),
        previousSets: exercise.sets,
        time: { value: 300, isOpen: false, enable: false },
        unit: unit,
        records: exercise.records || [],
      };
    }),
    name: item.name,
    status: "running",
    open: true,
    start_time: new Date().toISOString(),
    unit: unit,
    templateId: +item.id,
  };
}

function editTemplate(
  _: InitialStateType,
  payload: { item: TemplateTypes; unit: string }
) {
  const { item, unit } = payload;

  return {
    ...InitialState,
    exercises: item.exercises.map((exercise) => {
      return {
        ...exercise,
        note: {
          id: exercise.id,
          uniqueId: uuidv4(),
          value: "",
          isOpen: false,
          isPinned: false,
          type: "exercise",
        },
        previousSets: exercise.sets,
        time: { value: 300, isOpen: false, enable: false },
        unit: unit,
        records: exercise.records || [],
      };
    }),
    name: item.name,
    status: "running",
    template: true,
    edit: true,
    open: true,
    start_time: item.created_at!,
    unit: unit,
    id: +item.id,
  };
}

function createTemplate() {
  return {
    ...InitialState,
    template: true,
    status: "running",
    open: true,
  };
}

function editWorkout(
  _: InitialStateType,
  payload: WorkoutSupabase
): InitialStateType {
  const {
    exercises,
    name,
    note,
    superSets,
    unit,
    start_time,
    end_time,
    workout_time,
    id,
  } = payload;

  return {
    ...InitialState,
    exercises: exercises.map((exercise) => {
      return {
        ...exercise,
        previousSets: exercise.sets,
      };
    }),
    name: name,
    note: note,
    superSets,
    unit,
    status: "running",
    open: true,
    start_time,
    end_time,
    edit: true,
    workout_time,
    id,
  };
}

function endWorkout() {
  return InitialState;
}

function openClose(
  state: InitialStateType,
  payload?: boolean
): InitialStateType {
  return { ...state, open: payload !== undefined ? payload : !state.open };
}

function addExercise(state: InitialStateType): InitialStateType {
  return {
    ...state,
    exercises: [...state.exercises, ...state.selectedExercises],
    selectedExercises: [],
    selectIsOpen: !state.selectIsOpen,
  };
}

function selectExercises(
  state: InitialStateType,
  payload: ExerciseType
): InitialStateType {
  const existingExercise = state.selectedExercises.find(
    (item) => item.id === payload.id
  );
  const selectedExercises = existingExercise
    ? state.selectedExercises.filter((item) => item.id !== payload.id)
    : [...state.selectedExercises, payload];

  return { ...state, selectedExercises };
}

function selectExercise(
  state: InitialStateType,
  payload: ExerciseType
): InitialStateType {
  const existingExercise = state.selectedExercises.find(
    (item) => item.id === payload.id
  );
  const selectedExercises = existingExercise
    ? state.selectedExercises.filter((item) => item.id !== payload.id)
    : [payload];

  return { ...state, selectedExercises };
}

function closeSelectExercise(state: InitialStateType): InitialStateType {
  return { ...state, selectedExercises: [], selectIsOpen: !state.selectIsOpen };
}

function changeName(
  state: InitialStateType,
  payload: string
): InitialStateType {
  return { ...state, name: payload };
}

function changeNote(
  state: InitialStateType,
  payload: ChangeNotePayload
): InitialStateType {
  const { type, id, note, open, pin } = payload;
  if (type === "workout") {
    return { ...state, note: note || "" };
  }

  const updatedExercises = state.exercises.map((item) => {
    if (item.note.uniqueId === id) {
      const updatedNote = {
        ...item.note,
        isOpen: open !== undefined ? open : item.note.isOpen,
      };
      if (note !== undefined) updatedNote.value = note;
      if (pin !== undefined) updatedNote.isPinned = pin;
      return { ...item, note: updatedNote };
    }
    return item;
  });

  return { ...state, exercises: updatedExercises };
}

function addSet(
  state: InitialStateType,
  payload: AddSetPayload
): InitialStateType {
  const { exerciseId, set } = payload;

  const existingExercise = state.exercises.find(
    (item) => item.uniqueId === exerciseId
  );

  if (existingExercise && set.set !== null) {
    const existingSet = existingExercise?.previousSets[set?.set - 1] || null;
    const allSetsAreNull = existingExercise.sets.every(
      (item) => item.type === "warmup"
    );

    if (existingSet) {
      const updateExercisesPrevious = state.exercises.map((exercise) => {
        if (exercise.uniqueId === exerciseId) {
          const existingSetChanged = {
            ...existingSet,
            set: allSetsAreNull ? 1 : existingSet.set,
            id: uuidv4(),
          };

          return { ...exercise, sets: [...exercise.sets, existingSetChanged] };
        }
        return exercise;
      });
      return { ...state, exercises: updateExercisesPrevious };
    } else {
      const updatedExercises = state.exercises.map((exercise) => {
        if (exercise.uniqueId === exerciseId) {
          return { ...exercise, sets: [...exercise.sets, set] };
        }
        return exercise;
      });

      return { ...state, exercises: updatedExercises };
    }
  }

  return state;
}

function removeExercise(
  state: InitialStateType,
  payload: string
): InitialStateType {
  return {
    ...state,
    exercises: state.exercises.filter(
      (exercise) => exercise.uniqueId !== payload
    ),
  };
}

function replaceExercise(
  state: InitialStateType,
  payload: string
): InitialStateType {
  const indexOfItem = state.exercises.findIndex(
    (item) => item.uniqueId === payload
  );
  const filteredExercises = state.exercises.filter(
    (item) => item.uniqueId !== payload
  );
  const exercise = state.selectedExercises[0];
  filteredExercises.splice(indexOfItem, 0, exercise);
  return { ...state, exercises: filteredExercises, selectIsOpen: false };
}

function deleteSet(
  state: InitialStateType,
  payload: { setId: string; exerciseId: string }
): InitialStateType {
  const { exerciseId, setId } = payload;

  const updatedExercises = state.exercises.map((exercise) => {
    if (exercise.uniqueId === exerciseId) {
      const updatedSets = exercise.sets.reduce((acc, item) => {
        if (item.id !== setId) {
          acc.push(item);
        }
        return acc;
      }, [] as SetType[]);
      const curIndex = exercise.sets.findIndex((seted) => seted.id === setId);
      const curItem = exercise.sets[curIndex];

      const updatedSetsWithAdjustedIndices = updatedSets.map((set, index) => ({
        ...set,
        set:
          set.set !== null
            ? curItem.type === "warmup"
              ? set.set
              : curIndex <= index
              ? set.set - 1
              : set.set
            : null,
      }));

      if (updatedSetsWithAdjustedIndices.length === 0) {
        return null;
      }

      return { ...exercise, sets: updatedSetsWithAdjustedIndices };
    }
    return exercise;
  });

  const filteredExercises = updatedExercises.filter(
    (exercise) => exercise !== null
  );

  return { ...state, exercises: filteredExercises as ExerciseType[] };
}

function updateSet(
  state: InitialStateType,
  payload: UpdateSetPayload
): InitialStateType {
  const { setId, exerciseId, type, weight, reps, select } = payload;

  const guardCloseItem = state.exercises.find(
    (item) => item.uniqueId === exerciseId
  );
  const guard = guardCloseItem?.sets.find((item) => item.id === setId);
  if (select) {
    const updatedExercises = state.exercises.map((exercise) => {
      if (exercise.uniqueId === exerciseId) {
        const updatedSets = exercise.sets.map((item) => {
          if (item.id === setId) {
            return {
              ...item,
              selected: !item.selected,
            };
          }
          return item;
        });
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });

    return { ...state, exercises: updatedExercises as ExerciseType[] };
  }

  const updatedExercises = state.exercises.map((exercise) => {
    if (exercise.uniqueId === exerciseId) {
      const updatedSets = exercise.sets.map((item) => {
        if (item.id === setId) {
          return {
            ...item,
            set: type === "warmup" ? null : item.set,
            type: type || item.type,
            weight: weight !== undefined ? weight : item.weight,
            reps: reps || item.reps,
          };
        }

        return item;
      });
      return { ...exercise, sets: updatedSets };
    }

    return exercise;
  });

  if (
    (guard?.type === "straight" && type === "drop") ||
    (guard?.type === "straight" && type === "failure") ||
    (guard?.type === "drop" && type === "straight") ||
    (guard?.type === "drop" && type === "failure") ||
    (guard?.type === "failure" && type === "straight") ||
    (guard?.type === "failure" && type === "drop") ||
    (guard?.type === "warmup" && type === "warmup") ||
    (guard?.type === "straight" && type === "straight") ||
    type === undefined
  ) {
    return { ...state, exercises: updatedExercises as ExerciseType[] };
  }

  const updatedSets = updatedExercises.map((exercise) => {
    const curIndex = exercise.sets.findIndex((seted) => seted.id === setId);
    // const indexsess = exercise.sets
    //   .slice(0, curIndex)
    //   .reverse()
    //   .find((set) => set.set !== null);

    const allNulls = exercise.sets.every((item) => item.set === null);

    if (exercise.uniqueId === exerciseId) {
      const updatedSets = exercise.sets.map((item, index) => {
        if (type === "warmup") {
          return {
            ...item,
            set:
              item.type === "warmup"
                ? null
                : curIndex > index
                ? item.set
                : curIndex < index && item.set !== null
                ? item.set - 1
                : index + 1,
          };
        } else {
          let nextNonNullItemIndex = null;
          for (let i = curIndex + 1; i < exercise.sets.length; i++) {
            if (exercise.sets[i].set !== null) {
              nextNonNullItemIndex = i;
              break;
            }
          }
          let prevNonNullItemIndex = null;
          for (let i = curIndex - 1; i >= 0; i--) {
            if (exercise.sets[i].set !== null) {
              prevNonNullItemIndex = i;
              break;
            }
          }

          const nextItem =
            nextNonNullItemIndex !== null
              ? exercise.sets[nextNonNullItemIndex]
              : null;
          const prevItem =
            prevNonNullItemIndex !== null
              ? exercise.sets[prevNonNullItemIndex]
              : null;

          return {
            ...item,
            set:
              allNulls && curIndex === index
                ? 1
                : nextItem === null && prevItem !== null && curIndex === index
                ? (prevItem?.set ?? 0) + 1
                : curIndex === index
                ? nextItem?.set
                : item.set === null
                ? null
                : curIndex < index
                ? item.set + 1
                : item.set,
          };
        }
      });
      return { ...exercise, sets: updatedSets };
    }

    return exercise;
  });

  return { ...state, exercises: updatedSets as ExerciseType[] };
}

interface UpdateTimePayload {
  uniqueId: string;
  value: number;
  isOpen: boolean;
  enable: boolean;
}

function updateTime(
  state: InitialStateType,
  payload: UpdateTimePayload
): InitialStateType {
  const { uniqueId, value, isOpen, enable } = payload;

  const updatedExercises = state.exercises.map((exercise) => {
    if (exercise.uniqueId === uniqueId) {
      return {
        ...exercise,
        time: {
          value: value !== undefined ? value : exercise.time.value,
          isOpen: isOpen !== undefined ? isOpen : exercise.time.isOpen,
          enable: enable !== undefined ? enable : exercise.time.enable,
        },
      };
    }
    return exercise;
  });

  return { ...state, exercises: updatedExercises as ExerciseType[] };
}

interface CreateSuperSetPayload {
  exerciseId: string;
  select: boolean;
  clean?: boolean;
}

interface ContainsItemsResult {
  containsItems: boolean;
  setsWithItems: SuperSetType[];
  setWithMostItems: SuperSetType | null;
}

export function containsItemsFromSelectedSuperSets(
  superSets: SuperSetType[],
  selectedSuperSets: string[]
): ContainsItemsResult {
  let setWithMostItems: SuperSetType | null = null;
  const setsWithItems: SuperSetType[] = [];
  let maxMatchingItemCount = 0;

  for (const set of superSets) {
    const matchingItems = set.items.filter((item) =>
      selectedSuperSets.includes(item)
    );

    if (matchingItems.length > 0) {
      setsWithItems.push(set);

      if (matchingItems.length >= maxMatchingItemCount) {
        if (matchingItems.length > maxMatchingItemCount) {
          setWithMostItems = set;
          maxMatchingItemCount = matchingItems.length;
        } else {
          setWithMostItems = null;
          setsWithItems.push(set);
        }
      }
    }
  }

  return {
    containsItems: setsWithItems.length > 0,
    setsWithItems,
    setWithMostItems,
  };
}

function createSuperSet(
  state: InitialStateType,
  payload: CreateSuperSetPayload
): InitialStateType {
  const { exerciseId, select, clean } = payload;
  if (clean) {
    return { ...state, selectedSuperSets: [] };
  }
  if (!select) {
    const { containsItems, setWithMostItems } =
      containsItemsFromSelectedSuperSets(
        state.superSets,
        state.selectedSuperSets
      );
    if (setWithMostItems) {
      if (
        state.selectedSuperSets.every((item) =>
          setWithMostItems.items.includes(item)
        )
      ) {
        const existingItems = state.superSets.map((item) => {
          if (item.id === setWithMostItems.id) {
            const filteredItems = item.items.filter(
              (item) => !state.selectedSuperSets.includes(item)
            );

            return {
              ...item,
              items: filteredItems,
            };
          } else {
            return item;
          }
        });

        return { ...state, superSets: existingItems, selectedSuperSets: [] };
      }
      if (containsItems) {
        if (state.selectedSuperSets.length > setWithMostItems.items.length) {
          const existingItems = state.superSets.map((item) => {
            if (item.id === setWithMostItems.id) {
              const filteredItems = item.items.filter(
                (item) => !state.selectedSuperSets.includes(item)
              );

              return {
                ...item,
                items: [...state.selectedSuperSets, ...filteredItems],
              };
            } else {
              const filteredItems = item.items.filter(
                (item) => !state.selectedSuperSets.includes(item)
              );

              return {
                ...item,
                items: filteredItems,
              };
            }
          });

          return { ...state, superSets: existingItems, selectedSuperSets: [] };
        } else {
          const filteredItems = state.selectedSuperSets.filter(
            (item) => !setWithMostItems.items.includes(item)
          );
          const existingItems = state.superSets.map((item) => {
            if (item.id === setWithMostItems.id) {
              return {
                ...item,
                items: [...item.items, ...filteredItems],
              };
            } else {
              const filteredItems = item.items.filter(
                (item) => !state.selectedSuperSets.includes(item)
              );

              return {
                ...item,
                items: filteredItems,
              };
            }
          });
          return { ...state, superSets: existingItems, selectedSuperSets: [] };
        }
      } else {
        return { ...state, selectedSuperSets: [] };
      }
    } else {
      const superSetsIsEmpty = state.superSets.every(
        (item) => item.items.length === 0
      );
      const emptySuperSet = state.superSets.find(
        (item) => item.items.length === 0
      );

      if (superSetsIsEmpty) {
        return {
          ...state,
          superSets: [
            {
              items: state.selectedSuperSets,
              id: uuidv4(),
              color: SuperSetsColors[1],
            },
          ],
          selectedSuperSets: [],
        };
      } else {
        if (emptySuperSet) {
          const updatedSuperSets = state.superSets
            .map((item) => {
              if (item.id === emptySuperSet.id) {
                return {
                  ...item,
                  items: state.selectedSuperSets,
                };
              }
              return item;
            })
            .filter((item) => item.items.length > 0);
         
          return {
            ...state,
            superSets: updatedSuperSets,
            selectedSuperSets: [],
          };
        }
      }
      return {
        ...state,
        superSets: [
          ...state.superSets,
          {
            items: state.selectedSuperSets,
            id: uuidv4(),
            color: SuperSetsColors[state.superSets.length + 1],
          },
        ],
        selectedSuperSets: [],
      };
    }
  }

  // SELECT /////////////////////////////////////////

  const existingSelectedSuperSets = state.selectedSuperSets.find(
    (item) => item === exerciseId
  );
  if (!existingSelectedSuperSets && select) {
    return {
      ...state,
      selectedSuperSets: [...state.selectedSuperSets, exerciseId],
    };
  } else {
    const selectedSuperSets = state.selectedSuperSets.filter((item) => {
      return item !== exerciseId;
    });
    return { ...state, selectedSuperSets: selectedSuperSets };
  }
}

function updatePreviousSet(
  state: InitialStateType,
  payload: { setId: string; exerciseId: string; weight: number; reps: number }
) {
  const { exerciseId, setId, weight, reps } = payload;
  const updatedExercises = state.exercises.map((exercise) => {
    if (exercise.uniqueId === exerciseId) {
      const updatedSets = exercise.sets.map((item) => {
        if (item.id === setId) {
          return {
            ...item,
            weight: weight,
            reps: reps,
            id: uuidv4(),
          };
        }
        return item;
      });
      return { ...exercise, sets: updatedSets };
    }
    return exercise;
  });

  return { ...state, exercises: updatedExercises as ExerciseType[] };
}
