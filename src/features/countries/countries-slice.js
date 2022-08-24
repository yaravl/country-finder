import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
  "@@countries/setCountries",
  async (_, { extra: { api, client }, rejectWithValue }) => {
    try {
      return await client.get(api.ALL_COUNTRIES);
    } catch (err) {
      return rejectWithValue("Can`t fetch data");
    }
  }
);

const countriesSlice = createSlice({
  name: "@@countries",
  initialState: {
    status: "idle",
    error: null,
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = "received";
        const { data } = action.payload;
        state.list = [...state.list, ...data];
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountries.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export const { setError, setLoading } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

export const selectCountiesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectAllCounties = (state) => state.countries.list;

export const selectVisibleCountries = (state, { search = "", region = "" }) => {
  return state.countries.list.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) &&
      country.region.includes(region)
  );
};
