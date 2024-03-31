import styled from "styled-components";

import Heading from "./Heading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useDarkMode } from "../context/DarkModeContext";
import Select from "./Select";
import { WorkoutSupabase } from "../types/WorkoutTypes";
import { format } from "date-fns";
import {
  analyticsInterval,
  workoutsForInterval,
  workoutsForLast7Weeks,
} from "../utils/helpers";
import { useState } from "react";
import { SiGoogleanalytics } from "react-icons/si";

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
  workouts: WorkoutSupabase[];
}

function DashboardWorkoutsChart({ workouts, heading }: ChartProps) {
  const { isDarkMode } = useDarkMode();
  const [value, setValue] = useState(7);
  const allDates = analyticsInterval(value);
  const workoutsCompleted = workoutsForInterval(
    workouts as WorkoutSupabase[],
    value
  );

  const weeks = workoutsForLast7Weeks(workouts as WorkoutSupabase[]);

  const workoutsChart = allDates.map((date, index) => ({
    day: format(date, "MMM dd"),
    completedWorkouts: workoutsCompleted[index],
  }));

  const values =
    value === 10
      ? weeks.map((week) => {
          return {
            day: `${week.startDate}/${week.endDate}`,
            completedWorkouts: week.workouts,
          };
        })
      : workoutsChart;

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Heading as="h2" style={{ textTransform: "capitalize" }}>
          <SiGoogleanalytics /> {heading}
        </Heading>
        <Select
          // disabled={isUpdating}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setValue(+e.target.value)
          }
          options={[
            { value: 7, label: "This Week" },
            { value: 30, label: "Last 30 days" },
            { value: 10, label: "Per week" },
          ]}
        />
      </div>

      <ResponsiveContainer height={300} width="100%">
        <BarChart data={values}>
          <XAxis
            dataKey="day"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            style={{ padding: "1rem" }}
            padding={{ left: 0, right: 20 }}
            tickMargin={5}
          />

          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Bar
            dataKey="completedWorkouts"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name={"Number of workouts"}
            radius={[10, 10, 0, 0]}
            // unit={values[0]?.unit !== undefined ? values[0].unit : ""}
          />
        </BarChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default DashboardWorkoutsChart;
