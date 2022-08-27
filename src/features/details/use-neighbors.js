import { useDispatch, useSelector } from "react-redux";
import { loadNeighborsByBorder, selectNeighbors } from "./details-slice";
import React from "react";

export const useNeighbors = (borders) => {
  const dispatch = useDispatch();
  const neighbors = useSelector(selectNeighbors);

  React.useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighborsByBorder(borders));
    }
  }, [borders, dispatch]);

  return neighbors;
};
