import Filter from "../../UI/Filter";
import Search from "../../UI/Search";
import TableOperations from "../../UI/TableOperations";

function ExercisesTableOperations() {
  return (
    <TableOperations>
      <Search />
      <Filter
        bodyFilter={[
          { value: "biceps", label: "Biceps", type: "body" },
          { value: "triceps", label: "Triceps", type: "body" },
          { value: "back", label: "Back", type: "body" },
          { value: "chest", label: "Chest", type: "body" },
          { value: "legs", label: "Legs", type: "body" },
          { value: "shoulders", label: "Shoulders", type: "body" },
          { value: "abdominals", label: "Abdominals", type: "body" },
          { value: "forearms", label: "Forearms", type: "body" },
        ]}
        categoryFilter={[
          { value: "barbell", label: "Barbell", type: "category" },
          { value: "dumbbell", label: "Dumbbell", type: "category" },
          { value: "machine", label: "Machine", type: "category" },

          {
            value: "body_only",
            label: "Bodyweight",
            type: "category",
          },
          { value: "bands", label: "Bands", type: "category" },
          { value: "e-z_curl_bar", label: "E-z curl bar", type: "category" },
          { value: "Cable", label: "cable", type: "category" },
          { value: "medicine_ball", label: "Medicine ball", type: "category" },
          { value: "foam_roll", label: "Foam roll", type: "category" },
          { value: "kettlebells", label: "Kettlebells", type: "category" },
          { value: "other", label: "Other", type: "category" },
        ]}
      />
    </TableOperations>
  );
}

export default ExercisesTableOperations;
