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
import useRecordsExerciseRow from "./useRecordsExerciseRow";
import SpinnerMini from "../../UI/SpinnerMini";

const Exercise = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
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
}: {
  exercise:
    | Database["public"]["Tables"]["exercises"]["Row"]
    | ExerciseType
    | BestPerformaceType
    | Measure;

  type?: string;
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
  } = exercise as Database["public"]["Tables"]["exercises"]["Row"];
  const { user_exercise, isLoading } = useRecordsExerciseRow(+exercise.id);
  // console.log(user_exercise, isLoading);
  const [searchParams] = useSearchParams();
  const exerciseParams = searchParams.get("exerciseId");
  const isSelected = selectedExercises.some(
    (exercise) => exercise.id === exerciseId
  );

  function onSelectHandler() {
    if (isLoading) return;
    if (type !== "add") return;
    const exerciseTemplate = {
      id: exerciseId,
      uniqueId: uuidv4(),
      name,
      unit: settings?.weight,
      sets: [
        {
          set: 1,
          reps: 5,
          previous: "10kg x 5",
          weight: 10,
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
    };
    const itemForExtracting = {
      ...(user_exercise?.[user_exercise.length - 1] ?? exerciseTemplate),
    };

    const sets = itemForExtracting.sets.map((set: SetType) => {
      return {
        ...set,
        selected: false,
      };
    });

    const extracted = {
      uniqueId: uuidv4(),
      id: itemForExtracting.exercise_id,
      exercise_id: itemForExtracting.exercise_id,
      name: itemForExtracting.name,
      unit: itemForExtracting.unit,
      sets: [sets[0]],
      previousSets: sets,
      note: itemForExtracting.note,
      time: itemForExtracting.time,
      records: itemForExtracting.records,
    };

    const exercise = user_exercise?.length !== 0 ? extracted : exerciseTemplate;
    console.log(user_exercise);
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
    >
      <>
        <Exercise>{name}</Exercise>
        <div>{muscle}</div>
        <div>{equipment.replace(/_/g, " ")}</div>
        <div>{difficulty}</div>
        {type !== "add" && (
          <div>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={exerciseId} />

                <Menus.List id={exerciseId}>
                  <Menus.Button icon={<HiPencil />}>
                    <p>Edit exercise</p>
                  </Menus.Button>
                  <Menus.Button
                    icon={<HiInformationCircle />}
                    onClick={() => navigate(`${exerciseId}?page=about`)}
                  >
                    <p>About</p>
                  </Menus.Button>
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

              {isLoading && <SpinnerMini />}
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
