import { Box } from "@mui/material";

function BoardContent() {
    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
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
