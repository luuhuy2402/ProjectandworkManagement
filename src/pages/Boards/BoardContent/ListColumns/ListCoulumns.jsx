import { Box, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import QueueIcon from "@mui/icons-material/Queue";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { createNewColumnAPI } from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { cloneDeep } from "lodash";
import {
    selectCurrentActiveBoard,
    updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { useDispatch, useSelector } from "react-redux";
function ListCoulumns({ columns, deleteColumnDetails }) {
    const board = useSelector(selectCurrentActiveBoard);
    const dispatch = useDispatch();

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
    const toggleOpenNewColumnForm = () =>
        setOpenNewColumnForm(!openNewColumnForm);

    const [newColumnTitle, setNewColumnTitle] = useState("");

    const addNewColumn = async () => {
        if (!newColumnTitle) {
            toast.warn("Please enter column title", { theme: "colored" });
            return;
        }
        // Tạo dữ liệu mới cho column để gọi API
        const newColumnData = {
            title: newColumnTitle,
        };

        //goị hàm gọi API tạo mới Column và làm lại state board
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id,
        });

        //Thêm card giữ chỗ vào column mới tạo
        createdColumn.cards = [generatePlaceholderCard(createdColumn)];
        createdColumn.cardOrderIds = [
            generatePlaceholderCard(createdColumn)._id,
        ];

        /**Cập nhật lại board
         * Phiá FE tự làm đúng lại state data board thay vì goi lai api fetchBoardDetailsAPI
         * Chú ys: Cách còn tùy thuộc vào từng dự án, có lúc BE sẽ hôc trợ trả về toàn bộ Board dù đây là gọi
         * API tạo Column hay Card thì lúc này chi cần setBoard với dữ liệu trả về từ API chứ ko cần push...
         */

        /**
         * Mặc dù đã copy/clone ra giá trị newBoard nhưng bản chất spread operator này chỉ tạo ra một bản sao nông(shallow copy) của object board
         * Nên nếu có bất kỳ thay đổi nào trong newBoard thì board cũng sẽ bị thay đổi theo
         * Nên dính pahri rules imutability của redux là không được phép thay đổi trực tiếp giá trị của state trong redux store
         * => Nên phải clone sâu(deep copy) object board ra thành newBoard
         */
        // const newBoard = { ...board };
        const newBoard = cloneDeep(board);
        newBoard.columns.push(createdColumn);
        newBoard.columnOrderIds.push(createdColumn._id);

        /**C2: Dùng array.concat thay cho push vì concat là marge các mảng vs nhau và tạo ra mảng mới  */
        // const newBoard = { ...board };
        // newBoard.columns = newBoard.columns.concat(createdColumn);
        // newBoard.columnOrderIds = newBoard.columnOrderIds.concat(
        //     createdColumn._id
        // );
        dispatch(updateCurrentActiveBoard(newBoard));

        //Đóng lại trạng thái thêm Column mới & clear input
        toggleOpenNewColumnForm();
        setNewColumnTitle("");
    };
    /**SortableContext yêu cầu items là một mảng dạng ['id-1','id-2'] chứ không phải là
     * [{id:'id-1'},{id:'id-2'}] nên cần chuyển đổi dữ liệu trước khi truyền vào SortableContext
     */

    return (
        <SortableContext
            items={columns?.map((c) => c._id)}
            strategy={horizontalListSortingStrategy}
        >
            <Box
                sx={{
                    bgcolor: "inherit",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar-track": { m: 2 },
                }}
            >
                {columns?.map((column) => (
                    <Column
                        key={column._id}
                        column={column}
                        deleteColumnDetails={deleteColumnDetails}
                    />
                ))}

                {/* Box Add new Column CTA */}
                {!openNewColumnForm ? (
                    <Box
                        onClick={toggleOpenNewColumnForm}
                        sx={{
                            minWidth: "250px",
                            maxWidth: "250px",
                            mx: 2,
                            borderRadius: "6px",
                            height: "fit-content",
                            bgcolor: "#ffffff3d",
                        }}
                    >
                        <Button
                            startIcon={<QueueIcon />}
                            sx={{
                                color: "white",
                                width: "100%",
                                justifyContent: "flex-start",
                                pl: 2.5,
                                py: 1,
                            }}
                        >
                            Add new column
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            minWidth: "250px",
                            maxWidth: "250px",
                            mx: 2,
                            p: 1,
                            borderRadius: "6px",
                            height: "fit-content",
                            bgcolor: "#ffffff3d",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}
                    >
                        <TextField
                            label="Enter column title"
                            type="text"
                            size="small"
                            variant="outlined"
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
                                "& label": { color: "white" },
                                "& input": { color: "white" },
                                "& label.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Button
                                onClick={addNewColumn}
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                    boxShadow: "none",
                                    border: "0.5px solid",
                                    borderColor: (theme) =>
                                        theme.palette.success.main,
                                    "&:hover": {
                                        bgcolor: (theme) =>
                                            theme.palette.success.main,
                                    },
                                }}
                            >
                                Add Column
                            </Button>
                            <CloseIcon
                                fontSize="small"
                                sx={{
                                    color: "white",
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: (theme) =>
                                            theme.palette.warning.light,
                                    },
                                }}
                                onClick={toggleOpenNewColumnForm}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </SortableContext>
    );
}
ListCoulumns.propTypes = {
    columns: PropTypes.array.isRequired,
};

export default ListCoulumns;
