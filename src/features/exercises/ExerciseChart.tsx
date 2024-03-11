import styled from "styled-components";

import Heading from "../../UI/Heading";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

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
  values: {
    name: string;
    value: number | string;
    time: string;
    unit: string;
  }[];
}

function ExerciseChart({ values, heading }: ChartProps) {
  const { isDarkMode } = useDarkMode();

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
        <LineChart data={values}>
          <XAxis
            dataKey="time"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            style={{ padding: "1rem" }}
            // padding={{ left: 20, right: 20 }}
            tickMargin={15}
          />
          <YAxis
            dataKey={"value"}
            unit={values[0]?.unit !== undefined ? values[0].unit : ""}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            tickMargin={5}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Line
            dataKey="value"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name={heading.replace(/_/g, " ")}
            unit={values[0]?.unit !== undefined ? values[0].unit : ""}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default ExerciseChart;
