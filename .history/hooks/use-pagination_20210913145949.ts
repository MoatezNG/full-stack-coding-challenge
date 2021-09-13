import { useState } from "react";

const usePagination = <T>(data: T, page: number, limit: number): T => {
  const [paginatedData, setPaginatedData] = useState([]);
  return paginatedData;
};
