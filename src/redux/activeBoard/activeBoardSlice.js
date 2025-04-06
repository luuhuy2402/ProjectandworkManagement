import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isEmpty } from "lodash";
import { API_ROOT } from "~/utils/constants";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";

//Khởi tạo giá trị State của một slice
const initialState = {
    currentActiveBoard: null,
};

//Các hành động gọi API(thường là bất đồng bộ) và cập nhật lại dữ liệu trong Redux Store,
// dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
    "activeBoard/fetchBoardDetailsAPI",
    async (boardId) => {
        const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
        return response.data;
    }
);

//Khởi tạo một Slice trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
    name: "activeBoard",
    initialState,
    //reducers: là nơi xử lý dữ liệu đồng bộ
    reducers: {
        updateCurrentActiveBoard: (state, action) => {
            //action.payload là dữ liệu được truyền vào khi gọi hàm reducer
            const board = action.payload;
            //Xử lý dữ liệu...
            //update lại dữ liệu của currentActiveBoard
            state.currentActiveBoard = board;
        },
    },
    //extraReducers: là nơi xử lý dữ liệu bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            //action.payload là dữ liệu được trả về từ API (response.data)
            let board = action.payload;
            //Xử lý dữ liệu...
            //Sắp xếp thứ tự column trước khi đưa dữ liệu xuống bên dưới
            board.columns = mapOrder(
                board.columns,
                board.columnOrderIds,
                "_id"
            );

            board.columns.forEach((column) => {
                // xử lý khi mới tạo column mà chưa có card thì tạo thêm 1 card giữ chỗ để kéo thả được
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)];
                    column.cardOrderIds = [generatePlaceholderCard(column)._id];
                } else {
                    // Sắp xếp thứ tự cards trước khi đưa dữ liệu xuống bên dưới
                    column.cards = mapOrder(
                        column.cards,
                        column.cardOrderIds,
                        "_id"
                    );
                }
            });
            //update lại dữ liệu của currentActiveBoard
            state.currentActiveBoard = board;
        });
    },
});

// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch(action) để cập nhật lại dữ liệu trong Redux Store thông qua reducers( chaỵ xử lý dữ liệu đồng bộ)
//Actions là các hàm được tạo ra tự động từ reducers
export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

//Selectors: là nơi dành cho các components bên dưới sử dụng useSelector() để lấy dữ liệu từ Redux Store ra sử dụng
export const selectCurrentActiveBoard = (state) =>
    state.activeBoard.currentActiveBoard;

export const activeBoardReducer = activeBoardSlice.reducer;
