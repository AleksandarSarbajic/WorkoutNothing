import styled from "styled-components";

import Table from "../../UI/Table";

import { useNavigate } from "react-router-dom";

import { Measure } from "../../types/MeasureTableTypes";
import { format } from "date-fns";
import { adjustMeasurement, sortByAddedAt } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Exercise = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function MeasureRow({ measure }: { measure: Measure }) {
  const { settings } = useSettings();
  const navigate = useNavigate();

  const { name, type, valueArray, data_key_pair } = measure;

  const sortedOldArray = valueArray
    ?.slice()
    .sort((a, b) => sortByAddedAt(a, b));

  const { value, added_at, unit } =
    sortedOldArray?.length !== 0
      ? sortedOldArray?.[sortedOldArray?.length - 1] ?? {
          value: "none",
          added_at: "To be updated",
          unit: "",
        }
      : { value: "none", added_at: "To be updated", unit: "" };

  const date = added_at !== "To be updated" ? new Date(added_at) : null;

  return (
    <Table.Row measure={true} onClick={() => navigate(data_key_pair)}>
      <>
        <div>{type}</div>
        <Exercise>{name}</Exercise>
        <div>
          {adjustMeasurement(value, unit, settings).value}
          {adjustMeasurement(value, unit, settings).unit}
        </div>
        <div>{date !== null ? format(date, "dd.MM.yyyy") : added_at}</div>
      </>
    </Table.Row>
  );
}

export default MeasureRow;
