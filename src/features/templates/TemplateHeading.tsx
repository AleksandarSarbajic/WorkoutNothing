import ConfirmDelete from "../../UI/ConfirmDelete";
import Menus from "../../context/Menus";
import Modal from "../../context/Modal";

import Confirm from "../../UI/Confirm";
import { useWorkout } from "../workout/Workout";
import useTemplate from "./useTemplate";
import useDeleteTemplate from "./useDeleteTemplate";
import { useSettings } from "../settings/useSettings";

function TemplateHeading() {
  const { template } = useTemplate();
  const { settings } = useSettings();
  const { deleteTemplate, isPending: isDeleting } = useDeleteTemplate();
  const {
    dispatch,
    state: { status },
    time: { reset, pause },
  } = useWorkout();

  function editWorkoutHandler() {
    dispatch({
      type: "EDIT_TEMPLATE",
      payload: { item: template, unit: settings?.weight },
    });
    reset();
    pause();
  }

  return (
    <div>
      <Modal>
        <Menus>
          <>
            <Menus.Toggle id={"workoutHeading--template"} />
            <Menus.List id={"workoutHeading--template"}>
              {status !== "idle" ? (
                <Modal.Open opens="edit-workout-template">
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

              <Modal.Open opens="templateHeading--template--modal">
                <Menus.Button>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit-workout-template">
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
        <Modal.Window name="templateHeading--template--modal">
          <ConfirmDelete
            resourceName={`Delete Template?`}
            text={`Are you sure you want to delete this Workout? This cannot be undone`}
            disabled={isDeleting}
            onConfirm={() => {
              deleteTemplate();
            }}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default TemplateHeading;
