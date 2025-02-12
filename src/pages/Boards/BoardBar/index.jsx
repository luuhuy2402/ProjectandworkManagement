import { Box } from "@mui/material";

function BoardBar() {
    return (
        <Box
            sx={{
                backgroundColor: "primary.dark",
                width: "100%",
                height: (theme) => theme.custom.boardBarHeight,
                display: "flex",
                alignItems: "center",
            }}
        >
            BoardBar
        </Box>
    );
}

export default BoardBar;
