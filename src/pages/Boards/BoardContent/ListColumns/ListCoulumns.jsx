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
function ListCoulumns({ columns, createNewColumn, createNewCard }) {
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
        //goị hàm gọi API tạo mới Column
        // Gọi lêm function tạo mới Column ở component cha cao nhất ( hiện tại chưa sử dụng redux )
        await createNewColumn(newColumnData);

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
                        createNewCard={createNewCard}
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
