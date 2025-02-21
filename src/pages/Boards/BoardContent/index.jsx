import { Box } from "@mui/material";

function BoardContent() {
    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#394f6b" : "#1FA2A5",
                width: "100%",
                height: (theme) =>
                    `calc(100vh - ${theme.custom.appBarHeight} - ${theme.custom.boardBarHeight})`,
                display: "flex",
                alignItems: "center",
            }}
        >
            BoardContent
        </Box>
    );
}

export default BoardContent;
