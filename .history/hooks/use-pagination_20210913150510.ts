import { useEffect, useState } from "react";

export const usePagination = <T>(
  data: T[],
  page: number,
  limit: number
): T[] => {
  const [paginatedData, setPaginatedData] = useState([]);
  useEffect(() => {
    setPaginatedData((prevState) => [
      ...prevState,
      data.slice((page - 1) * limit, limit * page),
    ]);
  }, [data]);
  console.log(paginatedData);
  return paginatedData;
};
