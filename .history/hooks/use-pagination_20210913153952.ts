import { ChangeEvent, useEffect, useMemo, useState } from "react";

export const usePagination = <T extends Record<string, any>>(
  data: T[],
  page: number,
  limit: number
): {
  paginatedData: T[];
  handleNextPage: () => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  hasNextPage: boolean;
} => {
  const [pageIndex, setPageIndex] = useState(page);
  const [paginatedData, setPaginatedData] = useState([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>();

  const [searchItem, setSearchItem] = useState<string>("");

  const searchedList = useMemo(() => {
    if (searchItem) {
      setPaginatedData([]);
      return data.filter(
        (el) =>
          el.country === searchItem ||
          el.name === searchItem ||
          el.iata === searchItem ||
          el.city === searchItem
      );
    }

    return data;
  }, [data, searchItem, hasNextPage]);

  useEffect(() => {
    setPaginatedData((prevState) => [
      ...prevState,
      ...searchedList.slice((pageIndex - 1) * limit, limit * pageIndex),
    ]);
    setHasNextPage(
      searchedList.slice((pageIndex - 1) * limit, limit * pageIndex).length !==
        0
    );
  }, [searchedList, pageIndex]);
  const handleNextPage = () => {
    setPageIndex((prevPage) => prevPage + 1);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  return { paginatedData, handleNextPage, handleSearch, hasNextPage };
};
