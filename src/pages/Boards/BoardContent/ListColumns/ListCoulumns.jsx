import { Box, Button } from "@mui/material";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import QueueIcon from "@mui/icons-material/Queue";

function ListCoulumns() {
    return (
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
            {/* box coloumn 1 */}
            <Column />
            <Column />

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
    );
}

export default ListCoulumns;
