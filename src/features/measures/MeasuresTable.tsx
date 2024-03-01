import Table from "../../UI/Table";
import Menus from "../../context/Menus";
import { Database } from "../../services/supabase";
import { Measure, measures } from "../../types/MeasureTableTypes";

import MeasureRow from "./MeasureRow";

function MeasuresTable({
  data,
  isLoading,
}: {
  data: Database["public"]["Tables"]["measures"]["Row"][];
  isLoading: boolean;
}) {
  const updatedMeasures = measures.map((measure) => {
    const matchingDataItem = data.find((item) =>
      Object.keys(item).includes(measure.data_key_pair)
    );

    if (matchingDataItem) {
      return {
        ...measure,
        valueArray: matchingDataItem[
          measure.data_key_pair as keyof typeof matchingDataItem
        ] as { value: string; added_at: string; unit: string }[] | null,
      };
    }

    return measure as Measure;
  }) as Measure[];

  return (
    <Menus>
      <Table columns="2fr 2fr 1.5fr 1.5fr">
        <Table.Header>
          <div>Type</div>
          <div>Name</div>
          <div>Value</div>
          <div>Updated at</div>
        </Table.Header>

        <Table.Body
          isLoading={isLoading}
          data={updatedMeasures}
          render={(item) => (
            <MeasureRow key={item.name} measure={item as Measure} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default MeasuresTable;
