import { useEffect, useState } from "react";

const usePagination = <T>(data: T[], page: number, limit: number): T[] => {
  const [paginatedData, setPaginatedData] = useState([]);
  useEffect(() => {
    setPaginatedData((prevState) => [
      ...prevState,
      data.slice((page - 1) * limit, limit * page),
    ]);
  }, [data]);
  return paginatedData;
};
