import { useEffect, useState } from "react";

export const usePagination = <T>(
  data: T[],
  page: number,
  limit: number
): { paginatedData: T[]; handleNextPage: () => void } => {
  const [pageIndex, setPageIndex] = useState(page);
  const [paginatedData, setPaginatedData] = useState([]);
  useEffect(() => {
    setPaginatedData((prevState) => [
      ...prevState,
      ...data.slice((pageIndex - 1) * limit, limit * pageIndex),
    ]);
  }, [data]);
  const handleNextPage = () => {
    setPageIndex((prevPage) => prevPage + 1);
  };
  return { paginatedData, handleNextPage };
};
