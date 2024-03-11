import { useState } from "react";
import FormRow from "./FormRow";
import Heading from "./Heading";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { BODY_FILTER, CATEGORY_FILTER } from "../utils/constants";
import styled from "styled-components";
import useInsertExercise from "../features/exercises/useInsertExercise";
import useUpdateExercise from "../features/exercises/useUpdateExercise";

const StyledAddExerciseForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

interface AddExerciseFormProps {
  onCloseModal?: () => void;
  name?: string;
  category?: string;
  bodyPart?: string;
  edit?: boolean;
  exerciseId?: number;
}

function AddExerciseForm({
  onCloseModal,
  edit = false,
  name,
  category,
  bodyPart,
  exerciseId,
}: AddExerciseFormProps) {
  const { insertExercise, isPending: isInserting } = useInsertExercise();
  const { updateExercise, isPending: isUpdating } = useUpdateExercise();
  const [exerciseName, setExerciseName] = useState(name || "");
  const [exerciseBody, setExerciseBody] = useState(bodyPart || "biceps");
  const [exerciseCategory, setExerciseCategory] = useState(
    category || "barbell"
  );

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const exercise = {
      name: exerciseName,
      body: exerciseBody,
      category: exerciseCategory,
    };
    if (!edit) {
      insertExercise(exercise);
    } else {
      updateExercise({ ...exercise, id: exerciseId! });
    }
    onCloseModal && onCloseModal();
  }
  return (
    <StyledAddExerciseForm onSubmit={onSubmitHandler}>
      <Heading as={"h3"}>{!edit ? " New exercise" : "Edit exercise"}</Heading>
      <FormRow label="Name" style={"11rem 1fr"}>
        <Input
          required
          type="text"
          placeholder="Add Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Category" style={"11rem 1fr"}>
        <Select
          value={exerciseCategory}
          onChange={(e) => setExerciseCategory(e.target.value)}
          options={CATEGORY_FILTER}
        />
      </FormRow>
      <FormRow label="Body part" style={"11rem 1fr"}>
        <Select
          value={exerciseBody}
          onChange={(e) => setExerciseBody(e.target.value)}
          options={BODY_FILTER}
        />
      </FormRow>
      <ButtonBox>
        <Button
          $variation="secondary"
          type="button"
          onClick={() => {
            if (onCloseModal) {
              onCloseModal();
            }
          }}
          disabled={isInserting || isUpdating}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isInserting || isUpdating}>
          {!edit ? "Add exercise" : "Update exercise"}
        </Button>
      </ButtonBox>
    </StyledAddExerciseForm>
  );
}

export default AddExerciseForm;
