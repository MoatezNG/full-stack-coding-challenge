import { useEffect, useState } from "react";

export const usePagination = <T>(data: T[], page: number, limit: number) => {
  const [pageIndex, setPageIndex] = useState(page);
  const [paginatedData, setPaginatedData] = useState([]);
  useEffect(() => {
    setPaginatedData((prevState) => [
      ...prevState,
      ...data.slice((pageIndex - 1) * limit, limit * pageIndex),
    ]);
  }, [data]);

  return { paginatedData, setPageIndex };
};
