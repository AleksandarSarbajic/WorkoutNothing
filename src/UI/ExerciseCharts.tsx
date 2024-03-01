import { format } from "date-fns";
import ExerciseChart from "../features/exercises/ExerciseChart";
import useRecordsExercise from "../features/exercises/useRecordsExercise";
import { useSettings } from "../features/settings/useSettings";
import {
  adjustMeasurement,
  calculateBestOneRepMaxForEachItem,
  calculateTotalWeightLifted,
  findBestRepsForEachItem,
} from "../utils/helpers";
import styled from "styled-components";
import { ExerciseType } from "../types/WorkoutTypes";
import Heading from "./Heading";

const ChartsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function ExerciseCharts(): JSX.Element {
  const { user_exercise = [] } = useRecordsExercise();
  const { settings } = useSettings();

  const calculateAdjustedValues = (
    data: ExerciseType[],
    type: "1RM" | "Reps" | "Volume"
  ) =>
    data.map((exercise, index) => {
      const value =
        type === "1RM"
          ? +adjustMeasurement(
              calculateBestOneRepMaxForEachItem(user_exercise)[index],
              user_exercise[0].unit,
              settings ?? undefined
            ).value
          : type === "Reps"
          ? findBestRepsForEachItem(user_exercise)[index]
          : +adjustMeasurement(
              calculateTotalWeightLifted({ exercises: user_exercise })?.[
                index
              ] || 0,
              user_exercise[0].unit,
              settings ?? undefined
            ).value;
      return {
        name: exercise.name,
        value,
        time: exercise.created_at
          ? format(new Date(exercise.created_at), "dd/MM/yy")
          : "",
        unit:
          type === "Volume" || type === "1RM"
            ? settings?.weight || "kg"
            : "reps",
      };
    });

  const exerciseDataRM = calculateAdjustedValues(user_exercise, "1RM");
  const exerciseDataVolume = calculateAdjustedValues(user_exercise, "Volume");
  const exerciseDataReps = calculateAdjustedValues(user_exercise, "Reps");

  if (user_exercise.length === 0)
    return (
      <div>
        <Heading as={"h1"} style={{ textAlign: "center", marginTop: "10rem" }}>
          Try logging exercise before starting to track you progress 😀
        </Heading>
      </div>
    );

  return (
    <ChartsSection>
      <ExerciseChart heading="Best set (est. 1RM)" values={exerciseDataRM} />
      <ExerciseChart
        heading={`Total Volume ${settings?.weight}`}
        values={exerciseDataVolume}
      />
      <ExerciseChart heading="Best set (reps) " values={exerciseDataReps} />
    </ChartsSection>
  );
}

export default ExerciseCharts;
