import { ReactElement, createContext, useContext } from "react";
import styled, { css } from "styled-components";
import { Database } from "../services/supabase";
import Skeleton from "react-loading-skeleton";
import { Measure } from "../types/MeasureTableTypes";
import { BestPerformaceType, ExerciseType } from "../types/WorkoutTypes";
import { maxWeightsForRepsProps } from "./ExerciseRecordsRow";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

interface RecordProps {
  percentage: number;
  repetitions: number;
  weight: number;
  unit: string;
  id?: number;
  name?: string;
}

export const CommonRow = styled.div<{ $columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)<{
  $measure?: boolean;
  $selected?: boolean;
}>`
  padding: 1.2rem 2.4rem;
  ${(props) =>
    props.$selected &&
    css`
      background-color: var(--color-grey-100);
    `}
  ${(props) =>
    props.$measure &&
    css`
      &:hover {
        background-color: var(--color-grey-200);
        cursor: pointer;
      }
    `}
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const SkeletonBox = styled.div`
  display: grid;
  padding: 1rem 2rem;
`;

const TableContext = createContext({ columns: "" });

function Table({
  columns,
  children,
}: {
  columns: string;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({
  children,
  measure,
  onClick,
  selected,
}: {
  children: React.ReactNode;
  measure?: boolean;
  onClick?: () => void;
  selected?: boolean;
}) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow
      role="row"
      $columns={columns}
      $measure={measure}
      $selected={selected}
      onClick={onClick}
    >
      {children}
    </StyledRow>
  );
}

function Body({
  data,
  render,
  isLoading,
}: {
  data:
    | Database["public"]["Tables"]["exercises"]["Row"][]
    | ExerciseType[]
    | BestPerformaceType[]
    | Measure[]
    | RecordProps[]
    | maxWeightsForRepsProps[];
  render: (
    item:
      | Database["public"]["Tables"]["exercises"]["Row"]
      | ExerciseType
      | BestPerformaceType
      | Measure
      | maxWeightsForRepsProps
      | RecordProps,
    i: number
  ) => ReactElement;

  isLoading?: boolean;
}) {
  if (isLoading)
    return (
      <SkeletonBox>
        <Skeleton
          count={5}
          style={{
            height: "4.4rem",
            margin: "0.8rem 0",
            borderRadius: "0.5rem",
          }}
        />
      </SkeletonBox>
    );

  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
