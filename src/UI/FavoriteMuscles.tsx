import styled from "styled-components";
import Heading from "./Heading";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../context/DarkModeContext";

const StyledSalesChart = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  width: 60%;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
  @media only screen and (max-width: 68.75em) {
    width: 100%;
    & h2 {
      text-align: center;
    }
  }
`;

const StyledHeading = styled.p`
  font-size: 3.4rem;
  text-align: center;
  font-weight: 600;
  padding: 10rem 0;
`;

const startDataLight = [
  {
    muscle: "biceps",
    value: 0,
    color: "#ef4444",
  },
  {
    muscle: "chest",
    value: 0,
    color: "#f97316",
  },
  {
    muscle: "triceps",
    value: 0,
    color: "#eab308",
  },
  {
    muscle: "back",
    value: 0,
    color: "#84cc16",
  },
  {
    muscle: "legs",
    value: 0,
    color: "#14b8a6",
  },
  {
    muscle: "forearms",
    value: 0,
    color: "#22c55e",
  },
  {
    muscle: "shoulders",
    value: 0,
    color: "#3b82f6",
  },
  {
    muscle: "abdominals",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    muscle: "biceps",
    value: 0,
    color: "#b91c1c",
  },
  {
    muscle: "chest",
    value: 0,
    color: "#c2410c",
  },
  {
    muscle: "triceps",
    value: 0,
    color: "#a16207",
  },
  {
    muscle: "back",
    value: 0,
    color: "#4d7c0f",
  },
  {
    muscle: "legs",
    value: 0,
    color: "#0f766e",
  },
  {
    muscle: "forearms",
    value: 0,
    color: "#15803d",
  },
  {
    muscle: "shoulders",
    value: 0,
    color: "#1d4ed8",
  },
  {
    muscle: "abdominals",
    value: 0,
    color: "#7e22ce",
  },
];

interface StartDataProps {
  muscle: string;
  value: number;
  color: string;
}

function prepareData(startData: StartDataProps[], exercises: string[]) {
  function incArrayValue(arr: StartDataProps[], field: string) {
    return arr.map((obj) =>
      obj.muscle === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = exercises
    .reduce((arr, cur) => {
      const num = cur;
      if (num === "biceps") return incArrayValue(arr, "biceps");
      if (num === "chest") return incArrayValue(arr, "chest");
      if (num === "triceps") return incArrayValue(arr, "triceps");
      if (num === "back") return incArrayValue(arr, "back");
      if (num === "legs") return incArrayValue(arr, "legs");
      if (num === "forearms") return incArrayValue(arr, "forearms");
      if (num === "shoulders") return incArrayValue(arr, "shoulders");
      if (num === "abdominals") return incArrayValue(arr, "abdominals");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

interface ChartProps {
  heading: string;
  workouts: string[];
}

function DashboardWorkoutsChart({ workouts, heading }: ChartProps) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, workouts);

  return (
    <StyledSalesChart>
      <Heading as="h2" style={{ textTransform: "capitalize" }}>
        {heading}
      </Heading>

      {data.length !== 0 ? (
        <ResponsiveContainer height={300} width="100%">
          <PieChart>
            <Pie
              data={data}
              nameKey="muscle"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              cx="50%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.muscle}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <StyledHeading>Perform a workout first 😀</StyledHeading>
      )}
    </StyledSalesChart>
  );
}

export default DashboardWorkoutsChart;
