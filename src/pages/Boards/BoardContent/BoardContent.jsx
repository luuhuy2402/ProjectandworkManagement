import { Box } from "@mui/material";
import ListCoulumns from "~/pages/Boards/BoardContent/ListColumns/ListCoulumns";

function BoardContent() {
    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#394f6b" : "#1FA2A5",
                width: "100%",
                height: (theme) => theme.custom.boardContentHeight,
                p: "10px 0",
            }}
        >
            <ListCoulumns />
        </Box>
    );
}

export default BoardContent;
