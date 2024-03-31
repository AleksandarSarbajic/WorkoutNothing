import ConfirmDelete from "../../UI/ConfirmDelete";
import Menus from "../../context/Menus";
import Modal from "../../context/Modal";
import useDeleteWorkout from "./useDeleteWorkout";
import { useWorkout as useWorkoutApi } from "./Workout";
import { WorkoutSupabase } from "../../types/WorkoutTypes";
import useWorkout from "./useWorkout";
import Confirm from "../../UI/Confirm";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { GoRepoTemplate } from "react-icons/go";
import useInsertTemplate from "../templates/useInsertTemplate";

function WorkoutHistoryHeading() {
  const {
    dispatch,
    state: { status },
    time: { reset, pause },
  } = useWorkoutApi();
  const { workout } = useWorkout();
  const workoutType = workout as WorkoutSupabase;
  const { insertTemplate } = useInsertTemplate();
  const { deleteWorkout, isPending: isDeleting } = useDeleteWorkout();

  function editWorkoutHandler() {
    dispatch({ type: "EDIT_WORKOUT", payload: workoutType });
    reset();
    pause();
  }

  return (
    <div>
      <Modal>
        <Menus>
          <>
            <Menus.Toggle id={"workoutHeading--history"} />
            <Menus.List id={"workoutHeading--history"}>
              {status !== "idle" ? (
                <Modal.Open opens="edit-workout-history">
                  <Menus.Button icon={<HiPencil />}>
                    <p>Edit Workout</p>
                  </Menus.Button>
                </Modal.Open>
              ) : (
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => {
                    editWorkoutHandler();
                  }}
                >
                  <p>Edit Workout</p>
                </Menus.Button>
              )}

              <Modal.Open opens="workoutHeading--history--modal">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
              <Menus.Button
                icon={<GoRepoTemplate />}
                onClick={() => {
                  insertTemplate({ workout: workout });
                }}
              >
                Save as workout template
              </Menus.Button>
            </Menus.List>
            <Modal.Window name="edit-workout-history">
              <Confirm
                resourceName="Workout in progress"
                text="You are currently performing a workout. Are you sure you want to start a new one?"
                confirmText="Start a new one"
                onConfirm={() => {
                  editWorkoutHandler();
                }}
              />
            </Modal.Window>
          </>
        </Menus>
        <Modal.Window name="workoutHeading--history--modal">
          <ConfirmDelete
            resourceName={`Delete Workout?`}
            disabled={isDeleting}
            text={`Are you sure you want to delete this Workout? This cannot be undone`}
            onConfirm={() => {
              deleteWorkout();
            }}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default WorkoutHistoryHeading;
