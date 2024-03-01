import Heading from "../UI/Heading";
import Row from "../UI/Row";
import MeasuresTable from "../features/measures/MeasuresTable";
import useMeasures from "../features/measures/useMeasures";

function MeasuresPage() {
  const { measures = [], isLoading } = useMeasures();

  return (
    <>
      <Row>
        <Heading as={"h1"}>Measures</Heading>
      </Row>
      <Row>
        <MeasuresTable data={measures} isLoading={isLoading} />
      </Row>
    </>
  );
}

export default MeasuresPage;
