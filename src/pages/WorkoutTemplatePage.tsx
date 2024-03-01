import { useParams, useSearchParams } from "react-router-dom";
import ButtonText from "../UI/ButtonText";
import Row from "../UI/Row";
import WorkoutTemplateItem from "../UI/WorkoutTemplateItem";

import { useMoveBack } from "../hooks/useMoveBack";
import Templates from "../types/TemplateTypes";
import useTemplate from "../features/templates/useTemplate";
import Spinner from "../UI/Spinner";
import TemplateHeading from "../features/templates/TemplateHeading";

function WorkoutTemplatePage() {
  const moveBack = useMoveBack();
  const { workoutId } = useParams();
  const { template, isLoading } = useTemplate();

  const item = Templates.find((item) => item.id === workoutId);
  const [searchParams] = useSearchParams();
  const sample = searchParams.get("sample") ?? "sample";
  return (
    <>
      <Row $type="horizontal">
        <ButtonText style={{ fontSize: "2rem" }} onClick={moveBack}>
          &larr; Back
        </ButtonText>
        {sample === "custom" && <TemplateHeading />}
      </Row>

      <Row>
        {isLoading ? (
          <Spinner />
        ) : (
          <WorkoutTemplateItem item={item ? item : template} />
        )}
      </Row>
    </>
  );
}

export default WorkoutTemplatePage;
