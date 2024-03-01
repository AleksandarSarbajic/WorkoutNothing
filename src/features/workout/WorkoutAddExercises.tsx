import { HiOutlineXMark } from "react-icons/hi2";
import Heading from "../../UI/Heading";
import Row from "../../UI/Row";
import ExercisesTable from "../exercises/ExercisesTable";
import ExercisesTableOperations from "../exercises/ExercisesTableOperations";
import Button from "../../UI/Button";
import ButtonAccept from "../../UI/ButtonAccept";
import { useWorkout } from "./Workout";
import { useSearchParams } from "react-router-dom";

function WorkoutAddExercises() {
  const {
    dispatch,
    state: { selectedExercises },
  } = useWorkout();
  const [searchParams, setSearchParams] = useSearchParams();

  function deleteParams() {
    searchParams.delete("exerciseId");
    searchParams.delete("body");
    searchParams.delete("category");
    searchParams.delete("add");
    setSearchParams(searchParams);
  }

  return (
    <>
      <Row $type="horizontal">
        <Button
          $size="cancel"
          onClick={() => {
            dispatch({ type: "CLOSE_SELECT_EXERCISE" });
            deleteParams();
          }}
        >
          <HiOutlineXMark />
        </Button>
        <ExercisesTableOperations />
      </Row>
      <Row>
        <Heading as="h1">Add Exercises</Heading>
      </Row>
      <Row>
        <ExercisesTable type="add" />
        {selectedExercises.length > 0 && (
          <ButtonAccept
            onClick={() => {
              if (searchParams.has("exerciseId")) {
                dispatch({
                  type: "REPLACE_EXERCISE",
                  payload: searchParams.get("exerciseId"),
                });
              } else {
                dispatch({ type: "ADD_EXERCISE" });
              }

              deleteParams();
            }}
          />
        )}
      </Row>
    </>
  );
}

export default WorkoutAddExercises;
