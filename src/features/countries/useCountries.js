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
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  React.useEffect(() => {
    if (status === "loading") {
      toast(status);
    } else {
      toast.dismiss();
    }
  }, [status]);

  return [countries, { status, error, qty }];
};
