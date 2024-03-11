import styled from "styled-components";
import Heading from "../../UI/Heading";
import {
  adjustMeasurement,
  calculateTotalWeightLifted,
  findBestSetOneRepMax,
  findHighestWeight,
} from "../../utils/helpers";
import useRecordsExercise from "./useRecordsExercise";

import Table from "../../UI/Table";
import ExerciseRecordsRow, {
  maxWeightsForRepsProps,
} from "../../UI/ExerciseRecordsRow";
import { v4 as uuidv4 } from "uuid";
import { ExerciseType, SetType } from "../../types/WorkoutTypes";
import { useSettings } from "../settings/useSettings";
import { ONE_RM_PERCENTAGE } from "../../utils/constants";

const StyledRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
`;
const StyledP = styled.p`
  opacity: 0.7;
  margin-top: 2rem;
`;
function ExerciseRecords() {
  const { settings } = useSettings();
  const { user_exercise = [], isLoading } = useRecordsExercise();

  if (user_exercise.length === 0)
    return (
      <div>
        <Heading as={"h1"} style={{ textAlign: "center", marginTop: "10rem" }}>
          Try logging exercise before starting to track you progress 😀
        </Heading>
      </div>
    );

  const totalWeightLifted =
    calculateTotalWeightLifted({
      exercises: user_exercise,
    }) ?? 0;

  const highestWeights = user_exercise.map((exercise) =>
    findHighestWeight(exercise)
  );

  const bestSetOneRepMaxes = user_exercise.map((exercise) =>
    findBestSetOneRepMax(exercise)
  );

  const maxOneRepMax = Math.max(...bestSetOneRepMaxes);

  const bestSetAndOneRepMax = user_exercise.reduce(
    (acc, exercise) => {
      const oneRepMax = findBestSetOneRepMax(exercise);
      if (oneRepMax > acc.oneRepMax) {
        return { oneRepMax, set: exercise.sets, exercise };
      }
      return acc;
    },
    { oneRepMax: 0, set: [], exercise: null }
  );

  const maxWeightsForReps: maxWeightsForRepsProps[] = ONE_RM_PERCENTAGE.map(
    (percentage, i) => {
      const reps = i + 1;

      return {
        reps,
        maxWeight: Math.round(bestSetAndOneRepMax.oneRepMax * percentage) / 100,
        exercise: bestSetAndOneRepMax.exercise,
        id: uuidv4(),
      };
    }
  );

  const totalReps: number = user_exercise.reduce(
    (acc: number, exercise: ExerciseType) => {
      return (
        acc +
        exercise.sets.reduce(
          (accSet: number, set: SetType) => accSet + (set.reps ?? 0),
          0
        )
      );
    },
    0
  );
  const adjutedOneRepMax = adjustMeasurement(
    maxOneRepMax,
    user_exercise[0].unit,
    settings
  );

  const adjutedMaxVolume = adjustMeasurement(
    Math.max(
      ...(Array.isArray(totalWeightLifted)
        ? totalWeightLifted
        : [totalWeightLifted])
    ),
    user_exercise[0].unit,
    settings
  );

  const adjutedMaxWeight = adjustMeasurement(
    Math.max(
      ...(Array.isArray(highestWeights) ? highestWeights : [highestWeights])
    ),
    user_exercise[0].unit,
    settings
  );

  const adjustedWeight = adjustMeasurement(
    Array.isArray(totalWeightLifted)
      ? totalWeightLifted.reduce((acc, weight) => acc + weight, 0)
      : totalWeightLifted,
    user_exercise[0].unit,
    settings
  );

  return (
    <div>
      <div style={{ marginBottom: "4rem" }}>
        <Heading style={{ marginBottom: "2rem" }} as={"h3"}>
          Personal Records
        </Heading>
        <StyledRecord>
          <p>Estimated 1RM</p>
          <p>
            {adjutedOneRepMax.value} {adjutedOneRepMax.unit}
          </p>
        </StyledRecord>
        <StyledRecord>
          <p>Max Volume</p>
          <p>
            {adjutedMaxVolume.value} {adjutedMaxVolume.unit}
          </p>
        </StyledRecord>
        <StyledRecord>
          <p>Max Weight</p>
          <div>
            {adjutedMaxWeight.value} {adjutedMaxWeight.unit}
          </div>
        </StyledRecord>
        <Heading style={{ margin: "1rem 0" }} as={"h3"}>
          Lifetime Stats
        </Heading>
        <StyledRecord>
          <p>Total Reps</p>
          <div>{totalReps} reps</div>
        </StyledRecord>
        <StyledRecord>
          <p>Total Weight</p>
          <div>
            {adjustedWeight.value} {adjustedWeight.unit}
          </div>
        </StyledRecord>
      </div>
      <div>
        <Table columns="2fr 16fr 2fr">
          <Table.Header>
            <div>Reps</div>
            <div style={{ textAlign: "center" }}>Best Perfomance</div>
            <div>Estimated</div>
          </Table.Header>

          <Table.Body
            isLoading={isLoading}
            data={maxWeightsForReps as maxWeightsForRepsProps[]}
            render={(item) => (
              <ExerciseRecordsRow
                item={item as maxWeightsForRepsProps}
                key={item.id}
              />
            )}
          />
        </Table>
        <StyledP>
          Estimated RMs are generated using Matt Brzycki formula. Acutal are
          your best recorded perfomance at each rep.
        </StyledP>
      </div>
    </div>
  );
}

export default ExerciseRecords;
