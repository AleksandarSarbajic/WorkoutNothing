import { useSearchParams } from "react-router-dom";
import { Database } from "../services/supabase";
import ExerciseAbout from "./ExerciseAbout";
import ExercisesHistory from "../features/exercises/ExercisesHistory";
import ExerciseRecords from "../features/exercises/ExerciseRecords";
import ExerciseCharts from "./ExerciseCharts";

function ExerciseSection({
  exercise,
}: {
  exercise: Database["public"]["Tables"]["exercises"]["Row"] | undefined;
}) {
  const [searchParams] = useSearchParams();
  const exerciseParamas = searchParams.get("page") ?? "about";

  if (exerciseParamas === "about")
    return <ExerciseAbout instructions={exercise?.instructions} />;
  if (exerciseParamas === "history") return <ExercisesHistory />;
  if (exerciseParamas === "charts") return <ExerciseCharts />;
  if (exerciseParamas === "records") return <ExerciseRecords />;

  return <div></div>;
}

export default ExerciseSection;
