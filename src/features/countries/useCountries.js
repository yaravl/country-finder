import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectControls } from "../controls/controls-slice";
import {
  loadCountries,
  selectCountiesInfo,
  selectVisibleCountries,
} from "./countries-slice";
import { toast } from "react-toastify";

export const useCountries = () => {
  const dispatch = useDispatch();
  const controls = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, controls)
  );
  const { status, error, qty } = useSelector(selectCountiesInfo);

  React.useEffect(() => {
    //TODO: доелать тосты - промисы
    if (!qty) {
      toast.promise(dispatch(loadCountries()), {
        success: "Countries loaded!",
        pending: "loading",
        error: "Error to fetch!",
      });
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};
