import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import { useStopwatch } from "react-timer-hook";
import styled, { css, keyframes } from "styled-components";
import {
  HiCheck,
  HiClock,
  HiDocumentText,
  HiLockClosed,
  HiTrash,
} from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import Heading from "../../UI/Heading";
import Menus from "../../context/Menus";
import {
  adjustMeasurement,
  convertSecondsToTime,
  findBestRecordByProperty,
  findBestSet,
  findBestSetForOneRepMax,
  findBestWeightSet,
  formatTimeWorkout,
} from "../../utils/helpers";
import {
  ActionType,
  ActionTypes,
  ExerciseType,
  InitialState,
  InitialStateType,
  SetType,
  SuperSetType,
  WORKOUT_REDUCER,
} from "../../types/WorkoutTypes";
import { CommonRow } from "../../UI/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TbInfinity, TbPinnedFilled, TbReplaceFilled } from "react-icons/tb";
import Modal, { useModal } from "../../context/Modal";
import ConfirmDelete from "../../UI/ConfirmDelete";
import { useTimerHandler } from "../../context/Timer";
import ReactDatePicker from "react-datepicker";
import TimePicker from "../../UI/TimePicker";
import Toggle from "../../UI/Toggle";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Button from "../../UI/Button";
import toast from "react-hot-toast";
import Confirm from "../../UI/Confirm";
import useInsertWorkout from "./useInsertWorkout";
import useInsertExercises from "../exercises/useInsertExercises";
import { useSettings } from "../settings/useSettings";
import useUpdateWorkout from "./useUpdateWorkout";
import useInsertTemplate from "../templates/useInsertTemplate";
import useUpdateTemplate from "../templates/useUpdateTemplate";
import { useLongPress } from "use-long-press";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const StyledButton = css`
  background-color: var(--color-brand-700);
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-50);
  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const StyledStart = styled.button`
  ${StyledButton}
`;
const StyledTimer = styled.button`
  ${StyledButton};
  width: 100%;
`;
const StyledName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & input {
    padding: 0.5rem 1rem;
    font-family: "Space Mono", sans-serif;
    font-size: 2.4rem;
    background-color: transparent;
    border: none;
    margin: 0 0 1rem -1rem;
  }
`;

const StyledFinish = styled.button`
  background-color: var(--color-brand-700);
  padding: 1rem 2rem;
  text-transform: uppercase;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-50);
  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const StyledNote = styled.div<{ $pinned?: boolean }>`
  position: relative;
  & input {
    width: 40%;
    font-family: "Space Mono", sans-serif;
    background-color: var(--color-grey-200);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 0.7rem 2rem;
    ${(props) => props.$pinned && "background-color: var(--color-brand-500);"}
    &::placeholder {
      color: var(--color-grey-100);
      opacity: 0.7;
    }
  }

  & button {
    position: absolute;
    top: 50%;
    left: 36%;
    transform: translateY(-50%);
    outline: none;
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
  @media only screen and (max-width: 37.5em) {
    & input {
      width: 70%;
    }
  }
`;

const StyledSortableItem = styled.div<{ $superSet?: string }>`
  cursor: pointer;
  margin: 0.5rem 0 0.5rem -1rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  border-radius: var(--border-radius-sm);
  &:hover {
    background-color: var(--color-grey-300);
  }
  ${(props) => props.$superSet && `border-left: 2px solid ${props.$superSet};`}
  ${(props) =>
    props.$superSet &&
    css`
      padding-left: 1rem;
      margin-left: -1.3rem;
    `}
`;

const StyledAddCancel = styled.div`
  gap: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  & > button {
    padding: 0.5rem 0;
    text-transform: uppercase;
    color: var(--color-red-700);
    border-radius: var(--border-radius-sm);
    &:hover {
      background-color: rgba(185, 28, 28, 0.1);
    }
  }
  & > *:first-child {
    color: var(--color-brand-500);
    &:hover {
      background-color: rgba(99, 101, 241, 0.1);
    }
  }
`;

const StyledExercise = styled.div<{ $superSet?: string }>`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 2.4rem 3.2rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${(props) => props.$superSet && `border-left: 5px solid ${props.$superSet};`}

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  & > button:first-child {
    font-size: 20rem;
  }
  & > button:last-child {
    font-size: 1.8rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-brand-500);
    border-radius: var(--border-radius-sm);
    padding: 0.5rem 0;
    &:hover {
      background-color: rgba(99, 101, 241, 0.1);
    }
  }
