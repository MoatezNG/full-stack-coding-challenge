import { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";

import Layout from "../components/layout";
import useApiData from "../hooks/use-api-data";
import { usePagination } from "../hooks/use-pagination";
import Airport from "../types/airport";

const Page: NextPage = () => {
  const airports = useApiData<Airport[]>("/api/airports", []);
  const [searchItem, setSearchItem] = useState<string>("");
  const searchedList = useMemo(() => {
    if (searchItem) return airports.filter((el) => el.country === searchItem);
    return airports;
  }, [airports]);
  const { paginatedData, handleNextPage } = usePagination<Airport>(
    searchedList,
    1,
    3
  );
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  return (
    <Layout>
      <h1 className="text-2xl font-bold">Code Challenge: Airports</h1>

      <h2 className="mt-10 text-xl font-semibold">All Airports</h2>
      <input placeholder="Search" onChange={handleSearch} />
      <div>
        {paginatedData.map((airport) => (
          <Link
            href={`/airports/${airport.iata.toLowerCase()}`}
            key={airport.iata}
          >
            <a className="flex items-center p-5 mt-5 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none">
              <span>
                {airport.name}, {airport.city}
              </span>
              <span className="ml-auto text-gray-500">{airport.country}</span>
            </a>
          </Link>
        ))}
      </div>
      <button onClick={handleNextPage}>Next</button>
    </Layout>
  );
};

export default Page;
