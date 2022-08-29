import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_COUNTRIES = gql`
  query GetCountries {
    getCountries {
      name
      totalPopulation
      year
      areaInSquareKilometres
    }
  }
`;

function Countries() {
  const { data, loading, error } = useQuery(QUERY_ALL_COUNTRIES);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <>
    <h1 className="text-center mt-4 font-extrabold text-2xl">List of Countries</h1>
    <div className="mt-4 flex flex-wrap  justify-center  gap-4" >
      {data &&
        data.getCountries.map((country) => {
          return (
            <div
              key={country.name}
              className="justify-center justify-self-center  block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h1 className="text-center">
                <span className="font-bold">Country:</span> {country.name}
              </h1>
              <h1 className="text-center">
                <span className="font-bold">Population:</span>{" "}
                {country.totalPopulation}
              </h1>
              <h1 className="text-center">
                <span className="font-bold">Year:</span> {country.year}
              </h1>
              <h1 className="text-center">
                <span className="font-bold">Area (km2):</span>{" "}
                {country.areaInSquareKilometres}
              </h1>
            </div>
          );
        })}
    </div>
      </>
  );
}

export default Countries;
