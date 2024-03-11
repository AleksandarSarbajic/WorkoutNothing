import Menus from "../context/Menus";
import Modal from "../context/Modal";

import AddExerciseForm from "./AddExerciseForm";

function AddExercise() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Modal>
        <Menus>
          <Menus.Toggle id={"add-exercise"} />
          <Menus.List id={"add-exercise"}>
            <Menus.Button>
              <Modal.Open opens="add-exercise-modal">
                <p>Create Exercise</p>
              </Modal.Open>
            </Menus.Button>
          </Menus.List>
          <Modal.Window name="add-exercise-modal">
            <AddExerciseForm />
          </Modal.Window>
        </Menus>
      </Modal>
    </div>
  );
}

export default AddExercise;
