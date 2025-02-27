import { Box } from "@mui/material";
import CardItem from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/CardItem/CardItem";

function ListCards() {
    return (
        <Box
            sx={{
                p: "0 5px ",
                m: "0 5px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: (theme) =>
                    `calc(
        ${theme.custom.boardContentHeight} - 
        ${theme.spacing(5)} - 
        ${theme.custom.columnHeaderHeight} - 
        ${theme.custom.columnFooterHeight})`,
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ced0da",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#bfc2cf",
                },
            }}
        >
            <CardItem />
            <CardItem temporaryHideMedia />
        </Box>
    );
}

export default ListCards;
