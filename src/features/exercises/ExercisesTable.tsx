import ExerciseRow from "./ExerciseRow";

import Table from "../../UI/Table";
import Menus from "../../context/Menus";

import useExercises from "./useExercises";
import useFilter from "../../hooks/useFilter";
import { ExerciseType } from "../../types/WorkoutTypes";

function ExercisesTable({ type }: { type?: string }) {
  const { filter } = useFilter({
    filterProps: {
      fields: ["muscle", "equipment"],
      method: "in",
      params: ["category", "body"],
    },
  });

  const { exercises = [], isLoading } = useExercises({ filter });

  return (
    <Menus>
      <Table columns="4fr 1.5fr 1.5fr 1.5fr 1fr">
        <Table.Header>
          <div>Exercise</div>
          <div>Muscle</div>
          <div>Category</div>
          <div>Difficulty</div>
          <div></div>
        </Table.Header>

        <Table.Body
          isLoading={isLoading}
          data={exercises}
          render={(exercise) => (
            <ExerciseRow
              type={type}
              exercise={exercise as ExerciseType}
              key={(exercise as ExerciseType).id}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ExercisesTable;
