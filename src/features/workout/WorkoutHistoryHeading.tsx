import ConfirmDelete from "../../UI/ConfirmDelete";
import Menus from "../../context/Menus";
import Modal from "../../context/Modal";
import useDeleteWorkout from "./useDeleteWorkout";
import { useWorkout as useWorkoutApi } from "./Workout";
import { WorkoutSupabase } from "../../types/WorkoutTypes";
import useWorkout from "./useWorkout";
import Confirm from "../../UI/Confirm";

function WorkoutHistoryHeading() {
  const {
    dispatch,
    state: { status },
    time: { reset, pause },
  } = useWorkoutApi();
  const { workout = [] } = useWorkout();
  const workoutType = workout as WorkoutSupabase;

  const { deleteWorkout, isPending } = useDeleteWorkout();

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
                  <Menus.Button>
                    <p>Edit Workout</p>
                  </Menus.Button>
                </Modal.Open>
              ) : (
                <Menus.Button
                  onClick={() => {
                    editWorkoutHandler();
                  }}
                >
                  <p>Edit Workout</p>
                </Menus.Button>
              )}

              <Modal.Open opens="workoutHeading--history--modal">
                <Menus.Button>Delete</Menus.Button>
              </Modal.Open>
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
            disabled={isPending}
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
