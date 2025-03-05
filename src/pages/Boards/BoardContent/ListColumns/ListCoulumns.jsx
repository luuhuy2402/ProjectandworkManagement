import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import QueueIcon from "@mui/icons-material/Queue";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListCoulumns({ columns }) {
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
                    <Column key={column._id} column={column} />
                ))}

                <Box
                    sx={{
                        minWidth: "200px",
                        maxWidth: "200px",
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
            </Box>
        </SortableContext>
    );
}
ListCoulumns.propTypes = {
    columns: PropTypes.array.isRequired,
};

export default ListCoulumns;
