import Heading from "../UI/Heading";
import Row from "../UI/Row";
import TemplateItem from "../UI/TemplateItem";
import Menus from "../context/Menus";
import Modal from "../context/Modal";
import useTemplates from "../features/templates/useTemplates";
import Workout, { useWorkout } from "../features/workout/Workout";
import Templates from "../types/TemplateTypes";
import { StyledWorkouts } from "./HistoryPage";
import { HiOutlinePlus } from "react-icons/hi2";

function WorkoutPage() {
  const { dispatch } = useWorkout();
  const { templates = [], isLoading } = useTemplates();

  return (
    <Modal>
      <Menus>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <Row $type="horizontal">
            <Heading as={"h1"}>Workout</Heading>
            <Workout.Start>Start an empty workout</Workout.Start>
          </Row>
          {templates && templates.length !== 0 && (
            <Row $type="horizontal" style={{ margin: "1rem 0 0 0" }}>
              <Heading as={"h2"}>My Templates</Heading>
              <button
                onClick={() => {
                  dispatch({ type: "CREATE_TEMPLATE" });
                }}
              >
                <HiOutlinePlus style={{ width: "2.6rem", height: "2.6rem" }} />
              </button>
            </Row>
          )}
          <Row style={{ margin: "1rem 0" }}>
            <StyledWorkouts>
              {templates.map((template) => {
                return (
                  <TemplateItem
                    key={template.id}
                    workout={template}
                    isLoading={isLoading}
                    sample="custom"
                  />
                );
              })}
            </StyledWorkouts>
          </Row>
          <Row $type="horizontal">
            <Heading as={"h2"} style={{ margin: "1rem 0 2.4rem" }}>
              Sample Templates
            </Heading>
            {templates && templates.length === 0 && (
              <button
                onClick={() => {
                  dispatch({ type: "CREATE_TEMPLATE" });
                }}
              >
                <HiOutlinePlus style={{ width: "2.6rem", height: "2.6rem" }} />
              </button>
            )}
          </Row>
          <Row>
            <StyledWorkouts>
              {Templates.map((template) => {
                return (
                  <TemplateItem
                    key={template.id}
                    workout={template}
                    isLoading={isLoading}
                  />
                );
              })}
            </StyledWorkouts>
          </Row>
        </div>
      </Menus>
    </Modal>
  );
}

export default WorkoutPage;
