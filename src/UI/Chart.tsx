import styled from "styled-components";

import Heading from "./Heading";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../context/DarkModeContext";
import { format } from "date-fns";
import { SingleMeasure } from "../types/MeasureTableTypes";

const StyledSalesChart = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface ChartProps {
  heading: string;
  values: SingleMeasure[];
}

function Chart({ values, heading }: ChartProps) {
  const { isDarkMode } = useDarkMode();

  const data =
    values.length !== 0
      ? values.map((item) => {
          return {
            label: format(new Date(item.added_at), "MMM dd"),
            value: item.value,
            unit: item.unit,
          };
        })
      : [{ label: format(new Date(), "MMM dd"), value: 0, unit: "" }];

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2" style={{ textTransform: "capitalize" }}>
        {heading.replace(/_/g, " ")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            dataKey={"value"}
            unit={data[0]?.unit !== undefined ? data[0].unit : "kg"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Line
            dataKey="value"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name={heading.replace(/_/g, " ")}
            unit={data[0]?.unit !== undefined ? data[0].unit : "kg"}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default Chart;
