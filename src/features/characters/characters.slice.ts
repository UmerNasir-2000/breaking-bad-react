import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.breakingbadapi.com/api";

interface Characters {
  char_id: number;
  name: string;
  img: string;
  nickname: string;
  status: string;
}

interface State {
  characters: Characters[];
  status: string;
  error: string | undefined;
}

const initialState: State = {
  characters: [],
  status: "", // idle | pending | finished
  error: "",
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
      state.status = "finished";
      state.error = "";
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.status = "finished";
      state.error = action.error.message;
    });
  },
});

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/characters`);
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }
);

export default charactersSlice.reducer;
