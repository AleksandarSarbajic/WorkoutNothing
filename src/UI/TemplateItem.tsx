import styled, { css } from "styled-components";
import Heading from "./Heading";
import Menus from "../context/Menus";
import { WorkoutSupabase } from "../types/WorkoutTypes";
import { TemplateTypes } from "../types/TemplateTypes";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useDeleteTemplate from "../features/templates/useDeleteTemplate";
import { useWorkout } from "../features/workout/Workout";
import { useSettings } from "../features/settings/useSettings";
import Modal from "../context/Modal";
import Confirm from "./Confirm";
import useInsertTemplate from "../features/templates/useInsertTemplate";
import UpdateNameModal from "./UpdateNameModal";
import useUpdateTemplate from "../features/templates/useUpdateTemplate";

const Flex = css`
  display: flex;
  align-items: center;
`;

const StyledWorkout = styled.li`
  padding: 2rem;
  background-color: var(--workout-bg-color);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-400);
  box-shadow: var(--shadow-md);
  &:hover {
    cursor: pointer;
    background-color: var(--workout-hover-color);
  }
`;

const Header = styled.div`
  ${Flex}
  justify-content: space-between;
`;

const Perform = styled.p`
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const StyledExercises = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
`;

const StyledExercise = styled.li`
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledButton = styled.div`
  display: block;
  width: 100%;
  text-align: left;
`;

function TemplateItem({
  workout,
  isLoading,
  sample = "sample",
}: {
  workout: WorkoutSupabase | TemplateTypes;
  isLoading?: boolean;
  sample?: string;
}) {
  const { insertTemplate, isPending: isPendingTemplate } = useInsertTemplate();
  const { updateTemplate, isPending: isPendingUpdateTemplate } =
    useUpdateTemplate();
  const {
    dispatch,
    state: { status },
    time: { reset, pause },
  } = useWorkout();
  const { settings } = useSettings();
  const navigate = useNavigate();

  function editWorkoutHandler() {
    dispatch({
      type: "EDIT_TEMPLATE",
      payload: { item: workout, unit: settings?.weight },
    });
    reset();
    pause();
  }
  function renameTemplateHandler(name: string) {
    const updatedTemplate = {
      ...workout,
      name: name,
    };

    updateTemplate({
      workout: updatedTemplate as WorkoutSupabase,
      id: +updatedTemplate.id,
    });
  }

  const { deleteTemplate, isPending: isDeleting } = useDeleteTemplate(
    +workout.id
  );

  if (isLoading || isDeleting || isPendingTemplate)
    return (
      <Skeleton
        count={5}
        style={{
          height: "17rem",
          margin: "0.8rem 0",
          borderRadius: "0.5rem",
        }}
        inline={true}
      />
    );

  if ("name" in workout) {
    const templateWorkout = workout as TemplateTypes;

    return (
      <StyledWorkout>
        <Header>
          <Heading as={"h3"}>{templateWorkout.name}</Heading>
          {sample === "custom" && (
            <>
              <Menus.Toggle id={templateWorkout.name} />
              <Menus.List id={templateWorkout.name}>
                {status !== "idle" ? (
                  <Modal.Open opens={`edit-workout-template-${workout.id}`}>
                    <Menus.Button>
                      <p>Edit Template</p>
                    </Menus.Button>
                  </Modal.Open>
                ) : (
                  <Menus.Button
                    onClick={() => {
                      editWorkoutHandler();
                    }}
                  >
                    <p>Edit Template</p>
                  </Menus.Button>
                )}
                <Modal.Open opens={`Rename-workout-template-${workout.id}`}>
                  <Menus.Button>
                    <p>Rename</p>
                  </Menus.Button>
                </Modal.Open>
                <Menus.Button
                  onClick={() => {
                    const workoutToBeInserted = {
                      ...workout,
                      name: `Duplicate of ${workout.name}`,
                      last_performed: new Date().toISOString(),
                    };

                    insertTemplate({
                      workout: workoutToBeInserted as WorkoutSupabase,
                    });
                  }}
                >
                  Duplicate
                </Menus.Button>

                <Menus.Button
                  onClick={() => {
                    deleteTemplate();
                  }}
                >
                  Delete
                </Menus.Button>
              </Menus.List>
              <Modal.Window name={`edit-workout-template-${workout.id}`}>
                <Confirm
                  resourceName="Workout in progress"
                  text="You are currently performing a workout. Are you sure you want to start a new one?"
                  confirmText="Start a new one"
                  onConfirm={() => {
                    editWorkoutHandler();
                  }}
                />
              </Modal.Window>
              <Modal.Window name={`Rename-workout-template-${workout.id}`}>
                <UpdateNameModal
                  heading={"Template"}
                  handler={renameTemplateHandler}
                  nameToBeUpdated={workout.name}
                  isLoading={isPendingUpdateTemplate}
                />
              </Modal.Window>
            </>
          )}
        </Header>
        <StyledButton
          onClick={() => {
            navigate(`/workout/${templateWorkout.id}?sample=${sample}`);
          }}
        >
          <Perform>
            {sample === "custom" &&
              format(new Date(templateWorkout.last_performed), "dd/MM/yy")}
          </Perform>
          <StyledExercises>
            {templateWorkout.exercises.map((exercise) => (
              <StyledExercise key={exercise.id}>
                {exercise.sets.length} x {exercise.name}
              </StyledExercise>
            ))}
          </StyledExercises>
        </StyledButton>
      </StyledWorkout>
    );
  }

  return null;
}

export default TemplateItem;
