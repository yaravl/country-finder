import React from "react";
import { List } from "../../components/List";
import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useCountries } from "./useCountries";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CountryList = () => {
  const navigate = useNavigate();

  const [countries, { status, error }] = useCountries();

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {error && <h2>{error}</h2>}
      {status === "loading" && <h2>Loading...</h2>}
      {status === "received" && (
        <List>
          {countries.length !== 0 &&
            countries.map((c) => {
              const countryInfo = {
                img: c.flags.png,
                name: c.name,
                info: [
                  {
                    title: "Population",
                    description: c.population.toLocaleString(),
                  },
                  {
                    title: "Region",
                    description: c.region,
                  },
                  {
                    title: "Capital",
                    description: c.capital,
                  },
                ],
              };

              return (
                <Card
                  key={c.name}
                  onClick={() => navigate(`/country/${c.name}`)}
                  {...countryInfo}
                />
              );
            })}
        </List>
      )}
    </>
  );
};

export default CountryList;
