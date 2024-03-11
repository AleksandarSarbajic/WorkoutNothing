import ExerciseRow from "./ExerciseRow";

import Table from "../../UI/Table";
import Menus from "../../context/Menus";

import useExercises from "./useExercises";
import useFilter from "../../hooks/useFilter";
import { ExerciseType } from "../../types/WorkoutTypes";
import { useUser } from "../auth/useUser";
import useRecordsExercises from "./useRecordsExercises";

function ExercisesTable({ type }: { type?: string }) {
  const { user } = useUser();
  const { filter } = useFilter({
    filterProps: {
      fields: ["muscle", "equipment"],
      method: "in",
      params: ["category", "body"],
    },
  });

  const { exercises = [], isLoading } = useExercises({ filter });
  const { user_exercises, isLoading: isLoadingExercises } =
    useRecordsExercises();

  const filteredExercises = exercises.filter(
    (exercise) => exercise.user_id === user?.id || exercise.user_id === null
  );
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
          isLoading={isLoading || isLoadingExercises}
          data={filteredExercises}
          render={(exercise) => (
            <ExerciseRow
              type={type}
              exercise={exercise as ExerciseType}
              key={(exercise as ExerciseType).id}
              user_exercises={user_exercises}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ExercisesTable;
