import AddExercise from "../../UI/AddExercise";
import Filter from "../../UI/Filter";
import Search from "../../UI/Search";
import TableOperations from "../../UI/TableOperations";
import { BODY_FILTER, CATEGORY_FILTER } from "../../utils/constants";

function ExercisesTableOperations() {
  return (
    <TableOperations>
      <Search />
      <Filter bodyFilter={BODY_FILTER} categoryFilter={CATEGORY_FILTER} />
      <AddExercise />
    </TableOperations>
  );
}

export default ExercisesTableOperations;
