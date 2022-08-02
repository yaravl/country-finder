import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import axios from "axios";
import { rootReducer } from "./root-reducer";
import * as api from "../config";

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({
        client: axios,
        api,
      })
    )
  )
);
