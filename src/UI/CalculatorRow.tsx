import Table from "./Table";
function CalculatorRow({
  repetition,
  item,
}: {
  repetition: number;
  item: {
    percentage: number;
    repetitions: number;
    weight: number;
    unit: string;
  };
}) {
  return (
    <Table.Row>
      <div>{repetition}</div>
      <div>
        {item.weight} {item.unit}
      </div>
      <div>{item.percentage}%</div>
    </Table.Row>
  );
}

export default CalculatorRow;