`;
const StyledExerciseHeader = styled(CommonRow)`
  text-align: center;
`;

const CheckAnimation = keyframes`
0%{
  scale: 1.1;
}
100%{
  scale: 1;
}
`;

const StyledSetButton = styled.span<{ $variation: string }>`
  font-weight: 600;
  width: 2rem;
  color: var(--color-brand-500);

  ${(props) => props.$variation === "warmup" && "color: #fb923c;"}
  ${(props) => props.$variation === "drop" && "color: #6d28d9;"}
  ${(props) => props.$variation === "failure" && "color: #ef4444;"}
`;

const StyledSet = styled(CommonRow)<{ $checked: boolean }>`
  text-align: center;
  padding: 1rem 0;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s ease-in-out;
  padding-right: 2rem;
  margin: 0.5rem -2rem 0.5rem 0;

  ${(props) => props.$checked && "background-color: rgba(21, 128, 60, 0.2);"}

  & input,
  & > button:last-child {
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius-sm);
  }
  & input[type="number"] {
    background-color: var(--color-grey-300);
    ${(props) => props.$checked && "background-color: rgba(21, 128, 60, 0.05);"}
  }
  & > button:last-child {
    background-color: var(--color-grey-300);

    padding: 0.6rem;
    display: flex;
    justify-content: flex-end;

    & svg {
      width: 2.2rem;
      height: 2.2rem;
    }
    ${(props) =>
      props.$checked &&
      css`
        background-color: var(--color-green-100);
        animation: ${CheckAnimation} 0.4s ease-in-out;
      `}
  }
`;

const StyledRestTimer = styled.div`
  position: absolute;
  right: -1rem;
  top: 1rem;
  background-color: var(--color-grey-100);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  & > button:first-child {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`;

const CreateSuperSetContainer = styled.div`
  & ul {
    height: 42.5rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 1rem;
    padding-right: 1rem;
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 1rem;
      background-color: var(--color-grey-700);
    }

    &::-webkit-scrollbar {
      width: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.9rem;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: var(--color-grey-0);
    }

    & li {
      display: flex;
      align-items: center;
      gap: 1rem;
      & span {
      }
    }
  }
  & div {
    margin-top: 3rem;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > button:last-child {
      /* padding: 1rem; */
    }
  }
`;

const SuperSet = styled.span<{ $superSet?: string; $empty: boolean }>`
  width: 0.5rem;
  height: 4rem;
  background-color: var(--color-grey-300);
  ${(props) => props.$empty && "display: none;"}
  ${(props) => props.$superSet && `background-color: ${props.$superSet};`}
`;

const SuperSetButton = styled.button<{
  $selected: boolean;
}>`
  text-align: start !important;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-100);
  ${(props) => props.$selected && "background-color: var(--color-grey-200);"}
  &:hover {
    background-color: var(--color-grey-300);
  }
