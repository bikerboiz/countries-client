import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const UPDATE_COUNTRY_MUTATION = gql`
  mutation EditCountry($name: String!, $countryInput: CountryInput) {
    editCountry(name: $name, countryInput: $countryInput)
  }
`;

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

function UpdateCountry() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [area, setArea] = useState(null);
  const [population, setPopulation] = useState(null);

  const [editCountry] = useMutation(UPDATE_COUNTRY_MUTATION, {
    refetchQueries: [{ query: QUERY_ALL_COUNTRIES }],
  });

  return (
    <div className="mt-16 content-center flex flex-col items-center">
      <input
        className="rounded-md  mb-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        type="text"
        placeholder="Country..."
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        className="rounded-md  mb-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        type="text"
        placeholder="Year..."
        onChange={(event) => {
          setYear(event.target.value);
        }}
      />
      <input
        className="rounded-md  mb-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        type="number"
        placeholder="Area in km2..."
        onChange={(event) => {
          setArea(event.target.value);
        }}
      />
      <input
        className="rounded-md  mb-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        type="number"
        placeholder="Population..."
        onChange={(event) => {
          setPopulation(event.target.value);
        }}
      />
      <button
        className="mt-2 inline-flex justify-center justify-self-center items-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => {
          editCountry({
            variables: {
              name: name,
              countryInput: {
                name,
                year,
                areaInSquareKilometres: Number(area),
                totalPopulation: Number(population),
              },
            },
          });
        }}
      >
        Edit Country
      </button>
    </div>
  );
}

export default UpdateCountry;
