import { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_COUNTRY_BY_NAME = gql`
  query Country($name: String!) {
    country(name: $name) {
      name
      year
      areaInSquareKilometres
      totalPopulation
    }
  }
`;

function SearchCountry() {
  const [countrySearched, setCountrySearched] = useState("");

  const [
    searchCountryHandler,
    { data: countrySearchedData, error: countryError },
  ] = useLazyQuery(GET_COUNTRY_BY_NAME);

  return (
    <div className="mt-16 content-center flex flex-col items-center">
      <form action="" onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          placeholder="Albania..."
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => {
            setCountrySearched(event.target.value);
          }}
        />
        <button
          className="ml-2 inline-flex justify-center justify-self-center items-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            searchCountryHandler({
              variables: {
                name: countrySearched,
              },
            });
          }}
        >
          Search
        </button>
      </form>
      <div>
        {countrySearchedData && (
          <div className="mt-6 justify-center justify-center justify-self-center  block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="text-center">
              <span className="font-bold">Country:</span>{" "}
              {countrySearchedData.country.name}
            </h1>
            <h1 className="text-center">
              <span className="font-bold">Population:</span>{" "}
              {countrySearchedData.country.totalPopulation}
            </h1>
            <h1 className="text-center">
              <span className="font-bold">Year:</span>{" "}
              {countrySearchedData.country.year}
            </h1>
            <h1 className="text-center">
              <span className="font-bold">Area(km2):</span>{" "}
              {countrySearchedData.country.areaInSquareKilometres}
            </h1>
          </div>
        )}
        {countryError && <h1 className="mt-6">No country found</h1>}
      </div>
    </div>
  );
}

export default SearchCountry;