`;

// Workout Context
const WorkoutContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    start: () => void;
    pause: () => void;
    reset: () => void;
  };
}>({
  state: InitialState,
  dispatch: () => null,
  time: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    start: () => null,
    pause: () => null,
    reset: () => null,
  },
});

// Workout Component
function Workout({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(WORKOUT_REDUCER, InitialState);
  const { seconds, minutes, hours, start, pause, reset, totalSeconds } =
    useStopwatch({
      autoStart: false,
    });

  const time = { hours, minutes, seconds, start, pause, reset, totalSeconds };

  return (
    <WorkoutContext.Provider value={{ state, dispatch, time }}>
      {children}
    </WorkoutContext.Provider>
  );
}

function Exercise({ exercise }: { exercise: ExerciseType }) {
  const { settings } = useSettings();
  const {
    state: { superSets },
    dispatch,
  } = useContext(WorkoutContext);
  const note = exercise.note;

  const exerciseSetNumber = function (value = 1) {
    if (value <= 0 || value > exercise.sets.length) {
      return null;
    }

    let index = exercise.sets.length - value;
    let foundNonNull = false;

    while (index >= 0) {
      const item = exercise.sets[index].set;
      if (item !== null) {
        foundNonNull = true;
        return item;
      }
      index--;
    }

    if (!foundNonNull) {
      return 1;
    }

    return null;
  };

  function onAddSetHandler() {
    const exercisesItem = {
      exerciseId: exercise.uniqueId,
      set: {
        set: (exerciseSetNumber() ?? 0) + 1,
        reps: exercise.sets[(exerciseSetNumber() ?? 0) - 1]?.reps ?? null,
        previous: null,
        weight: exercise.sets[(exerciseSetNumber() ?? 0) - 1]?.weight ?? null,
        id: uuidv4(),
        type: "straight",
        selected: false,
      },
    };

    dispatch({ type: ActionTypes.ADD_SET, payload: exercisesItem });
  }

  return (
    <StyledExercise
      $superSet={
        superSets.find((item) => {
          const filtered = item.items.find(
            (item) => item === exercise.uniqueId
          );
          return filtered;
        })?.color
      }
    >
      <ExerciseHeading
        uniqueId={exercise.uniqueId}
        name={exercise.name}
        noteId={note.uniqueId}
        time={exercise.time}
        real_id={exercise.real_id}
        instuctions={exercise.instructions}
      />
      {note.isOpen && (
        <Note
          placeholder={`${exercise.name} note`}
          id={note.uniqueId}
          type={note.type}
          pin={true}
          isPinned={note.isPinned}
        />
      )}
      <StyledExerciseHeader $columns="0.2fr 1fr 1fr 1fr 0.15fr">
        <div>Set</div>
        <div>Previous</div>
        <div style={{ textTransform: "capitalize" }}>{settings?.weight}</div>
        <div>Reps</div>
        <div></div>
      </StyledExerciseHeader>
      {exercise.sets.map((item) => (
        <Set
          key={item.id}
          set={item}
          uniqueId={exercise.uniqueId}
          time={exercise.time}
        />
      ))}

      <button style={{ textAlign: "center" }} onClick={onAddSetHandler}>
        Add Set
      </button>
    </StyledExercise>
  );
}

function Start({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const {
    dispatch,
    time: { reset },
    state: { status },
  } = useContext(WorkoutContext);

  const { handleRestart } = useTimerHandler();

  return (
    <Modal>
      {status !== "idle" ? (
        <>
          <Modal.Open opens="Start-Workout">
            <StyledStart>{children}</StyledStart>
          </Modal.Open>
          <Modal.Window name="Start-Workout">
            <Confirm
              resourceName="Workout in progress"
              text="You are currently performing a workout. Are you sure you want to start a new one?"
              confirmText="Start a new one"
              onConfirm={() => {
                dispatch({
                  type: ActionTypes.START_WORKOUT,
                  payload: { unit: settings?.weight },
                });
                reset();
                handleRestart();
              }}
            />
          </Modal.Window>
        </>
      ) : (
        <StyledStart
          onClick={() => {
            dispatch({
              type: ActionTypes.START_WORKOUT,
              payload: { unit: settings?.weight },
            });
            reset();
            handleRestart();
          }}
        >
          {children}
        </StyledStart>
      )}
    </Modal>
  );
}

function Time() {
  const { time } = useContext(WorkoutContext);
  return (
    <div>
      <span>{time.hours !== 0 && `${formatTimeWorkout(time.hours)}:`}</span>
      <span>{formatTimeWorkout(time.minutes)}:</span>
      <span>{formatTimeWorkout(time.seconds)}</span>
    </div>
  );
}

function Timer() {
  const { dispatch, state } = useContext(WorkoutContext);

  return (
    <StyledTimer
      onClick={() => dispatch({ type: ActionTypes.OPEN_CLOSE, payload: true })}
    >
      <Heading as={"h6"}>{state.name}</Heading>
      <Time />
    </StyledTimer>
  );
}

function Name() {
  const ref = useRef<HTMLInputElement>(null);
  const {
    dispatch,
    state: { name, edit, template },
  } = useContext(WorkoutContext);

  return (
    <StyledName>
      <div>
        <input
          ref={ref}
          value={name}
          onChange={(e) =>
            dispatch({ type: ActionTypes.CHANGE_NAME, payload: e.target.value })
          }
        />
        {edit === false && template === false ? <Time /> : ""}
      </div>
      <Menus.Toggle id={"workoutName"} />
      <Menus.List id={"workoutName"}>
        <Menus.Button
          onClick={() => {
            if (ref.current) {
              ref.current.focus();
            }
          }}
        >
          Change Name
        </Menus.Button>
      </Menus.List>
    </StyledName>
  );
}

function Note({
  placeholder,
  type,
  id,
  pin,
  isPinned,
}: {
  placeholder: string;
  type: string;
  id: string | number;
  pin?: boolean;
  isPinned?: boolean;
}) {
  const {
    state: { exercises, note },

    dispatch,
  } = useContext(WorkoutContext);
  const noteValue = exercises.find((exercise) => exercise.note.uniqueId === id)
    ?.note.value;

  return (
    <StyledNote $pinned={isPinned}>
      <input
        value={noteValue === undefined ? note : noteValue}
        onChange={(e) => {
          dispatch({
            type: ActionTypes.CHANGE_NOTE,
            payload: {
              type,
              id,
              note: e.target.value,
              open: type === "exercise",
            },
          });
        }}
        name={id.toString()}
        placeholder={placeholder}
      />
      {pin && (
        <button
          onClick={() =>
            dispatch({
              type: ActionTypes.CHANGE_NOTE,
              payload: { type, id, open: type === "exercise", pin: !isPinned },
            })
          }
        >
          <TbPinnedFilled />
        </button>
      )}
    </StyledNote>
  );
}

function AddCancel() {
  const {
    dispatch,
    time: { pause },
  } = useContext(WorkoutContext);
  const [searchParams, setSearchParamas] = useSearchParams();
  return (
    <StyledAddCancel>
      <button
        onClick={() => {
          searchParams.set("add", "true");
          setSearchParamas(searchParams);
          dispatch({ type: ActionTypes.CLOSE_SELECT_EXERCISE });
        }}
      >
        Add exercise
      </button>
      <Modal.Open opens="Cancel Workout">
        <button>Cancel workout</button>
      </Modal.Open>
      <Modal.Window name="Cancel Workout">
        <ConfirmDelete
          resourceName="Cancel Workout?"
          name={"cancel"}
          disabled={false}
          onConfirm={() => {
            pause();
            dispatch({ type: ActionTypes.RESTART_WORKOUT });
          }}
        />
      </Modal.Window>
    </StyledAddCancel>
  );
}

function ExerciseHeading({
  uniqueId,
  name,
  noteId,
  time,
  instuctions,
  real_id,
}: {
  uniqueId: number | string;
  name: string;
  noteId: number | string;
  time: { value: number | null; isOpen: boolean; enable: boolean };
  instuctions?: string;
  real_id: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const openModal = useModal();
  const navigate = useNavigate();
  const {
    dispatch,
    state: { exercises },
  } = useContext(WorkoutContext);

  const callback = useCallback(() => {
    openModal(`CreateNigga-${uniqueId}`);
  }, [openModal, uniqueId]);

  const bind = useLongPress(callback, {
    onFinish: () => {
      dispatch({
        type: ActionTypes.SORT_EXERCISES,
        payload: { sorting: true, exercises },
      });
    },
    onCancel: () => {
      navigate(
        `/exercises/${real_id}?page=${
          instuctions?.length === 0 ? "history" : "about"
        }`
      );
      dispatch({ type: "OPEN_CLOSE" });
    },
    filterEvents: () => true,
    threshold: 300,
    captureEvent: true,
    cancelOnMovement: 25,
    cancelOutsideElement: true,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
      id={uniqueId.toString()}
    >
      <button {...bind()} style={{ fontSize: "2rem" }}>
        {name}
      </button>
      <Menus.Toggle id={uniqueId} />
      <Menus.List id={uniqueId}>
        <Menus.Button
          icon={<HiDocumentText />}
          onClick={() => {
            dispatch({
              type: ActionTypes.CHANGE_NOTE,
              payload: { id: noteId, type: "exercise", open: true },
            });
          }}
        >
          Add Note
        </Menus.Button>
        <Modal.Open
          opens={`Create SuperSet--${uniqueId}`}
          withOpens={() => {
            dispatch({
              type: ActionTypes.CREATE_SUPER_SET,
              payload: { exerciseId: uniqueId, select: true },
            });
          }}
        >
          <Menus.Button icon={<TbInfinity />}>
            <>Create superset</>
          </Menus.Button>
        </Modal.Open>
        <Menus.Button
          icon={<TbReplaceFilled />}
          onClick={() => {
            searchParams.set("exerciseId", `${uniqueId}`);
            setSearchParams(searchParams);
            dispatch({ type: ActionTypes.CLOSE_SELECT_EXERCISE });
          }}
        >
          Replace exercise
        </Menus.Button>
        <Menus.Button
          icon={<HiClock />}
          onClick={() =>
            dispatch({
              type: ActionTypes.UPDATE_TIME,
              payload: { uniqueId, isOpen: true },
            })
          }
        >
          Auto rest timer{" "}
          {time.enable && (
            <>
              {formatTimeWorkout(convertSecondsToTime(time.value ?? 0).minutes)}
              :
              {formatTimeWorkout(convertSecondsToTime(time.value ?? 0).seconds)}
            </>
          )}
        </Menus.Button>
        <Modal.Open opens={`${uniqueId}`}>
          <Menus.Button icon={<HiTrash />}>Delete exercise</Menus.Button>
        </Modal.Open>
      </Menus.List>
      <Modal.Window
        name={`CreateNigga-${uniqueId}`}
        id={uniqueId.toString()}
        addition={() => {
          dispatch({
            type: ActionTypes.SORT_EXERCISES,
            payload: { sorting: false },
          });
        }}
      >
        <ExerciseOrder />
      </Modal.Window>
      <Modal.Window name={`confirm-delete${uniqueId}`}>
        <ConfirmDelete
          resourceName="Remove exercise?"
          name={name}
          disabled={false}
          onConfirm={() =>
            dispatch({ type: ActionTypes.REMOVE_EXERCISE, payload: uniqueId })
          }
        />
      </Modal.Window>
      <Modal.Window
        name={`Create SuperSet--${uniqueId}`}
        key={uniqueId}
        addition={() => {
          dispatch({
            type: ActionTypes.CREATE_SUPER_SET,
            payload: { clean: true },
          });
        }}
      >
        <CreateSuperset />
      </Modal.Window>
      {time.isOpen && <RestTimer uniqueId={uniqueId} time={time} />}
    </div>
  );
}

function ExerciseOrder() {
  const { dispatch, state } = useContext(WorkoutContext);
  const [items, setItems] = useState(state.exercises);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 10,
        distance: 10,
      },
    })
  );

  return (
    <div>
      <Heading as={"h2"} style={{ marginBottom: "2rem" }}>
        Change order of exercises
      </Heading>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((exercise: ExerciseType) => (
            <ExerciseItemSortable key={exercise.uniqueId} exercise={exercise} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDragEnd(event: any) {
    const { active, over } = event;
    console.log(active, over, active.id !== over.id);
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        dispatch({
          type: ActionTypes.SORT_EXERCISES,
          payload: {
            exercises: arrayMove(items, oldIndex, newIndex),
            sorting: true,
          },
        });
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

function ExerciseItemSortable({ exercise }: { exercise: ExerciseType }) {
  const { state } = useContext(WorkoutContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: exercise.id,
    });

  const draggerStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <StyledSortableItem
      $superSet={
        state.superSets.find((item) => {
          const filtered = item.items.find(
            (item) => item === exercise.uniqueId
          );
          return filtered;
        })?.color
      }
      ref={setNodeRef}
      style={{
        ...draggerStyle,
      }}
      {...attributes}
      {...listeners}
    >
      {exercise.name}
    </StyledSortableItem>
  );
}

function CreateSuperset() {
  const {
    dispatch,
    state: { exercises, superSets, selectedSuperSets },
  } = useContext(WorkoutContext);
  const superSetsIsEmpty = superSets.every((item) => item.items.length === 0);

  return (
    <CreateSuperSetContainer>
      <Heading as={"h2"} style={{ marginBottom: "2rem" }}>
        Create Superset
      </Heading>
      <ul>
        {exercises.map((exercises) => (
          <li key={exercises.uniqueId}>
            <SuperSet
              $empty={superSetsIsEmpty}
              $superSet={
                superSets.find((item) => {
                  const filtered = item.items.find(
                    (item) => item === exercises.uniqueId
                  );
                  return filtered;
                })?.color
              }
            />
            <SuperSetButton
              $selected={selectedSuperSets.includes(exercises.uniqueId)}
              onClick={() => {
                dispatch({
                  type: ActionTypes.CREATE_SUPER_SET,
                  payload: { exerciseId: exercises.uniqueId, select: true },
                });
              }}
            >
              {exercises.name}
            </SuperSetButton>
          </li>
        ))}
      </ul>
      <div>
        <Button
          onClick={() => {
            if (selectedSuperSets.length <= 1) {
              toast.error("Select at least two exercises");
              return;
            }
            dispatch({
              type: ActionTypes.CREATE_SUPER_SET,
              payload: { select: false },
            });
          }}
        >
          Confirm
        </Button>
      </div>
    </CreateSuperSetContainer>
  );
}

function RestTimer({
  uniqueId,
  time,
}: {
  uniqueId: number | string;
  time: { value: number | null; isOpen: boolean; enable: boolean };
}) {
  const { dispatch } = useContext(WorkoutContext);
  console.log(time);
  const initialStartDate = (() => {
    const date = new Date();
    const timerValue = (time.value ?? 300) / 60;
    date.setHours(timerValue, 0, 0, 0);
    return date;
  })();
  console.log(initialStartDate);
  const [startDate, setStartDate] = useState(initialStartDate);
  console.log(startDate);
  const convertTime = (time: Date) => {
    const totalMinutes = time.getHours() * 60;
    const totalSeconds = totalMinutes + time.getMinutes();
    return totalSeconds;
  };

  function handleIsOpenChange() {
    dispatch({
      type: ActionTypes.UPDATE_TIME,
      payload: { uniqueId, isOpen: !time.isOpen },
    });
  }

  const ref = useOutsideClick<HTMLDivElement>(handleIsOpenChange);

  function onCheckHandle() {
    dispatch({
      type: ActionTypes.UPDATE_TIME,
      payload: { uniqueId, enable: !time.enable },
    });
  }

  return (
    <StyledRestTimer ref={ref}>
      <button>
        <p>Enabled</p>
        <Toggle
          onChange={() => {
            onCheckHandle();
          }}
          checked={time.enable}
          disabled={false}
        />
      </button>
      <div>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date!);
            dispatch({
              type: ActionTypes.UPDATE_TIME,
              payload: { uniqueId, value: convertTime(date!) },
            });
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          timeCaption="Time"
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          minTime={new Date(0, 0, 0, 0, 0, 0)}
          maxTime={new Date(0, 0, 0, 10, 0, 0)}
          customInput={<TimePicker />}
          disabled={!time.enable}
        />
      </div>
    </StyledRestTimer>
  );
}

function SetButton({
  set,
  uniqueId,
}: {
  set: SetType;
  uniqueId: number | string;
}) {
  const { dispatch } = useContext(WorkoutContext);

  function onChangeSetTypeHandle(
    type: string,
    setId: string,
    exerciseId: string | number
  ) {
    dispatch({
      type: ActionTypes.UPDATE_SET,
      payload: { setId, exerciseId, type },
    });
  }

  const textTypes =
    set.type === "straight"
      ? set.set
      : set.type === "drop"
      ? "D"
      : set.type === "warmup"
      ? "W"
      : set.type === "failure"
      ? "F"
      : set.set;

  return (
    <div>
      <Menus.Toggle
        id={set.id}
        text={
          <StyledSetButton $variation={set.type}>{textTypes}</StyledSetButton>
        }
        direction="right"
      />
      <Menus.List id={set.id}>
        <Menus.Button
          icon={<StyledSetButton $variation={"straight"}>S</StyledSetButton>}
          onClick={() => onChangeSetTypeHandle("straight", set.id, uniqueId)}
        >
          Straight set
        </Menus.Button>
        <Menus.Button
          icon={<StyledSetButton $variation={"warmup"}>W</StyledSetButton>}
          onClick={() => onChangeSetTypeHandle("warmup", set.id, uniqueId)}
        >
          Warm up
        </Menus.Button>
        <Menus.Button
          icon={<StyledSetButton $variation={"drop"}>D</StyledSetButton>}
          onClick={() => onChangeSetTypeHandle("drop", set.id, uniqueId)}
        >
          Drop set
        </Menus.Button>
        <Menus.Button
          icon={<StyledSetButton $variation={"failure"}>F</StyledSetButton>}
          onClick={() => onChangeSetTypeHandle("failure", set.id, uniqueId)}
        >
          Failure
        </Menus.Button>
        <Menus.Button
          icon={
            <HiTrash
              style={{
                marginLeft: "-0.6rem",
                marginRight: "0.5rem",
                width: "2rem",
                color: "var(--color-brand-500)",
              }}
            />
          }
          onClick={() => {
            dispatch({
              type: ActionTypes.DELETE_SET,
              payload: { setId: set.id, exerciseId: uniqueId },
            });
          }}
        >
          Delete Set
        </Menus.Button>
      </Menus.List>
    </div>
  );
}

function Set({
  set,
  uniqueId,
  time,
}: {
  set: SetType;
  uniqueId: number | string;
  time: { value: number | null; isOpen: boolean; enable: boolean };
}) {
  const {
    dispatch,
    state: { edit, template, exercises },
  } = useContext(WorkoutContext);
  const isChecked = set.selected;
  const { timerHandler } = useTimerHandler();
  const { settings } = useSettings();
  const exercise = exercises.find((item) => item.uniqueId === uniqueId);
  const previous = set.previous?.split(" x ");

  return (
    <StyledSet $columns="0.2fr 1fr 1fr 1fr 0.1fr" $checked={isChecked}>
      <SetButton set={set} uniqueId={uniqueId} />

      <button
        style={{ opacity: "0.7" }}
        disabled={set.previous === null}
        onClick={() => {
          if (set.previous === null || !previous) return;

          dispatch({
            type: ActionTypes.UPDATE_PREVIOUS,
            payload: {
              setId: set.id,
              exerciseId: uniqueId,
              weight: +previous[0],
              reps: +previous[1],
            },
          });
        }}
      >
        {set.previous === null || !previous
          ? "-"
          : Math.round(
              +adjustMeasurement(+previous[0], exercise?.unit ?? "kg", settings)
                .value
            ) +
            adjustMeasurement(+previous[0], exercise?.unit ?? "kg", settings)
              .unit +
            " x " +
            set.reps}
      </button>
      <input
        id={`${set.uniqueId}-${set.id}-value-${set.set}`}
        name={`${set.uniqueId}-${set.id}-value-${set.set}`}
        style={{ width: "100%" }}
        value={set.weight ?? ""}
        min={0}
        type="number"
        onChange={(e) =>
          dispatch({
            type: ActionTypes.UPDATE_SET,
            payload: {
              setId: set.id,
              exerciseId: uniqueId,
              weight: Math.max(0, +e.target.value),
            },
          })
        }
      />
      <input
        id={`${set.type}-${set.id}-reps-${set.set}`}
        name={`${set.type}-${set.id}-reps-${set.set}`}
        style={{ width: "100%" }}
        value={set.reps ?? ""}
        min={1}
        type="number"
        onChange={(e) =>
          dispatch({
            type: ActionTypes.UPDATE_SET,
            payload: {
              setId: set.id,
              exerciseId: uniqueId,
              reps: Math.max(0, +e.target.value),
            },
          })
        }
      />
      <button
        disabled={template}
        onClick={() => {
          if (set.weight === null || set.reps === null) return;
          if (template) return;
          dispatch({
            type: ActionTypes.UPDATE_SET,
            payload: {
              setId: set.id,
              exerciseId: uniqueId,
              select: true,
            },
          });

          if (time.enable && !isChecked) {
            if (edit) return;
            if (time.value !== null) {
              timerHandler(time.value, true, 0, true, isChecked);
            }
          }
        }}
      >
        {template ? <HiLockClosed /> : <HiCheck />}
      </button>
    </StyledSet>
  );
}

function Finish() {
  const { settings } = useSettings();
  const audio = new Audio(
    `https://zvwyaoedhsrbfwycadck.supabase.co/storage/v1/object/public/sounds/positive.mp3`
  );

  const {
    insertWorkout,
    isError: isErrorWorkout,
    isPending: isPendingWorkout,
  } = useInsertWorkout();

  const { updateWorkout, isPending: isPendingUpdate } = useUpdateWorkout();

  const { insertTemplate, isPending: isPendingTemplate } = useInsertTemplate();
  const { updateTemplate, isPending: isPendingUpdateTemplate } =
    useUpdateTemplate();
  const {
    insertExercises,
    isError: isErrorExercises,
    isPending: isPendingExercises,
  } = useInsertExercises();

  const {
    state: {
      name,
      exercises,
      superSets,
      start_time,
      end_time,
      workout_time,
      note,
      unit,
      edit,
      template,
      id,
      templateId,
    },
    time: { totalSeconds, pause },
    dispatch,
  } = useContext(WorkoutContext);

  const extractedState = {
    note,
    name,
    exercises,
    superSets,
    start_time,
    end_time,
    workout_time,
    unit,
  };
  const { hours, minutes, seconds } = convertSecondsToTime(totalSeconds);

  const modifiedState = {
    ...extractedState,
    unit: settings?.weight || "kg",
    end_time: new Date().toISOString(),
    workout_time: `${formatTimeWorkout(hours)}:${formatTimeWorkout(
      minutes
    )}:${formatTimeWorkout(seconds)}`,
    exercises: extractedState.exercises
      .map((exercise) => ({
        ...exercise,
        sets: exercise.sets
          .filter((set) => {
            if (template) {
              return !set.selected;
            }
            return set.selected;
          })
          .map((set) => {
            return {
              ...set,
              previous: `${set.weight} x ${set.reps}`,
            };
          }),
      }))
      .filter((exercise) => exercise.sets.length > 0)
      .map((exercise) => {
        const recordWeight = findBestRecordByProperty(
          exercise.records,
          "weight"
        );
        const recordOneRM = findBestRecordByProperty(exercise.records, "RM");
        const recordVolume = findBestRecordByProperty(
          exercise.records,
          "volume"
        );

        const oneRm = findBestSetForOneRepMax(exercise);

        const volume = findBestSet(exercise.sets);
        const weight = findBestWeightSet(exercise.sets);

        const recordToBeAdded = {
          weight:
            (weight?.weight ?? 0) > (recordWeight?.weight.value ?? 0)
              ? { value: weight?.weight, setId: weight?.id }
              : null,
          RM:
            oneRm.oneRep > (recordOneRM?.RM.value ?? 0)
              ? { value: oneRm.oneRep, setId: oneRm.set?.id }
              : null,
          volume:
            (volume?.weight ?? 0) * (volume?.reps ?? 0) >
            (recordVolume?.volume.value ?? 0)
              ? {
                  value: (volume?.weight ?? 0) * (volume?.reps ?? 0),
                  setId: volume?.id,
                }
              : null,
          id: uuidv4(),
          at: new Date().toISOString(),
          unit: settings?.weight || "kg",
          current: true,
        };

        if (
          recordToBeAdded.RM === null &&
          recordToBeAdded.volume === null &&
          recordToBeAdded.weight === null
        ) {
          return exercise;
        }

        return {
          ...exercise,
          records: [...exercise.records, recordToBeAdded],
        };
      }) as ExerciseType[],

    superSets: extractedState.superSets
      .map((item) => {
        const items = item.items.filter((superSet) => {
          const found = extractedState.exercises.find(
            (exercise) => exercise.uniqueId === superSet
          );

          const foundSets = found?.sets.some((set) => {
            if (template) return !set.selected;
            return set.selected;
          });
          if (foundSets) {
            return found?.uniqueId;
          }
        });
        if (items.length > 1) {
          return {
            ...item,
            items,
          };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null) as SuperSetType[],
    records: 0,
  };

  return (
    <>
      <Modal.Open opens="Finish-Workout">
        <StyledFinish>
          {template && edit
            ? "Edit template"
            : template
            ? "Create Template"
            : edit
            ? "Finish Editing"
            : "Finish"}
        </StyledFinish>
      </Modal.Open>
      <Modal.Window name="Finish-Workout">
        <Confirm
          resourceName="Are you finished?"
          text={
            "All invalid and empty sets will be discarded. All sets that are valid and checked will be saved."
          }
          disabled={false}
          onConfirm={() => {
            if (isErrorExercises || isErrorWorkout) return;
            if (modifiedState.exercises.length === 0 && template === false) {
              toast.error(
                "You didnt even start and you already want to finish 🤔"
              );
              return;
            }

            if (edit && template) {
              updateTemplate({ workout: modifiedState, id });
            }

            if (template && edit === false) {
              insertTemplate({ workout: modifiedState });
            }

            if (edit === false && template === false) {
              insertWorkout({ workout: modifiedState });
              insertExercises({
                exercises: modifiedState.exercises,
              });

              if (templateId !== null && templateId !== undefined) {
                updateTemplate({
                  workout: modifiedState,
                  id: templateId,
                  time: true,
                });
              }
            }

            if (edit && template === false) {
              updateWorkout({ workout: modifiedState, id });
              insertExercises({ exercises: modifiedState.exercises });
            }

            if (
              !isPendingExercises &&
              !isPendingWorkout &&
              !isPendingUpdate &&
              !isPendingTemplate &&
              !isPendingUpdateTemplate
            ) {
              audio.play();
              pause();
              dispatch({ type: ActionTypes.RESTART_WORKOUT });
            }
          }}
        />
      </Modal.Window>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined)
    throw new Error("useWorkout must be used within a WorkoutProvider");
  return context;
}

Workout.Start = Start;
Workout.Timer = Timer;
Workout.Name = Name;
Workout.Note = Note;
Workout.AddCancel = AddCancel;
Workout.Exercise = Exercise;
Workout.Finish = Finish;

export default Workout;
