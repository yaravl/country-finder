import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadNeighborsByBorder = createAsyncThunk(
  "@@details/setNeighbors",
  (borders = [], { extra: { api, client }, rejectWithValue }) => {
    try {
      return client.get(api.filterByCode(borders));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const loadCountryByName = createAsyncThunk(
  "@@details/loadCountryByName",
  (name, { extra: { api, client }, rejectWithValue }) => {
    try {
      return client.get(api.searchByCountry(name));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState = {
  currentCountry: null,
  status: "idle",
  error: null,
  neighbors: [],
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
      state.status = "received";
      state.neighbors = action.payload.data.map((country) => country.name);
    });
    builder.addCase(loadCountryByName.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loadCountryByName.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload || action.meta.error;
    });
    builder.addCase(loadCountryByName.fulfilled, (state, action) => {
      state.status = "received";
      state.currentCountry = action.payload.data[0];
    });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectAllDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
