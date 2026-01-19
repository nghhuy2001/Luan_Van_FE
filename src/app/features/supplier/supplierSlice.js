import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/v1/supplies";

export const fetchAllSuppliers = createAsyncThunk(
    "suppliers/fetchAllSuppliers",
    async (_, { rejectWithValue }) => {
        try {
            const limit = 200; // tăng limit
            let page = 0;
            let all = [];
            let last = false;

            while (!last) {
                const res = await axios.get(`${API_BASE}?page=${page}&limit=${limit}`);
                const data = res.data || {};

                const content = data.content || [];
                all = all.concat(content);

                last = !!data.last || page >= (data.totalPages ?? 0) - 1;
                page += 1;
                if (page > 500) break;
            }

            return { content: all };
        } catch (error) {
            return rejectWithValue(error?.response?.data || error?.message || error);
        }
    }
);


export const fetchSuppliers = createAsyncThunk(
    "suppliers/fetchSuppliers",
    async (page = 0, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE}?page=${page}&limit=10`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createSupplier = createAsyncThunk(
    "suppliers/createSupplier",
    async (dataRequest, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_BASE, dataRequest);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateSupplier = createAsyncThunk(
    "suppliers/updateSupplier",
    async ({ id, dataRequest }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_BASE}/${id}`, dataRequest);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data || err?.message || err);
        }
    }
);

export const deleteSupplier = createAsyncThunk(
    "suppliers/deleteSupplier",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            return id; // trả id để slice biết xóa khỏi items
        } catch (err) {
            return rejectWithValue(err?.response?.data || err?.message || err);
        }
    }
);

const supplierSlice = createSlice({
    name: "suppliers",
    initialState: {
        items: [],
        status: "idle",
        error: null,

        //pagination meta
        currentPage: 0,     // BE trả 0-based
        totalPages: 0,
        totalElements: 0,
        last: false,

        // detail
        selected: null,
        selectedStatus: "idle",
    },
    reducers: {
        clearSelected(state) {
            state.selected = null;
            state.selectedStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSuppliers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchAllSuppliers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload?.content || [];

                // meta có thể set theo items luôn
                state.totalElements = state.items.length;
                state.totalPages = 1;
                state.currentPage = 0;
                state.last = true;
            })
            .addCase(fetchAllSuppliers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // FETCH WITH PAGINATION
            .addCase(fetchSuppliers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.status = "succeeded";

                const data = action.payload || {};
                state.items = data.content || [];

                state.currentPage = data.currentPage ?? 0;
                state.totalPages = data.totalPages ?? 0;
                state.totalElements = data.totalElements ?? 0;
                state.last = data.last ?? false;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // CREATE
            .addCase(createSupplier.pending, (state) => {
                state.error = null;
            })
            .addCase(createSupplier.fulfilled, (state, action) => {
                state.totalElements += 1;
            })
            .addCase(createSupplier.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            // UPDATE
            .addCase(updateSupplier.pending, (state) => {
                state.error = null;
            })
            .addCase(updateSupplier.fulfilled, (state, action) => {
                const updated = action.payload;
                const idx = state.items.findIndex((x) => x.id === updated?.id);
                if (idx !== -1) state.items[idx] = updated;
                if (state.selected?.id === updated?.id) state.selected = updated;
            })
            .addCase(updateSupplier.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            // DELETE
            .addCase(deleteSupplier.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                const id = action.payload;

                const idx = state.items.findIndex((x) => x.id === id);
                if (idx !== -1) {
                    state.items[idx] = { ...state.items[idx], active: false }; // tao obj moi ghi de obj cu va ghi de active thanh false
                }
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
    },
});


export default supplierSlice.reducer;