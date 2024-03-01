import { format } from "date-fns";
import Table from "./Table";
import { adjustMeasurement, findBestSet } from "../utils/helpers";
import styled from "styled-components";
import { useSettings } from "../features/settings/useSettings";

const StyledBox = styled.div`
  text-align: center;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExerciseRecordsRow({ item }: { item: any }) {
  const { settings } = useSettings();
  const { reps, exercise, maxWeight } = item;

  const bestSet = findBestSet(exercise.sets);

  const adjustedBestSet = adjustMeasurement(
    bestSet?.weight ?? 0,
    exercise.unit,
    settings
  );

  const adjustedMaxWeight = adjustMeasurement(
    maxWeight,
    exercise.unit,
    settings
  );

  return (
    <>
      <Table.Row>
        <>
          <div>{reps}</div>
          <StyledBox>
            <span>
              {bestSet?.reps} x {adjustedBestSet.value} {adjustedBestSet.unit}
            </span>
            <p>{format(new Date(item.exercise.created_at), "MMMM d, yyyy ")}</p>
          </StyledBox>
          <div style={{ marginLeft: "1rem" }}>
            {adjustedMaxWeight.value} {adjustedMaxWeight.unit}
          </div>
        </>
      </Table.Row>
    </>
  );
}

export default ExerciseRecordsRow;
