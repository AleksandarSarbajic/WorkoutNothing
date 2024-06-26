import styled from "styled-components";

import Modal from "../../context/Modal";

import Menus from "../../context/Menus";
import Table from "../../UI/Table";
import { Database } from "../../services/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  HiCalendarDays,
  HiChartBar,
  HiInformationCircle,
  HiOutlineCheck,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { FaMedal } from "react-icons/fa";
import { Measure } from "../../types/MeasureTableTypes";
import { useWorkout } from "../workout/Workout";

import { v4 as uuidv4 } from "uuid";
import { useSettings } from "../settings/useSettings";

import {
  BestPerformaceType,
  ExerciseType,
  SetType,
} from "../../types/WorkoutTypes";

import AddExerciseForm from "../../UI/AddExerciseForm";
import { adjustMeasurement, generateNumericUUID } from "../../utils/helpers";
import ConfirmDelete from "../../UI/ConfirmDelete";
import useDeleteExercise from "./useDeleteExercise";

const StyledDifficulty = styled.div`
  @media only screen and (max-width: 37.5em) {
    display: none;
  }
`;

const Exercise = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  @media only screen and (max-width: 37.5em) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Checked = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

function ExerciseRow({
  exercise,
  type,
  user_exercises,
}: {
  exercise:
    | Database["public"]["Tables"]["exercises"]["Row"]
    | ExerciseType
    | BestPerformaceType
    | Measure;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user_exercises: any[] | undefined;
}) {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const {
    dispatch,
    state: { selectedExercises },
  } = useWorkout();
  const {
    id: exerciseId,
    name,
    equipment,
    muscle,
    difficulty,
    instructions,
    user_id,
  } = exercise as Database["public"]["Tables"]["exercises"]["Row"];

  const user_exercise = user_exercises?.filter(
    (item) => item.exercise_id === +exercise.id
  );

  const { deleteExercise, isPending: isDeletingExercise } = useDeleteExercise();

  const [searchParams] = useSearchParams();
  const exerciseParams = searchParams.get("exerciseId");
  const isSelected = selectedExercises.some(
    (exercise) => exercise.real_id === exerciseId
  );

  function onSelectHandler() {
    if (type !== "add") return;
    const exerciseTemplate = {
      id: exerciseId + uuidv4(),
      real_id: exerciseId,
      uniqueId: uuidv4(),
      uniqueId_number: generateNumericUUID(),
      name,
      unit: settings?.weight,
      sets: [
        {
          set: 1,
          reps: null,
          previous: null,
          weight: null,
          id: uuidv4(),
          type: "straight",
          selected: false,
        },
      ],
      previousSets: [],
      note: {
        id: exerciseId,
        uniqueId: uuidv4(),
        value: "",
        isOpen: false,
        isPinned: false,
        type: "exercise",
      },
      time: {
        isOpen: false,
        enable: false,
        value: 300,
      },
      records: [],
      instructions,
    };
    const itemForExtracting = {
      ...(user_exercise?.[user_exercise.length - 1] ?? exerciseTemplate),
    };

    const sets = itemForExtracting.sets.map((set: SetType) => {
      return {
        ...set,
        selected: false,
        id: uuidv4(),
      };
    });

    const extracted = {
      uniqueId: uuidv4(),
      id: itemForExtracting.exercise_id + uuidv4(),
      real_id: itemForExtracting.exercise_id,
      exercise_id: itemForExtracting.exercise_id,
      uniqueId_number: generateNumericUUID(),
      name: itemForExtracting.name,
      unit: itemForExtracting.unit,
      sets: [
        {
          ...sets[0],
          id: uuidv4(),
          weight: Math.round(
            +adjustMeasurement(sets[0].weight, itemForExtracting.unit, settings)
              .value
          ),
        },
      ],
      previousSets: sets.map((set: SetType) => {
        return {
          ...set,
          weight: Math.round(
            +adjustMeasurement(
              set.weight ?? 0,
              itemForExtracting.unit,
              settings
            ).value
          ),
        };
      }),
      note: itemForExtracting.note,
      time: itemForExtracting.time,
      records: itemForExtracting.records,
      instructions,
    };

    const exercise = user_exercise?.length !== 0 ? extracted : exerciseTemplate;

    if (!exerciseParams) {
      dispatch({ type: "SELECT_EXERCISES", payload: exercise });
    } else {
      dispatch({ type: "SELECT_EXERCISE", payload: exercise });
    }
  }

  return (
    <Table.Row
      measure={type === "add"}
      selected={(isSelected && type === "add") as boolean}
      onClick={onSelectHandler}
      responsive="2rem"
    >
      <>
        <Exercise>{name}</Exercise>
        <div>{muscle.replace(/_/g, " ")}</div>
        <div>{equipment.replace(/_/g, " ")}</div>
        <StyledDifficulty>{difficulty}</StyledDifficulty>
        {type !== "add" && (
          <div>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={exerciseId} />

                <Menus.List id={exerciseId}>
                  {user_id !== null && (
                    <Menus.Button icon={<HiPencil />}>
                      <Modal.Open opens="edit-exercise">
                        <p>Edit exercise</p>
                      </Modal.Open>
                    </Menus.Button>
                  )}
                  {user_id !== null && (
                    <Menus.Button icon={<HiTrash />}>
                      <Modal.Open opens="delete-exercise">
                        <p>Delete exercise</p>
                      </Modal.Open>
                    </Menus.Button>
                  )}
                  {instructions.length !== 0 && (
                    <Menus.Button
                      icon={<HiInformationCircle />}
                      onClick={() => {
                        if (instructions.length === 0)
                          navigate(`${exerciseId}?page=history`);
                        else navigate(`${exerciseId}?page=about`);
                      }}
                    >
                      <p>About</p>
                    </Menus.Button>
                  )}
                  <Menus.Button
                    icon={<HiCalendarDays />}
                    onClick={() => navigate(`${exerciseId}?page=history`)}
                  >
                    <p>History</p>
                  </Menus.Button>
                  <Menus.Button
                    icon={<HiChartBar />}
                    onClick={() => navigate(`${exerciseId}?page=charts`)}
                  >
                    <p>Charts</p>
                  </Menus.Button>
                  <Menus.Button
                    icon={<FaMedal />}
                    onClick={() => navigate(`${exerciseId}?page=records`)}
                  >
                    <p>Records</p>
                  </Menus.Button>
                </Menus.List>
              </Menus.Menu>
              <Modal.Window name="edit-exercise">
                <AddExerciseForm
                  edit={true}
                  name={name}
                  category={muscle}
                  bodyPart={equipment}
                  exerciseId={exerciseId}
                />
              </Modal.Window>
              <Modal.Window name="delete-exercise">
                <ConfirmDelete
                  resourceName={exercise.name || "Exercise"}
                  disabled={isDeletingExercise}
                  onConfirm={() => {
                    deleteExercise(+exerciseId);
                  }}
                  text="Are you sure you want to remove this exercise? This cannot be undone."
                />
              </Modal.Window>
            </Modal>
          </div>
        )}
        {isSelected && type === "add" && (
          <Checked>{<HiOutlineCheck />}</Checked>
        )}
        {type === "add" && !isSelected && (
          <div style={{ textAlign: "right", marginRight: "1rem" }}>
            <p>
              {user_exercise?.length === 0 && null}

              {/* {isLoading && <SpinnerMini />} */}
              {user_exercise &&
                user_exercise.length !== 0 &&
                user_exercise.length}
            </p>
          </div>
        )}
      </>
    </Table.Row>
  );
}

export default ExerciseRow;
