import { setTheme } from "../theme/theme-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme];
};
