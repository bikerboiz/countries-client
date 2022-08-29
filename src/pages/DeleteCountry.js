import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const DELETE_COUNTRY_MUTATION = gql`
  mutation DeleteCountry($name: String!) {
    deleteCountry(name: $name)
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

function DeleteCountry() {
  const [name, setName] = useState("");

  const [deleteCountry] = useMutation(DELETE_COUNTRY_MUTATION, {
    refetchQueries: [{ query: QUERY_ALL_COUNTRIES }],
  });

  return (
    <div className="mt-16 content-center flex flex-col items-center">
      <input
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        type="text"
        placeholder="Country..."
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button
        className="mt-2 inline-flex justify-center justify-self-center items-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => {
          deleteCountry({
            variables: {
              name: name,
            },
          });
        }}
      >
        Delete Country
      </button>
    </div>
  );
}

export default DeleteCountry;
