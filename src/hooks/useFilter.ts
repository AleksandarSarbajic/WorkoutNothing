import { useSearchParams } from "react-router-dom";
import { getParamsArray } from "../utils/helpers";

interface FilterProps {
  method: string;
  fields: string[];
  params: string[];
}

function useFilter({ filterProps }: { filterProps: FilterProps }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";

  const firstParamsArray = getParamsArray(
    searchParams.get(filterProps.params[0]) || ""
  ).slice(1);
  const secondParamsArray = getParamsArray(
    searchParams.get(filterProps.params[1]) || ""
  ).slice(1);

  function deleteParams() {
    searchParams.delete("search");
    searchParams.delete(filterProps.params[0]);
    searchParams.delete(filterProps.params[1]);
    setSearchParams(searchParams);
  }

  const numOfFilters = firstParamsArray.length + secondParamsArray.length;
  const filter =
    secondParamsArray.length || firstParamsArray.length || searchParam.length
      ? {
          method: filterProps.method,
          fields: filterProps.fields,
          value: { category: firstParamsArray, body: secondParamsArray },
          search: searchParam.length === 0 ? undefined : searchParam,
        }
      : null;

  return { filter, numOfFilters, deleteParams };
}

export default useFilter;
