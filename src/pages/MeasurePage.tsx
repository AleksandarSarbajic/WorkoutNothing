import { useParams } from "react-router-dom";
import CreateMeasure from "../features/measures/CreateMeasure";
import useMeasure from "../features/measures/useMeasure";
import { useMoveBack } from "../hooks/useMoveBack";
import ButtonText from "../UI/ButtonText";
import Chart from "../UI/Chart";

import Heading from "../UI/Heading";
import Row from "../UI/Row";
import { SingleMeasure } from "../types/MeasureTableTypes";
import MeasureItemRow from "../features/measures/MeasureItemRow";
import Modal from "../context/Modal";
import { useSettings } from "../features/settings/useSettings";
import { adjustMeasurement } from "../utils/helpers";
import Spinner from "../UI/Spinner";

function MeasurePage() {
  const { measure = {}, isLoading } = useMeasure();
  const { settings } = useSettings();
  const { measureId = "" } = useParams();

  const oldArray =
    (measure[measureId as keyof typeof measure] as SingleMeasure[]) || [];
  const moveBack = useMoveBack();

  const sortedOldArray = oldArray.slice().sort((a, b) => {
    const dateA = new Date(a.added_at);
    const dateB = new Date(b.added_at);
    return dateA.getTime() - dateB.getTime();
  });

  const data = sortedOldArray.map((item) => {
    return {
      value: adjustMeasurement(item.value, item.unit, settings).value,
      added_at: item.added_at,
      unit: adjustMeasurement(item.value, item.unit, settings).unit,
      id: item.id,
    };
  }) as SingleMeasure[];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Row $type="horizontal">
        <Heading style={{ textTransform: "capitalize" }} as="h1">
          {measureId?.replace(/_/g, " ")}
        </Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <Row>
        <Chart values={data} heading={measureId} />
        <Modal>
          <CreateMeasure />
          {data.map((item) => (
            <MeasureItemRow item={item} key={item.id} />
          ))}
        </Modal>
      </Row>
    </>
  );
}

export default MeasurePage;
