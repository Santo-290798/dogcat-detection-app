import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { DETECT_URL } from '../../api/axios';

const detectedImagesSlice = createSlice({
    name: "detectedImages",
    initialState: {
        detectedImageList: [],
        error: null
    },
    reducers: {
        setUploadedImage: (state, action) => {
            state.detectedImageList = [{ id: action.payload.id, imageData: action.payload.imageData, status: "idle", alerted: false }, ...state.detectedImageList];
            // If upload new image when detected images alerts are displaying, these alerts will be end
            state.detectedImageList.forEach((image) => {
                if (!image.alerted && (image.status === "succeeded" || image.status === "failed")) {
                    image.alerted = true;
                }
            });
        },
        setAlertedForDetectedImageById: (state, action) => {
            const index = state.detectedImageList.findIndex((image) => image.id === action.payload);
            state.detectedImageList[index].alerted = true;
        },
        emptyDetectedImageList: (state) => {
            state.detectedImageList = [];
            state.error = null;
        },
        deleteImageById: (state, action) => {
            state.detectedImageList = state.detectedImageList.filter((image) => image.id !== action.payload);
            state.error = !state.detectedImageList.length ? null : state.error;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getDetectedResults.pending, (state, action) => {
                const index = state.detectedImageList.findIndex((image) => image.id === action.meta.arg.id);
                state.detectedImageList[index].status = "detecting";
            })
            .addCase(getDetectedResults.fulfilled, (state, action) => {
                const index = state.detectedImageList.findIndex((image) => image.id === action.meta.arg.id);
                state.detectedImageList[index].status = "succeeded";
                state.detectedImageList[index].detectedResults = action.payload;
                state.error = null;
            })
            .addCase(getDetectedResults.rejected, (state, action) => {
                const index = state.detectedImageList.findIndex((image) => image.id === action.meta.arg.id);
                state.detectedImageList[index].status = "failed";
                state.error = action.error.message === "Network Error" ? "Network error or the server is not running" : action.error.message;
            })
    }
});

export const getDetectedResults = createAsyncThunk("detectedResults/getForUploadedImage", async (image) => {
    const response = await axios.post(
        DETECT_URL,
        JSON.stringify({ image: image.src }),
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );

    const data = response.data;
    console.log(data.message);

    return data.data;
});

export const { setUploadedImage, setAlertedForDetectedImageById, emptyDetectedImageList, deleteImageById } = detectedImagesSlice.actions;
export default detectedImagesSlice.reducer;