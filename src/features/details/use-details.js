import { useDispatch, useSelector } from "react-redux";
import {
  clearDetails,
  loadCountryByName,
  selectAllDetails,
} from "./details-slice";
import React from "react";

export const useDetails = (name) => {
  const dispatch = useDispatch();
  const details = useSelector(selectAllDetails);

  React.useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [name, dispatch]);
  return details;
};
