import { useEffect, useMemo, useState } from "react";

export const usePagination = <T extends Record<string, any>>(
  data: T[],
  page: number,
  limit: number
): { paginatedData: T[]; handleNextPage: () => void } => {
  const [pageIndex, setPageIndex] = useState(page);
  const [paginatedData, setPaginatedData] = useState([]);

  const [searchItem, setSearchItem] = useState<string>("");

  const searchedList = useMemo(() => {
    if (searchItem)
      return data.filter(
        (el) =>
          el.country === searchItem ||
          el.name === searchItem ||
          el.iata === searchItem ||
          el.city === searchItem
      );
    return data;
  }, [data, searchItem]);

  useEffect(() => {
    setPaginatedData((prevState) => [
      ...prevState,
      ...searchedList.slice((pageIndex - 1) * limit, limit * pageIndex),
    ]);
  }, [data, pageIndex]);
  const handleNextPage = () => {
    setPageIndex((prevPage) => prevPage + 1);
  };
  return { paginatedData, handleNextPage };
};
