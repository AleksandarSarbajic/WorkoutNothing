import { useState, useEffect } from "react";
import ExerciseRow from "./ExerciseRow";
import Table from "../../UI/Table";
import Menus from "../../context/Menus";
import useExercises from "./useExercises";
import useFilter from "../../hooks/useFilter";
import { ExerciseType } from "../../types/WorkoutTypes";
import { useUser } from "../auth/useUser";
import useRecordsExercises from "./useRecordsExercises";
import styled from "styled-components";

const StyledDifficulty = styled.div`
  @media only screen and (max-width: 37.5em) {
    display: none;
  }
`;

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

  const [columns, setColumns] = useState("4fr 1.5fr 1.5fr 1.5fr 1fr");

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setColumns("4fr 1.5fr 1.5fr 0.5fr");
    } else {
      setColumns("4fr 1.5fr 1.5fr 1.5fr 1fr");
    }
  }, []);

  const filteredExercises = exercises.filter(
    (exercise) => exercise.user_id === user?.id || exercise.user_id === null
  );

  return (
    <Menus>
      <Table columns={columns}>
        <Table.Header>
          <div>Exercise</div>
          <div>Muscle</div>
          <div>Category</div>

          <StyledDifficulty>Difficulty</StyledDifficulty>
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
